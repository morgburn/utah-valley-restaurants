/*
 * SEARCH ENGINE. Runs entirely in the browser over window.SITE (the one data
 * source) and window.CONCEPTS (the hand-built concept layer).
 *
 *  1. Literal baseline: query words matched against each restaurant's name,
 *     summary and category labels.
 *  2. Name match, with "what you probably meant" for misspellings
 *     (e.g. "Don Juaquin", "chikfila", "costa vita").
 *  3. Concept layer: study vocabulary -> categories, filters, restaurants.
 *  4. Dollar amounts -> price ceiling.
 *  5. Misspelled words are corrected against the vocabulary and the
 *     correction is shown to the user.
 */
(function () {
  var S = window.SITE;

  function norm(s) {
    return String(s).toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/&/g, " and ")
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9$.]+/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function squash(s) { return norm(s).replace(/[^a-z0-9]/g, ""); }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 99;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) d[i] = [i];
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // swapped letters
    }
    return d[a.length][b.length];
  }
  function allowedEdits(word) { return word.length >= 7 ? 2 : word.length >= 4 ? 1 : 0; }

  function scheme(id) { return S.schemes.filter(function (s) { return s.id === id; })[0]; }
  function valueLabel(sid, vid) {
    var v = scheme(sid).values.filter(function (x) { return x.id === vid; })[0];
    return v ? v.label : vid;
  }
  function tagsOf(r, sid) { return (r.tags && r.tags[sid]) || []; }

  // Words a restaurant can be found by literally.
  function haystack(r) {
    if (r._hay) return r._hay;
    var parts = [r.name, r.summary];
    ["category", "dining", "service", "city"].forEach(function (sid) {
      tagsOf(r, sid).forEach(function (v) { parts.push(valueLabel(sid, v)); });
    });
    r._hay = { name: norm(r.name).split(" "), all: norm(parts.join(" ")).split(" ") };
    return r._hay;
  }
  // Name without filler words, used for phrase matching.
  var NAME_FILLER = ["the", "restaurant", "and", "of", "on", "at", "provo", "lehi"];
  function nameKey(r) {
    return norm(r.name).split(" ").filter(function (w) { return NAME_FILLER.indexOf(w) === -1; }).join(" ");
  }

  // All single words the search understands, for spelling correction.
  var VOCAB = null;
  function vocab() {
    if (VOCAB) return VOCAB;
    var set = {};
    window.CONCEPTS.forEach(function (c) {
      c.terms.forEach(function (t) { norm(t).split(" ").forEach(function (w) { if (w.length >= 3) set[w] = true; }); });
    });
    S.restaurants.forEach(function (r) {
      haystack(r).all.forEach(function (w) { if (w.length >= 3) set[w] = true; });
    });
    VOCAB = Object.keys(set);
    return VOCAB;
  }
  function correct(word) {
    if (word.length < 4 || /\d/.test(word)) return null;
    var best = null, bestD = 99, max = allowedEdits(word);
    vocab().forEach(function (v) {
      var d = lev(word, v);
      if (d > 0 && d <= max && (d < bestD || (d === bestD && v.length < best.length))) { best = v; bestD = d; }
    });
    return best;
  }

  // Phrase search inside a padded string; returns the string with the phrase blanked out.
  function takePhrase(work, phrase) {
    var p = " " + phrase + " ";
    var i = work.indexOf(p);
    if (i === -1) return null;
    return work.slice(0, i) + " " + new Array(phrase.length + 1).join("_") + " " + work.slice(i + p.length);
  }

  function run(rawQuery) {
    var q = norm(rawQuery);
    var out = {
      query: rawQuery, normalized: q,
      names: [], concepts: [], price: null, literal: [], corrections: [], unknown: [],
      results: [], relaxations: [], suggestions: []
    };
    if (!q) return out;

    var work = " " + q + " ";

    // ---- 1. Restaurant names (exact phrase, then fuzzy / prefix) ----
    var nameHits = {};
    S.restaurants.slice().sort(function (a, b) { return nameKey(b).length - nameKey(a).length; }).forEach(function (r) {
      var key = nameKey(r);
      var full = norm(r.name);
      [full, key].forEach(function (k) {
        if (nameHits[r.id] || !k) return;
        var next = takePhrase(work, k);
        if (next !== null) { work = next; nameHits[r.id] = { how: "name" }; }
      });
    });

    // ---- 2. Dollar amounts -> price ceiling ----
    work = work.replace(/(?:under|below|less than|max|about|around)?\s*\$\s?(\d+(?:\.\d+)?)|(\d+(?:\.\d+)?)\s*(?:dollars|bucks)/g,
      function (m, a, b) {
        var n = parseFloat(a || b);
        var tier = window.PRICE_CEILINGS.filter(function (c) { return n <= c.upTo; })[0];
        out.price = { amount: n, tiers: tier.tiers, typed: m.trim() };
        return " ";
      });

    // ---- 3. Concept terms (longest phrase first) ----
    var termList = [];
    window.CONCEPTS.forEach(function (c) { c.terms.forEach(function (t) { termList.push({ t: norm(t), c: c }); }); });
    termList.sort(function (a, b) { return b.t.length - a.t.length; });
    function takeConcepts() {
      termList.forEach(function (x) {
        var next = takePhrase(work, x.t);
        while (next !== null) {
          work = next;
          var have = out.concepts.filter(function (h) { return h.concept.id === x.c.id; })[0];
          if (!have) out.concepts.push({ concept: x.c, term: x.t, terms: [x.t] });
          else if (have.terms.indexOf(x.t) === -1) have.terms.push(x.t);
          next = takePhrase(work, x.t);
        }
      });
    }
    takeConcepts();

    // fuzzy / prefix name match on what's left ("costa vita", "chikfila", "mo bettah")
    var left = work.split(" ").filter(function (w) { return w && w.indexOf("_") === -1 && window.STOP_WORDS.indexOf(w) === -1; }).join(" ");
    var leftSquash = left.replace(/[^a-z0-9]/g, "");
    if (leftSquash.length >= 4 && !/^\d+$/.test(leftSquash)) {
      var found = false;
      S.restaurants.forEach(function (r) {
        if (nameHits[r.id]) return;
        var ns = squash(nameKey(r)), nf = squash(r.name);
        var d = Math.min(lev(leftSquash, ns), lev(leftSquash, nf));
        var max = leftSquash.length >= 8 ? 2 : 1;
        var prefix = leftSquash.length >= 4 && (ns.indexOf(leftSquash) === 0 || nf.indexOf(leftSquash) === 0);
        if (prefix || d <= max) {
          nameHits[r.id] = (prefix || d === 0) ? { how: "name" } : { how: "meant", typed: left };
          found = true;
        }
      });
      if (found) work = " ";
    }
    out.names = Object.keys(nameHits).map(function (id) { return { id: id, how: nameHits[id].how, typed: nameHits[id].typed }; });

    // ---- 4. Literal words, with spelling correction for unknown words ----
    var STOP = window.STOP_WORDS;
    var tokens = work.split(" ").filter(function (w) { return w && w.indexOf("_") === -1 && STOP.indexOf(w) === -1; });
    var literalHits = {};
    function literalMatch(tok) {
      var hits = [];
      S.restaurants.forEach(function (r) {
        var h = haystack(r);
        var inName = h.name.some(function (w) { return w === tok || (tok.length >= 3 && w.indexOf(tok) === 0); });
        var inAll = inName || h.all.some(function (w) { return w === tok || (tok.length >= 4 && w.indexOf(tok) === 0); });
        if (inAll) hits.push({ id: r.id, inName: inName });
      });
      return hits;
    }
    tokens.forEach(function (tok) {
      if (tok.length < 2 || /^\d+$/.test(tok)) return;
      var hits = literalMatch(tok);
      if (!hits.length) {
        var fix = correct(tok);
        if (fix) {
          out.corrections.push({ typed: tok, meant: fix });
          // the correction may be a concept term ("coen" -> "cone")
          var before = out.concepts.length;
          work = " " + fix + " ";
          takeConcepts();
          if (out.concepts.length > before) return;
          hits = literalMatch(fix);
          tok = fix;
        }
      }
      if (hits.length) {
        out.literal.push(tok);
        hits.forEach(function (h) {
          var e = literalHits[h.id] = literalHits[h.id] || { score: 0, words: [] };
          e.score += h.inName ? 3 : 1;
          e.words.push(tok);
        });
      } else {
        out.unknown.push(tok);
      }
    });

    // ---- 5. Combine ----
    var whatConcepts = out.concepts.filter(function (h) { return h.concept.role === "what"; });
    var narrowConcepts = out.concepts.filter(function (h) { return h.concept.role === "narrow"; });

    // narrow groups: scheme -> {values, because}
    var groups = {};
    narrowConcepts.forEach(function (h) {
      Object.keys(h.concept.tags).forEach(function (sid) {
        var g = groups[sid] = groups[sid] || { values: [], because: [] };
        h.concept.tags[sid].forEach(function (v) { if (g.values.indexOf(v) === -1) g.values.push(v); });
        g.because.push({ term: h.term, shows: h.concept.shows });
      });
    });
    if (out.price) {
      var pg = groups.price = groups.price || { values: [], because: [] };
      // a dollar amount and a price word together: keep tiers allowed by both
      pg.values = pg.values.length ? pg.values.filter(function (v) { return out.price.tiers.indexOf(v) !== -1; }) : out.price.tiers.slice();
      pg.because.push({ term: out.price.typed, shows: pg.values.map(function (v) { return valueLabel("price", v); }).join(" or ") });
    }

    var scores = {};
    function add(id, pts, reason) {
      var e = scores[id] = scores[id] || { score: 0, reasons: [] };
      e.score += pts;
      if (reason && e.reasons.indexOf(reason) === -1) e.reasons.push(reason);
    }
    out.names.forEach(function (n) {
      add(n.id, n.how === "name" ? 100 : 80, n.how === "name" ? "Name match" : "Did you mean this? (you typed “" + n.typed + "”)");
    });
    whatConcepts.forEach(function (h) {
      var c = h.concept;
      (c.restaurants || []).forEach(function (id) { add(id, 30, "“" + h.term + "” → " + c.shows); });
      if (c.tags) S.restaurants.forEach(function (r) {
        var hit = Object.keys(c.tags).some(function (sid) {
          return tagsOf(r, sid).some(function (v) { return c.tags[sid].indexOf(v) !== -1; });
        });
        if (hit) add(r.id, 20, "“" + h.term + "” → " + c.shows);
      });
    });
    Object.keys(literalHits).forEach(function (id) {
      add(id, 10 * literalHits[id].score, "Matched the word" + (literalHits[id].words.length > 1 ? "s " : " ") +
        literalHits[id].words.map(function (w) { return "“" + w + "”"; }).join(", "));
    });

    // Start from everything the query asked for. If it only narrowed
    // ("cheap SLC"), start from all restaurants. Words we could not
    // understand are ignored when anything else matched (and shown as ignored).
    var base;
    if (Object.keys(scores).length) base = Object.keys(scores);
    else if (Object.keys(groups).length) base = S.restaurants.map(function (r) { return r.id; });
    else base = [];
    out.ignored = base.length ? out.unknown.slice() : [];
    function passes(id, skip) {
      var r = S.restaurants.filter(function (x) { return x.id === id; })[0];
      return Object.keys(groups).every(function (sid) {
        if (sid === skip) return true;
        return tagsOf(r, sid).some(function (v) { return groups[sid].values.indexOf(v) !== -1; });
      });
    }
    function rank(ids) {
      return ids.map(function (id) {
        var r = S.restaurants.filter(function (x) { return x.id === id; })[0];
        var e = scores[id] || { score: 0, reasons: [] };
        var reasons = e.reasons.slice();
        Object.keys(groups).forEach(function (sid) {
          groups[sid].because.forEach(function (b) { reasons.push("“" + b.term + "” → " + b.shows); });
        });
        return { r: r, score: e.score, reasons: reasons };
      }).sort(function (a, b) { return b.score - a.score || a.r.name.localeCompare(b.r.name); });
    }

    // Names always win over narrowing ("Costa Vida in SLC" still shows Costa Vida)
    var nameIds = out.names.map(function (n) { return n.id; });
    var ids = base.filter(function (id) { return nameIds.indexOf(id) !== -1 || passes(id); });
    out.results = rank(ids);
    out.groups = groups;

    // ---- 6. Designed no-results: ways to loosen the search ----
    if (!out.results.length && base.length) {
      Object.keys(groups).forEach(function (sid) {
        var loosened = base.filter(function (id) { return passes(id, sid); });
        if (loosened.length) {
          out.relaxations.push({
            scheme: sid,
            drop: groups[sid].because.map(function (b) { return b.term; }),
            count: loosened.length
          });
        }
      });
    }
    // Suggest the closest restaurant names when nothing matched at all
    if (!out.results.length) {
      var raw = squash(q);
      out.suggestions = S.restaurants.map(function (r) {
        return { r: r, d: Math.min(lev(raw, squash(r.name)), lev(raw, squash(nameKey(r)))) };
      }).filter(function (x) { return x.d <= Math.max(3, Math.floor(raw.length / 3)); })
        .sort(function (a, b) { return a.d - b.d; }).slice(0, 3).map(function (x) { return x.r; });
    }
    return out;
  }

  window.Search = { run: run, norm: norm };
})();
