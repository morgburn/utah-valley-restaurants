/*
 * Rendering logic. Every page reads from data.js, so you should not need to
 * edit this file to add or remove restaurants, categories, views, or filters.
 *
 * URLs
 *   index.html                                   home: one section per browse scheme
 *   category.html?by=<scheme>&id=<value>         a category page in one view
 *                                                (by defaults to the first browse scheme)
 *   restaurant.html?id=<id>&by=<scheme>&from=<value>
 *                                                a restaurant; by/from remember how
 *                                                the user got there, for the breadcrumb
 */
(function () {
  var S = window.SITE;
  var OPTS = { params: null, test: false, onFilter: null };

  // ---------- helpers ----------
  function param(name) {
    var p = OPTS.params || new URLSearchParams(window.location.search);
    return p.get(name);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function scheme(id) { return S.schemes.filter(function (s) { return s.id === id; })[0]; }
  function browseSchemes() { return S.schemes.filter(function (s) { return s.role === "browse"; }); }
  function primary() { return browseSchemes()[0]; }
  function filterSchemes() { return S.schemes.filter(function (s) { return s.role === "filter"; }); }
  // filters shown on a browse scheme's category pages
  function filtersFor(b) {
    var ids = b.filters || filterSchemes().map(function (s) { return s.id; });
    return ids.map(scheme).filter(Boolean);
  }
  // facts shown on cards: the plain filter schemes (price, service, city)
  function cardFacts() { return filterSchemes(); }
  function valueLabel(sch, valueId) {
    var v = sch.values.filter(function (x) { return x.id === valueId; })[0];
    return v ? v.label : valueId;
  }
  function tagsOf(r, schemeId) { return (r.tags && r.tags[schemeId]) || []; }
  function inValue(schemeId, valueId) {
    return S.restaurants.filter(function (r) { return tagsOf(r, schemeId).indexOf(valueId) !== -1; });
  }
  function byName(a, b) { return a.name.localeCompare(b.name); }
  function restaurantLink(r, by, fromId) {
    return "restaurant.html?id=" + encodeURIComponent(r.id) +
      (fromId ? "&by=" + encodeURIComponent(by) + "&from=" + encodeURIComponent(fromId) : "");
  }
  function categoryLink(by, valueId) {
    return "category.html?by=" + encodeURIComponent(by) + "&id=" + encodeURIComponent(valueId);
  }

  // ---------- shared chrome ----------
  // active: { home: true } or { by: schemeId, id: valueId }
  function header(active) {
    active = active || {};
    var rows = browseSchemes().map(function (b) {
      var links = b.values.map(function (v) {
        var on = active.by === b.id && active.id === v.id;
        return '<li><a href="' + categoryLink(b.id, v.id) + '"' + (on ? ' class="active" aria-current="page"' : "") +
          ">" + esc(v.label) + "</a></li>";
      }).join("");
      return '<nav aria-label="' + esc(b.label) + '" class="nav-row"><span class="nav-label">' + esc(b.label) +
        ':</span><ul class="global-nav">' + links + "</ul></nav>";
    }).join("");
    return (
      '<header class="site-header">' +
        '<a class="logo" href="index.html">[Logo] ' + esc(S.title) + "</a>" +
        (OPTS.test ? "" : '<a class="treetest-btn" href="treetest.html">Start tree test</a>') +
        '<p class="home-link"><a href="index.html"' + (active.home ? ' class="active" aria-current="page"' : "") +
          ">Home</a></p>" +
        rows +
      "</header>"
    );
  }
  function breadcrumb(items) {
    return '<nav class="breadcrumb" aria-label="Breadcrumb">' +
      items.map(function (it, i) {
        var last = i === items.length - 1;
        return last ? "<span>" + esc(it.label) + "</span>"
                    : '<a href="' + it.href + '">' + esc(it.label) + "</a> &rsaquo; ";
      }).join("") + "</nav>";
  }
  function footer() {
    return '<footer class="site-footer">[Footer: about, contact, wireframe v1]</footer>';
  }
  function lines(n) {
    var out = "";
    for (var i = 0; i < n; i++) out += '<div class="line"></div>';
    return out;
  }

  function card(r, by, fromId) {
    var b = scheme(by);
    var others = tagsOf(r, by).filter(function (v) { return v !== fromId; });
    var meta = cardFacts().map(function (s) {
      if (s.multipleLabel && r.multipleLocations) return s.multipleLabel;
      return tagsOf(r, s.id).map(function (v) { return valueLabel(s, v); }).join(", ");
    }).filter(Boolean).join(" · ");
    return (
      '<li><a class="card" href="' + restaurantLink(r, by, fromId) + '">' +
        '<div class="ph ph-img">Image</div>' +
        '<div class="card-body">' +
          "<strong>" + esc(r.name) + "</strong>" +
          (meta ? '<div class="meta">' + esc(meta) + "</div>" : "") +
          (fromId && others.length
            ? '<div class="also">Also in: ' + others.map(function (v) { return esc(valueLabel(b, v)); }).join(", ") + "</div>"
            : "") +
        "</div>" +
      "</a></li>"
    );
  }

  // ---------- pages ----------
  function home() {
    var sections = browseSchemes().map(function (b) {
      var tiles = b.values.map(function (v) {
        var n = inValue(b.id, v.id).length;
        return '<li><a class="tile" href="' + categoryLink(b.id, v.id) + '">' +
          '<div class="ph ph-img">Image</div>' +
          "<strong>" + esc(v.label) + "</strong>" +
          '<span class="meta">' + n + " restaurant" + (n === 1 ? "" : "s") + "</span>" +
        "</a></li>";
      }).join("");
      return "<section><h2>Browse by " + esc(b.label.toLowerCase()) + '</h2><ul class="grid">' + tiles + "</ul></section>";
    }).join("");
    return header({ home: true }) +
      "<main>" +
        '<section class="hero"><h1>' + esc(S.title) + "</h1>" + lines(2) + "</section>" +
        sections +
      "</main>" + footer();
  }

  function category() {
    var b = scheme(param("by") || primary().id);
    if (!b || b.role !== "browse") return notFound();
    var v = b.values.filter(function (x) { return x.id === param("id"); })[0];
    if (!v) return notFound();
    document.title = v.label + " | " + S.title;

    var list = inValue(b.id, v.id).sort(byName);

    var filterHtml = filtersFor(b).map(function (s) {
      var opts = s.values.map(function (val) {
        return '<label><input type="checkbox" data-scheme="' + esc(s.id) + '" value="' + esc(val.id) + '"> ' +
          esc(val.label) + "</label>";
      }).join("");
      return "<fieldset><legend>" + esc(s.label) + "</legend>" + opts + "</fieldset>";
    }).join("");

    return header({ by: b.id, id: v.id }) +
      "<main>" +
        breadcrumb([{ label: "Home", href: "index.html" }, { label: b.label + ": " + v.label }]) +
        '<p class="view-label">' + esc(b.label) + "</p>" +
        "<h1>" + esc(v.label) + "</h1>" + lines(1) +
        '<div class="layout">' +
          (filterHtml
            ? '<aside class="filters"><h2>Filter</h2>' + filterHtml +
              '<button type="button" id="clear">Clear filters</button></aside>'
            : "") +
          '<section><p class="count" id="count"></p><ul class="list" id="list"></ul></section>' +
        "</div>" +
      "</main>" + footer() +
      '<script type="application/json" id="cat-data">' +
        JSON.stringify({ by: b.id, cat: v.id, ids: list.map(function (r) { return r.id; }) }) +
      "</script>";
  }

  function wireCategory() {
    var dataEl = document.getElementById("cat-data");
    if (!dataEl) return;
    var d = JSON.parse(dataEl.textContent);
    var all = S.restaurants.filter(function (r) { return d.ids.indexOf(r.id) !== -1; }).sort(byName);
    var boxes = Array.prototype.slice.call(document.querySelectorAll(".filters input[type=checkbox]"));

    function apply() {
      // OR within a scheme, AND across schemes
      var chosen = {};
      boxes.forEach(function (b) {
        if (b.checked) (chosen[b.dataset.scheme] = chosen[b.dataset.scheme] || []).push(b.value);
      });
      var shown = all.filter(function (r) {
        return Object.keys(chosen).every(function (sid) {
          return tagsOf(r, sid).some(function (v) { return chosen[sid].indexOf(v) !== -1; });
        });
      });
      document.getElementById("count").textContent =
        "Showing " + shown.length + " of " + all.length + " restaurants";
      document.getElementById("list").innerHTML = shown.length
        ? shown.map(function (r) { return card(r, d.by, d.cat); }).join("")
        : '<li class="empty">No restaurants match these filters.</li>';
    }
    boxes.forEach(function (b) {
      b.addEventListener("change", function () {
        apply();
        if (OPTS.onFilter) {
          var sch = scheme(b.dataset.scheme);
          OPTS.onFilter({ scheme: sch.label, value: valueLabel(sch, b.value), checked: b.checked });
        }
      });
    });
    var clear = document.getElementById("clear");
    if (clear) clear.addEventListener("click", function () {
      boxes.forEach(function (b) { b.checked = false; });
      apply();
      if (OPTS.onFilter) OPTS.onFilter({ clear: true });
    });
    apply();
  }

  function restaurant() {
    var r = S.restaurants.filter(function (x) { return x.id === param("id"); })[0];
    if (!r) return notFound();
    document.title = r.name + " | " + S.title;

    // Which view did the user come from? Fall back to the first view the restaurant is in.
    var b = scheme(param("by") || "");
    var from = param("from");
    if (!b || tagsOf(r, b.id).indexOf(from) === -1) {
      b = browseSchemes().filter(function (s) { return tagsOf(r, s.id).length; })[0];
      from = b ? tagsOf(r, b.id)[0] : null;
    }

    var crumbs = [{ label: "Home", href: "index.html" }];
    if (from) crumbs.push({ label: b.label + ": " + valueLabel(b, from), href: categoryLink(b.id, from) });
    crumbs.push({ label: r.name });

    var tagRows = browseSchemes().map(function (s) {
      var vals = tagsOf(r, s.id);
      if (!vals.length) return "";
      return '<p class="tags">' + esc(s.label) + ": " + vals.map(function (c) {
        return '<a class="tag" href="' + categoryLink(s.id, c) + '">' + esc(valueLabel(s, c)) + "</a>";
      }).join(" ") + "</p>";
    }).join("");

    var facetRows = filterSchemes().map(function (s) {
      var vals = tagsOf(r, s.id).map(function (v) { return valueLabel(s, v); }).join(", ");
      if (s.multipleLabel && r.multipleLocations) {
        return "<dt>" + esc(s.label) + "</dt><dd>" + esc(s.multipleLabel) +
          (vals ? ", including " + esc(vals) : "") + "</dd>";
      }
      return vals ? "<dt>" + esc(s.label) + "</dt><dd>" + esc(vals) + "</dd>" : "";
    }).join("");

    var related = from
      ? inValue(b.id, from).filter(function (x) { return x.id !== r.id; }).sort(byName).slice(0, 3)
      : [];

    return header(from ? { by: b.id, id: from } : {}) +
      "<main>" +
        breadcrumb(crumbs) +
        '<div class="ph ph-hero">Hero image</div>' +
        "<h1>" + esc(r.name) + "</h1>" +
        tagRows +
        '<div class="layout detail">' +
          "<section>" +
            "<h2>About</h2>" + lines(4) +
            "<h2>Menu highlights</h2>" +
            '<div class="row"><div class="ph ph-sm">Dish</div><div class="ph ph-sm">Dish</div><div class="ph ph-sm">Dish</div></div>' +
            "<h2>Photos</h2>" +
            '<div class="row"><div class="ph ph-sm">Photo</div><div class="ph ph-sm">Photo</div><div class="ph ph-sm">Photo</div></div>' +
          "</section>" +
          '<aside class="info">' +
            "<h2>Details</h2><dl>" + facetRows + "</dl>" +
            "<h2>Hours</h2>" + lines(3) +
            "<h2>" + (r.multipleLocations ? "Locations" : "Location") + "</h2>" + '<div class="ph ph-map">Map</div>' +
              (r.multipleLocations ? '<p class="meta">[Location list / "Find nearest" selector]</p>' + lines(2) : lines(1)) +
            '<div class="buttons"><button type="button">Directions</button> <button type="button">Website</button></div>' +
          "</aside>" +
        "</div>" +
        (related.length
          ? "<h2>More in " + esc(valueLabel(b, from)) + '</h2><ul class="list">' +
            related.map(function (x) { return card(x, b.id, from); }).join("") + "</ul>"
          : "") +
      "</main>" + footer();
  }

  function notFound() {
    return header({}) +
      "<main><h1>Page not found</h1><p><a href=\"index.html\">Back to Home</a></p></main>" + footer();
  }

  // ---------- boot ----------
  window.App = {
    helpers: { scheme: scheme, primary: primary, browseSchemes: browseSchemes, valueLabel: valueLabel },
    // opts (used by the tree test): { params: URLSearchParams, test: true, onFilter: fn }
    render: function (page, opts) {
      OPTS = opts || { params: null, test: false, onFilter: null };
      var html = { home: home, category: category, restaurant: restaurant }[page]();
      document.getElementById("app").innerHTML = html;
      if (OPTS.test) document.title = "Tree test";
      if (page === "category") wireCategory();
    }
  };
})();
