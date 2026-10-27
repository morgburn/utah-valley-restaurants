/*
 * RENDERING. Every page is generated from window.SITE (js/data.js).
 * All restaurant blocks, on every page, come from ONE template: block().
 *
 * URLs
 *   index.html                                 Home (cards for every category in both views)
 *   category.html?by=<scheme>&id=<value>[&price=1&city=provo...]
 *   restaurant.html?id=<id>[&by=..&from=..] or [&q=..&qid=..]
 *   search.html?q=<query>[&qid=..][&f=scheme:value,...]
 *   log.html                                   test log viewer / export
 */
(function () {
  var S = window.SITE;

  // ---------- helpers ----------
  function params() { return new URLSearchParams(location.search); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function scheme(id) { return S.schemes.filter(function (s) { return s.id === id; })[0]; }
  function browseSchemes() { return S.schemes.filter(function (s) { return s.role === "browse"; }); }
  function value(sid, vid) { return scheme(sid).values.filter(function (v) { return v.id === vid; })[0]; }
  function label(sid, vid) { var v = value(sid, vid); return v ? v.label : vid; }
  function priceText(vid) { var v = value("price", vid); return v ? v.label + " " + v.detail : vid; }
  function tagsOf(r, sid) { return (r.tags && r.tags[sid]) || []; }
  function byId(id) { return S.restaurants.filter(function (r) { return r.id === id; })[0]; }
  function inValue(sid, vid) { return S.restaurants.filter(function (r) { return tagsOf(r, sid).indexOf(vid) !== -1; }); }
  function byName(a, b) { return a.name.localeCompare(b.name); }
  function categoryLink(by, id, narrow) {
    var u = "category.html?by=" + encodeURIComponent(by) + "&id=" + encodeURIComponent(id);
    Object.keys(narrow || {}).forEach(function (sid) {
      if (narrow[sid].length) u += "&" + encodeURIComponent(sid) + "=" + narrow[sid].map(encodeURIComponent).join(",");
    });
    return u;
  }
  // [F5] A real photo of the restaurant (details.js) when there is one;
  // the food stand-in is the fallback if the real photo fails to load.
  function standIn(r) {
    var P = window.PHOTOS;
    var key = r.photo || P.byCategory[tagsOf(r, "category")[0]] || "burger";
    var p = P.library[key];
    return { src: P.base + p.id + P.params, credit: p.by };
  }
  function photoOf(r) {
    var d = details(r);
    var stand = standIn(r);
    if (r.image) return { src: r.image, fallback: stand.src, credit: "", real: true };
    if (d.photo) return { src: d.photo, fallback: stand.src, credit: d.photoCredit || (r.name + "’s website"), real: true, standCredit: stand.credit };
    return { src: stand.src, credit: stand.credit, real: false };
  }
  function imgTag(ph, attrs) {
    return '<img src="' + esc(ph.src) + '" alt=""' + (attrs || "") +
      (ph.fallback ? ' data-fallback="' + esc(ph.fallback) + '" onerror="App.photoFailed(this)"' : "") + ">";
  }
  function details(r) { return (window.DETAILS && window.DETAILS[r.id]) || {}; }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }

  // ---------- ONE BLOCK TEMPLATE ----------
  // ctx: { href, rank, qid, query, reasons[], note, eyebrow, eyebrowHref }
  function block(r, ctx) {
    ctx = ctx || {};
    var ph = photoOf(r);
    var place = r.multipleLocations ? "Multiple Locations"
      : tagsOf(r, "city").map(function (c) { return label("city", c); }).join(", ");
    var chips =
      '<li class="chip chip-price" title="' + esc(priceText(tagsOf(r, "price")[0])) + '">' + esc(label("price", tagsOf(r, "price")[0])) + "</li>" +
      tagsOf(r, "dining").map(function (d) { return '<li class="chip">' + esc(label("dining", d)) + "</li>"; }).join("") +
      '<li class="chip chip-place">' + esc(place) + "</li>";
    var food = tagsOf(r, "category").map(function (c) { return label("category", c); }).join(" and ");
    var searchAttrs = ctx.qid
      ? ' data-log-type="result_click" data-qid="' + esc(ctx.qid) + '" data-query="' + esc(ctx.query) + '" data-rank="' + ctx.rank + '"'
      : "";
    return (
      '<li class="block">' +
        (ctx.eyebrow ? '<a class="block-eyebrow" href="' + esc(ctx.eyebrowHref) + '">' + esc(ctx.eyebrow) + "</a>" : "") +
        '<a class="block-link" href="' + esc(ctx.href || "restaurant.html?id=" + r.id) + '" data-restaurant="' + esc(r.id) + '"' +
          searchAttrs + ' data-log-label="' + esc(r.name) + '">' +
          '<span class="block-photo">' + imgTag(ph, ' loading="lazy" width="360" height="230"') + "</span>" +
          '<span class="block-body">' +
            '<span class="block-food">' + esc(food) + "</span>" +
            '<span class="block-title">' + esc(r.name) + "</span>" +
            '<span class="block-summary">' + esc(r.summary) + "</span>" +
          "</span>" +
        "</a>" +
        '<ul class="chips" aria-label="Details">' + chips + "</ul>" +
        (ctx.reasons && ctx.reasons.length
          ? '<p class="block-why"><span class="why-label">Why it’s here:</span> ' + ctx.reasons.map(esc).join("; ") + "</p>" : "") +
        (ctx.note ? '<p class="block-note">' + ctx.note + "</p>" : "") +
      "</li>"
    );
  }

  // ---------- shared chrome ----------
  function header(active) {
    active = active || {};
    var q = active.query || "";
    // [F7] No category nav bar: browse from the Home cards or search.
    return (
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header">' +
        '<div class="bar">' +
          '<a class="wordmark" href="index.html"' + (active.home ? ' aria-current="page"' : "") + ">" +
            '<span>Utah Valley</span><span class="wordmark-sub">Eats</span></a>' +
          '<form class="search" action="search.html" method="get" role="search">' +
            '<label class="sr-only" for="q">Search restaurants</label>' +
            '<input id="q" name="q" type="search" autocomplete="off" value="' + esc(q) + '" ' +
              'placeholder="Try “tacos”, “$10”, “fancy SLC” or a restaurant name">' +
            '<button type="submit" data-log="search-submit">Search</button>' +
          "</form>" +
          '<span class="bar-balance" aria-hidden="true"></span>' +
        "</div>" +
      "</header>"
    );
  }
  function crumbs(items) {
    return '<nav class="crumbs" aria-label="Breadcrumb"><ol>' + items.map(function (it, i) {
      return i === items.length - 1 ? '<li aria-current="page">' + esc(it.label) + "</li>"
        : '<li><a href="' + esc(it.href) + '">' + esc(it.label) + "</a></li>";
    }).join("") + "</ol></nav>";
  }
  function footer() {
    return '<footer class="site-footer"><div class="wrap">' +
      "<p>Restaurants of Utah Valley, final prototype by Audrey Burrell and Morgan Burnside.</p>" +
      "<p>Restaurant details checked " + esc(window.DETAILS_CHECKED || "") + ". Hours change, so check a restaurant’s website before you go. " +
      'Restaurant photos belong to the restaurants; food stand-ins are from <a href="https://unsplash.com">Unsplash</a>. ' +
      '<a href="log.html">Test Log</a></p>' +
      "</div></footer>";
  }
  function page(active, body) {
    return header(active) + '<main id="main" class="wrap">' + body + "</main>" + footer();
  }

  // ---------- Home ----------
  // One card per category in each browse view: Food Type first, then
  // Dining Experience. Same photo/name/count structure for both sections.
  function viewCard(b, v) {
    var P = window.PHOTOS;
    var key = (P.byView[b.id] || {})[v.id];
    var p = key && P.library[key];
    var n = inValue(b.id, v.id).length;
    return '<li class="view-card"><a href="' + categoryLink(b.id, v.id) + '" data-log-label="' + esc(b.label + ": " + v.label) + '">' +
      '<span class="view-card-photo">' + (p ? '<img src="' + esc(P.base + p.id + P.params) + '" alt="" loading="lazy" width="360" height="230">' : "") + "</span>" +
      '<span class="view-card-body"><span class="view-card-name">' + esc(v.label) + "</span>" +
      '<span class="view-card-count">' + plural(n, "restaurant") + "</span></span></a></li>";
  }
  function home() {
    document.title = S.title;
    return page({ home: true },
      '<section class="intro">' +
        "<h1>Where should we eat?</h1>" +
        '<p class="lede">Browse ' + S.restaurants.length + " restaurants from Provo to Salt Lake by the food you want or by how you want to eat. " +
          "Or search for anything: a dish, a price, a city, a night out.</p>" +
      "</section>" +
      S.homeSections.map(function (sec) {
        var b = scheme(sec.by);
        return '<section class="home-section" aria-labelledby="home-' + b.id + '">' +
          '<h2 id="home-' + b.id + '">' + esc(sec.heading) + "</h2>" +
          '<p class="section-note">' + esc(sec.note) + "</p>" +
          '<ul class="view-cards">' + b.values.map(function (v) { return viewCard(b, v); }).join("") + "</ul>" +
        "</section>";
      }).join(""));
  }

  // ---------- Category (both views) ----------
  function category() {
    var p = params();
    var b = scheme(p.get("by") || browseSchemes()[0].id);
    if (!b || b.role !== "browse") return notFound();
    var v = value(b.id, p.get("id"));
    if (!v) return notFound();
    document.title = v.label + " | " + S.title;
    var other = browseSchemes().filter(function (x) { return x.id !== b.id; })[0];
    return page({ by: b.id, id: v.id },
      crumbs([{ label: "Home", href: "index.html" }, { label: b.label + ": " + v.label }]) +
      '<div class="page-head"><p class="view-name">' + esc(b.label) + "</p><h1>" + esc(v.label) + "</h1></div>" +
      '<div class="with-rail">' +
        '<aside class="rail" aria-label="Narrow these restaurants" id="rail"></aside>' +
        '<section aria-live="polite"><p class="count" id="count"></p><ul class="blocks" id="list"></ul></section>' +
      "</div>" +
      '<script type="application/json" id="cat-data">' +
        JSON.stringify({ by: b.id, cat: v.id, other: other.id }) + "</script>");
  }

  // facet counts: for each value, how many restaurants would show if it were
  // added, given every OTHER group's current choices (OR within a group).
  function facetCounts(pool, groupIds, chosen) {
    var counts = {};
    groupIds.forEach(function (sid) {
      var others = pool.filter(function (r) {
        return Object.keys(chosen).every(function (k) {
          if (k === sid || !chosen[k].length) return true;
          return tagsOf(r, k).some(function (x) { return chosen[k].indexOf(x) !== -1; });
        });
      });
      counts[sid] = {};
      scheme(sid).values.forEach(function (val) {
        counts[sid][val.id] = others.filter(function (r) { return tagsOf(r, sid).indexOf(val.id) !== -1; }).length;
      });
    });
    return counts;
  }
  function applyChosen(pool, chosen) {
    return pool.filter(function (r) {
      return Object.keys(chosen).every(function (k) {
        return !chosen[k].length || tagsOf(r, k).some(function (x) { return chosen[k].indexOf(x) !== -1; });
      });
    });
  }

  // One rail template for every page that narrows a list.
  // logAttrs: extra attributes for each checkbox (search adds qid/query).
  function railHtml(pool, groupIds, chosen, logAttrs) {
    var counts = facetCounts(pool, groupIds, chosen);
    var any = groupIds.some(function (sid) { return chosen[sid].length; });
    return groupIds.map(function (sid) {
      var s = scheme(sid);
      var opts = s.values.map(function (val) {
        var n = counts[sid][val.id];
        var on = chosen[sid].indexOf(val.id) !== -1;
        var off = !n && !on;
        if (off && !pool.some(function (r) { return tagsOf(r, sid).indexOf(val.id) !== -1; })) return ""; // never in this list
        return '<label class="opt' + (on ? " is-on" : "") + (off ? " is-off" : "") + '"><input type="checkbox" data-scheme="' + sid + '" value="' + esc(val.id) + '"' +
          (logAttrs || "") + (on ? " checked" : "") + (off ? " disabled" : "") + "><span>" + esc(val.label) + (val.detail ? ' <span class="opt-detail">' + esc(val.detail) + "</span>" : "") +
          '</span><span class="opt-count" aria-label="' + plural(n, "restaurant") + '">' + n + "</span></label>";
      }).join("");
      return opts ? '<fieldset><legend>' + esc(s.narrowLabel) + "</legend>" + opts + "</fieldset>" : "";
    }).join("") +
    (any ? '<button type="button" class="clear" id="clear"' + (logAttrs || "") + ">Clear all</button>" : "");
  }
  function wireRail(rail, chosen, onChange) {
    Array.prototype.forEach.call(rail.querySelectorAll("input"), function (box) {
      box.addEventListener("change", function () {
        var list = chosen[box.dataset.scheme];
        var i = list.indexOf(box.value);
        if (box.checked && i === -1) list.push(box.value);
        if (!box.checked && i !== -1) list.splice(i, 1);
        onChange();
      });
    });
  }

  function wireCategory() {
    var el = document.getElementById("cat-data");
    if (!el) return;
    var d = JSON.parse(el.textContent);
    var b = scheme(d.by);
    var pool = inValue(d.by, d.cat).sort(byName);
    var groupIds = b.filters;
    var p = params();
    var chosen = {};
    groupIds.forEach(function (sid) { chosen[sid] = (p.get(sid) || "").split(",").filter(Boolean); });

    function draw() {
      var shown = applyChosen(pool, chosen);
      var any = groupIds.some(function (sid) { return chosen[sid].length; });
      document.getElementById("rail").innerHTML = railHtml(pool, groupIds, chosen);
      document.getElementById("count").textContent = any
        ? "Showing " + shown.length + " of " + plural(pool.length, "restaurant")
        : plural(pool.length, "restaurant");
      document.getElementById("list").innerHTML = shown.length
        ? shown.map(function (r) {
            return block(r, {
              href: "restaurant.html?id=" + r.id + "&by=" + d.by + "&from=" + d.cat,
              note: alsoIn(r, d.by, d.cat)
            });
          }).join("")
        : '<li class="empty"><h2>Nothing here with those choices</h2><p>Uncheck a box on the left, or <button type="button" class="linklike" id="clear2">clear all</button>.</p></li>';
      // keep the URL in step so Back and shared links keep the narrowing
      var u = new URLSearchParams({ by: d.by, id: d.cat });
      groupIds.forEach(function (sid) { if (chosen[sid].length) u.set(sid, chosen[sid].join(",")); });
      history.replaceState(null, "", "category.html?" + u.toString());
      wireRail(document.getElementById("rail"), chosen, draw);
      ["clear", "clear2"].forEach(function (id) {
        var c = document.getElementById(id);
        if (c) c.addEventListener("click", function () { groupIds.forEach(function (sid) { chosen[sid] = []; }); draw(); });
      });
    }
    draw();
  }
  // Cross-listed blocks say where else they live, linking to that page.
  function alsoIn(r, by, cat) {
    var links = [];
    browseSchemes().forEach(function (s) {
      tagsOf(r, s.id).forEach(function (vid) {
        if (s.id === by && vid === cat) return;
        if (s.id !== by) return; // same-view cross-listings only, keeps the card quiet
        links.push('<a href="' + categoryLink(s.id, vid) + '">' + esc(label(s.id, vid)) + "</a>");
      });
    });
    return links.length ? "Also in " + links.join(" and ") : "";
  }

  // ---------- Restaurant ----------
  function restaurant() {
    var p = params();
    var r = byId(p.get("id"));
    if (!r) return notFound();
    document.title = r.name + " | " + S.title;
    var trail = [{ label: "Home", href: "index.html" }];
    var active = {};
    var q = p.get("q");
    if (q) {
      trail.push({ label: "Search: " + q, href: "search.html?q=" + encodeURIComponent(q) + (p.get("qid") ? "&qid=" + p.get("qid") : "") });
      active.query = q;
    } else {
      var by = p.get("by"), from = p.get("from");
      if (!by || tagsOf(r, by).indexOf(from) === -1) { by = "category"; from = tagsOf(r, "category")[0]; }
      if (from) { trail.push({ label: scheme(by).label + ": " + label(by, from), href: categoryLink(by, from) }); active.by = by; active.id = from; }
    }
    trail.push({ label: r.name });
    var ph = photoOf(r);
    var d = details(r);
    var locs = d.locations || [];
    var homes = browseSchemes().map(function (s) {
      var vals = tagsOf(r, s.id);
      if (!vals.length) return "";
      return "<div><dt>" + esc(s.label) + "</dt><dd>" + vals.map(function (v) {
        return '<a class="tag" href="' + categoryLink(s.id, v) + '">' + esc(label(s.id, v)) + "</a>";
      }).join(" ") + "</dd></div>";
    }).join("");
    var related = active.by
      ? inValue(active.by, active.id).filter(function (x) { return x.id !== r.id; }).sort(byName).slice(0, 3) : [];

    // Quick actions: website, call, directions (first location)
    var first = locs[0] || {};
    var actions = [];
    if (d.website) actions.push('<a class="action action-primary" href="' + esc(d.website) + '" target="_blank" rel="noopener" data-log-label="Website: ' + esc(r.name) + '">Website</a>');
    if (first.phone) actions.push('<a class="action" href="tel:' + esc(first.phone.replace(/[^\d+]/g, "")) + '" data-log-label="Call: ' + esc(r.name) + '">Call ' + esc(first.phone) + "</a>");
    if (first.address && /\d/.test(first.address)) actions.push('<a class="action" href="' + mapLink(first.address) + '" target="_blank" rel="noopener" data-log-label="Directions: ' + esc(r.name) + '">Directions</a>');

    // Cities this restaurant is tagged with but that have no listed address
    var others = tagsOf(r, "city").filter(function (c) {
      var re = CITY_MATCH[c];
      return re && !locs.some(function (l) { return re.test((l.name || "") + " " + l.address); });
    }).map(function (c) { return label("city", c); });

    var locHtml = locs.map(function (l) {
      var hasStreet = /\d/.test(l.address);
      return '<li class="loc">' +
        (l.name ? "<h3>" + esc(l.name) + "</h3>" : "") +
        '<p class="loc-address">' + (hasStreet
          ? '<a href="' + mapLink(l.address) + '" target="_blank" rel="noopener" data-log-label="Map: ' + esc(l.address) + '">' + esc(l.address) + "</a>"
          : esc(l.address)) + "</p>" +
        (l.phone ? '<p class="loc-phone"><a href="tel:' + esc(l.phone.replace(/[^\d+]/g, "")) + '">' + esc(l.phone) + "</a></p>" : "") +
        (l.hours ? '<table class="hours"><caption class="sr-only">Hours</caption><tbody>' + l.hours.map(function (h) {
            return '<tr><th scope="row">' + esc(h[0]) + "</th><td" + (/closed/i.test(h[1]) ? ' class="closed"' : "") + ">" + esc(h[1]) + "</td></tr>";
          }).join("") + "</tbody></table>"
          : (hasStreet ? '<p class="loc-hours-missing">Call or check the website for hours.</p>' : "")) +
        "</li>";
    }).join("");

    var food = tagsOf(r, "category").map(function (c) { return label("category", c); }).join(" and ");
    return page(active,
      crumbs(trail) +
      '<article class="detail">' +
        '<figure class="detail-photo">' + imgTag({ src: ph.real ? ph.src : ph.src.replace("w=720&h=460", "w=1200&h=640"), fallback: ph.fallback ? ph.fallback.replace("w=720&h=460", "w=1200&h=640") : "" }) +
          '<figcaption data-real="' + (ph.real ? "Photo: " + esc(ph.credit) : "") + '" data-stand="Stand-in food photo' + (ph.standCredit ? " by " + esc(ph.standCredit) + " on Unsplash" : "") + '">' +
            (ph.real ? "Photo: " + esc(ph.credit) : "Stand-in food photo by " + esc(ph.credit) + " on Unsplash") + "</figcaption></figure>" +
        '<div class="detail-text">' +
          '<p class="detail-food">' + esc(food) + "</p>" +
          "<h1>" + esc(r.name) + "</h1>" +
          '<p class="lede">' + esc(d.about || r.summary) + "</p>" +
          (actions.length ? '<div class="actions">' + actions.join("") + "</div>" : "") +
          '<dl class="facts">' +
            "<div><dt>Price per Person</dt><dd>" + esc(priceText(tagsOf(r, "price")[0])) + "</dd></div>" +
            homes +
            (d.known && d.known.length ? "<div><dt>Known For</dt><dd><ul class=\"known\">" + d.known.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></dd></div>" : "") +
          "</dl>" +
          (d.notes && d.notes.length ? '<div class="good-to-know"><h2>Good to Know</h2><ul>' + d.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></div>" : "") +
        "</div>" +
      "</article>" +
      '<section class="locations" aria-labelledby="loc-h">' +
        '<h2 id="loc-h">' + (locs.length > 1 ? "Locations &amp; Hours" : "Location &amp; Hours") + "</h2>" +
        '<ul class="locs">' + locHtml + "</ul>" +
        (others.length ? '<p class="also-in">Also in ' + esc(listJoin(others)) + (d.website ? '. <a href="' + esc(d.website) + '" target="_blank" rel="noopener">Find those locations on their website</a>.' : ".") + "</p>" : "") +
        '<p class="checked">Checked ' + esc(window.DETAILS_CHECKED || "") + ". Hours can change, so check before you go.</p>" +
      "</section>" +
      (related.length
        ? '<section class="related"><h2>More in ' + esc(label(active.by, active.id)) + '</h2><ul class="blocks">' +
          related.map(function (x) { return block(x, { href: "restaurant.html?id=" + x.id + "&by=" + active.by + "&from=" + active.id }); }).join("") +
          "</ul></section>"
        : ""));
  }
  function mapLink(address) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address); }
  function listJoin(a) { return a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]; }
  var CITY_MATCH = {
    "provo": /Provo/, "orem": /Orem/, "springville": /Springville/, "lindon": /Lindon/,
    "pleasant-grove": /Pleasant Grove/, "american-fork": /American Fork/, "lehi": /Lehi/,
    "sundance": /Sundance/, "salt-lake": /Salt Lake|Sandy|Cottonwood|Sugar House|Draper|Fort Union/
  };

  // ---------- Search results ----------
  var FACET_GROUPS = ["category", "dining", "price", "city"];
  function searchPage() {
    var p = params();
    var q = (p.get("q") || "").trim();
    document.title = (q ? "“" + q + "”" : "Search") + " | " + S.title;
    return page({ query: q },
      crumbs([{ label: "Home", href: "index.html" }, { label: "Search" }]) +
      '<div id="search-out"></div>');
  }
  function wireSearch() {
    var out = document.getElementById("search-out");
    if (!out) return;
    var p = params();
    var q = (p.get("q") || "").trim();
    if (!q) { out.innerHTML = emptyQuery(); return; }
    var res = window.Search.run(q);
    var qid = p.get("qid");
    if (!qid) {
      qid = window.Log.newQueryId();
      window.Log.event("search", {
        qid: qid, query: q, label: q,
        detail: JSON.stringify({
          results: res.results.length,
          names: res.names.map(function (n) { return n.id + (n.how === "meant" ? " (meant)" : ""); }),
          concepts: res.concepts.map(function (c) { return c.term + "→" + c.concept.id; }),
          price: res.price ? res.price.typed : "",
          literal: res.literal, corrected: res.corrections, ignored: res.ignored || [],
          top: res.results.slice(0, 5).map(function (x) { return x.r.id; })
        })
      });
      var u = new URLSearchParams(location.search); u.set("qid", qid);
      history.replaceState(null, "", "search.html?" + u.toString());
    }
    var chosen = {};
    FACET_GROUPS.forEach(function (g) { chosen[g] = []; });
    (p.get("f") || "").split(",").filter(Boolean).forEach(function (pair) {
      var bits = pair.split(":"); if (chosen[bits[0]]) chosen[bits[0]].push(bits[1]);
    });

    function draw() {
      var pool = res.results.map(function (x) { return x.r; });
      var shown = applyChosen(pool, chosen);
      var any = FACET_GROUPS.some(function (g) { return chosen[g].length; });
      var understood = interpretation(res);
      var html = '<div class="results-head"><h1>' + (res.results.length
          ? plural(res.results.length, "restaurant") + " for “" + esc(q) + "”"
          : "No restaurants match “" + esc(q) + "”") + "</h1>" + understood + "</div>";

      if (!res.results.length) {
        out.innerHTML = html + noResults(res, q, qid);
        return;
      }
      var logAttrs = ' data-qid="' + qid + '" data-query="' + esc(q) + '"';
      html += '<div class="with-rail">' +
        '<aside class="rail" aria-label="Narrow these results" id="rail">' + railHtml(pool, FACET_GROUPS, chosen, logAttrs) + "</aside>" +
        '<section aria-live="polite">' +
          (any ? '<p class="count">Showing ' + shown.length + " of " + plural(pool.length, "restaurant") + "</p>" : "");
      var reasons = {};
      res.results.forEach(function (x) { reasons[x.r.id] = x.reasons; });
      html += '<ul class="blocks">' + (shown.length ? shown.map(function (r, i) {
        return block(r, {
          href: "restaurant.html?id=" + r.id + "&q=" + encodeURIComponent(q) + "&qid=" + qid,
          qid: qid, query: q, rank: i + 1, reasons: reasons[r.id]
        });
      }).join("") : '<li class="empty"><h2>None of these results fit all of that</h2><p>Uncheck a box on the left.</p></li>') + "</ul>" +
        "</section></div>";
      out.innerHTML = html;

      wireRail(document.getElementById("rail"), chosen, function () { sync(); draw(); });
      var c = document.getElementById("clear");
      if (c) c.addEventListener("click", function () { FACET_GROUPS.forEach(function (g) { chosen[g] = []; }); sync(); draw(); });
    }
    function sync() {
      var u = new URLSearchParams({ q: q, qid: qid });
      var f = [];
      FACET_GROUPS.forEach(function (g) { chosen[g].forEach(function (v) { f.push(g + ":" + v); }); });
      if (f.length) u.set("f", f.join(","));
      history.replaceState(null, "", "search.html?" + u.toString());
    }
    draw();
  }
  // Shows how the query was understood, so the concept layer is visible.
  function interpretation(res) {
    var bits = [];
    res.corrections.forEach(function (c) { bits.push("<li>“" + esc(c.typed) + "” read as “" + esc(c.meant) + "”</li>"); });
    res.concepts.forEach(function (c) {
      bits.push("<li>" + c.terms.map(function (t) { return "“" + esc(t) + "”"; }).join(", ") + " → " + esc(c.concept.shows) + "</li>");
    });
    if (res.price) bits.push("<li>“" + esc(res.price.typed) + "” → " + esc(res.price.tiers.map(function (t) { return label("price", t); }).join(" or ")) + "</li>");
    (res.ignored || []).forEach(function (w) { bits.push('<li class="ignored">Ignored “' + esc(w) + "”</li>"); });
    return bits.length ? '<div class="understood"><span>We searched for</span><ul>' + bits.join("") + "</ul></div>" : "";
  }
  function noResults(res, q, qid) {
    var parts = [];
    if (res.relaxations.length) {
      parts.push("<h2>Loosen one part of your search</h2><ul class=\"try\">" + res.relaxations.map(function (x) {
        var nq = x.drop.reduce(function (s, w) { return s.replace(new RegExp("\\b" + w.replace(/[$.]/g, "\\$&") + "\\b", "i"), ""); }, q).replace(/\s+/g, " ").trim();
        return '<li><a href="search.html?q=' + encodeURIComponent(nq) + '">Search without “' + esc(x.drop.join("”, “")) + "”</a> " +
          '<span class="muted">' + plural(x.count, "restaurant") + "</span></li>";
      }).join("") + "</ul>");
    }
    if (res.suggestions.length) {
      parts.push("<h2>Did you mean</h2><ul class=\"try\">" + res.suggestions.map(function (r) {
        return '<li><a href="restaurant.html?id=' + r.id + "&q=" + encodeURIComponent(q) + "&qid=" + qid + '" data-log-type="result_click" data-qid="' + qid +
          '" data-query="' + esc(q) + '" data-rank="suggestion" data-restaurant="' + r.id + '">' + esc(r.name) + "</a></li>";
      }).join("") + "</ul>");
    }
    var examples = ["tacos", "cheap burger", "$10", "fancy SLC", "cone or milkshake", "first date", "pasta", "breakfast in Orem"];
    parts.push("<h2>Try searching for</h2><p class=\"examples\">A food, a price, a city or an occasion: " +
      examples.map(function (e) { return '<a class="chip-link" href="search.html?q=' + encodeURIComponent(e) + '">' + esc(e) + "</a>"; }).join(" ") + "</p>");
    parts.push("<h2>Or browse</h2>" + browseSchemes().map(function (b) {
      return '<p class="examples"><span class="muted">' + esc(b.label) + ":</span> " + b.values.map(function (v) {
        return '<a class="chip-link" href="' + categoryLink(b.id, v.id) + '">' + esc(v.label) + "</a>";
      }).join(" ") + "</p>";
    }).join(""));
    return '<div class="no-results">' + parts.join("") + "</div>";
  }
  function emptyQuery() {
    return '<div class="no-results"><h1>Search restaurants</h1><p>Type a food, a price, a city or a restaurant name in the search box above.</p></div>';
  }

  // ---------- Log page ----------
  function logPage() {
    document.title = "Test Log | " + S.title;
    return page({},
      crumbs([{ label: "Home", href: "index.html" }, { label: "Test Log" }]) +
      '<div class="page-head"><h1>Test Log</h1><p class="lede">Every click and search on this browser is recorded here for the task test. ' +
      "Results clicks carry the id of the search that produced them.</p></div>" +
      '<div class="log-tools">' +
        '<form id="session-form" class="log-session"><label for="participant">Participant</label>' +
          '<input id="participant" type="text" autocomplete="off"><button type="submit">Start new session</button></form>' +
        '<div class="log-actions"><button type="button" id="dl-json">Download JSON</button>' +
          '<button type="button" id="dl-csv">Download CSV</button>' +
          '<button type="button" id="log-clear" class="danger">Clear log</button></div>' +
      "</div>" +
      '<p class="count" id="log-count"></p>' +
      '<div class="log-table-wrap"><table class="log-table"><thead><tr>' +
        "<th>Time</th><th>Participant</th><th>Type</th><th>Label</th><th>Target</th><th>Search id</th><th>Rank</th><th>Page</th>" +
      '</tr></thead><tbody id="log-body"></tbody></table></div>');
  }
  function wireLog() {
    var body = document.getElementById("log-body");
    if (!body) return;
    var L = window.Log;
    document.getElementById("participant").value = L.session().participant || "";
    function draw() {
      var all = L.all();
      document.getElementById("log-count").textContent = plural(all.length, "event") + " stored in this browser";
      body.innerHTML = all.slice().reverse().slice(0, 300).map(function (e) {
        return '<tr class="t-' + esc(e.type) + '"><td>' + esc(e.ts.replace("T", " ").slice(0, 19)) + "</td><td>" + esc(e.participant) +
          "</td><td>" + esc(e.type) + "</td><td>" + esc(e.type === "search" ? e.query : e.label) + "</td><td>" + esc(e.target || e.restaurant) +
          "</td><td>" + esc(e.qid) + "</td><td>" + esc(e.rank) + "</td><td>" + esc(e.page) + "</td></tr>";
      }).join("");
    }
    function download(name, text, type) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([text], { type: type }));
      a.download = name; document.body.appendChild(a); a.click(); a.remove();
    }
    var stamp = function () { return new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-"); };
    document.getElementById("session-form").addEventListener("submit", function (ev) {
      ev.preventDefault();
      L.newSession(document.getElementById("participant").value.trim());
      draw();
    });
    document.getElementById("dl-json").addEventListener("click", function () {
      download("uv-eats-log-" + stamp() + ".json", JSON.stringify(L.all(), null, 2), "application/json");
    });
    document.getElementById("dl-csv").addEventListener("click", function () {
      download("uv-eats-log-" + stamp() + ".csv", L.toCSV(L.all()), "text/csv");
    });
    document.getElementById("log-clear").addEventListener("click", function () {
      if (confirm("Delete every logged event in this browser? Download first if you need them.")) { L.clear(); draw(); }
    });
    draw();
  }

  function notFound() {
    document.title = "Not found | " + S.title;
    return page({}, '<div class="no-results"><h1>That page isn’t here</h1><p><a href="index.html">Go to Home</a> or search above.</p></div>');
  }

  window.App = {
    block: block,
    // [F5] a real photo that fails to load falls back to the food stand-in
    photoFailed: function (img) {
      img.onerror = null;
      if (img.dataset.fallback) img.src = img.dataset.fallback;
      var cap = img.parentNode && img.parentNode.querySelector("figcaption");
      if (cap && cap.dataset.stand) cap.textContent = cap.dataset.stand;
    },
    render: function (name) {
      var fn = { home: home, category: category, restaurant: restaurant, search: searchPage, log: logPage }[name];
      var html = fn();
      if (window.Log) window.Log.event("page_view", { label: document.title, detail: document.referrer ? "from " + document.referrer.split("/").pop() : "" });
      document.getElementById("app").innerHTML = html;
      if (name === "category") wireCategory();
      if (name === "search") wireSearch();
      if (name === "log") wireLog();
    }
  };
})();
