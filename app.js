/*
 * Rendering logic. Every page reads from data.js, so you should not need to
 * edit this file to add or remove restaurants, categories, or filters.
 */
(function () {
  var S = window.SITE;

  // ---------- helpers ----------
  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function primary() {
    return S.schemes.filter(function (s) { return s.role === "primary"; })[0];
  }
  function filters() {
    return S.schemes.filter(function (s) { return s.role === "filter"; });
  }
  function valueLabel(scheme, valueId) {
    var v = scheme.values.filter(function (x) { return x.id === valueId; })[0];
    return v ? v.label : valueId;
  }
  function tagsOf(r, schemeId) {
    return (r.tags && r.tags[schemeId]) || [];
  }
  function inValue(schemeId, valueId) {
    return S.restaurants.filter(function (r) {
      return tagsOf(r, schemeId).indexOf(valueId) !== -1;
    });
  }
  function byName(a, b) { return a.name.localeCompare(b.name); }
  function restaurantLink(r, fromId) {
    return "restaurant.html?id=" + encodeURIComponent(r.id) +
      (fromId ? "&from=" + encodeURIComponent(fromId) : "");
  }
  function categoryLink(valueId) {
    return "category.html?id=" + encodeURIComponent(valueId);
  }

  // ---------- shared chrome ----------
  function header(activeId) {
    var p = primary();
    var links = p.values.map(function (v) {
      var cls = v.id === activeId ? ' class="active" aria-current="page"' : "";
      return '<li><a href="' + categoryLink(v.id) + '"' + cls + ">" + esc(v.label) + "</a></li>";
    }).join("");
    return (
      '<header class="site-header">' +
        '<a class="logo" href="index.html">[Logo] ' + esc(S.title) + "</a>" +
        '<nav aria-label="' + esc(p.label) + '"><ul class="global-nav">' +
          '<li><a href="index.html"' + (activeId === "home" ? ' class="active"' : "") + ">Home</a></li>" +
          links +
        "</ul></nav>" +
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

  function card(r, fromId) {
    var p = primary();
    var others = tagsOf(r, p.id).filter(function (v) { return v !== fromId; });
    var meta = filters().map(function (s) {
      return tagsOf(r, s.id).map(function (v) { return valueLabel(s, v); }).join(", ");
    }).filter(Boolean).join(" · ");
    return (
      '<li><a class="card" href="' + restaurantLink(r, fromId) + '">' +
        '<div class="ph ph-img">Image</div>' +
        '<div class="card-body">' +
          "<strong>" + esc(r.name) + "</strong>" +
          (meta ? '<div class="meta">' + esc(meta) + "</div>" : "") +
          (fromId && others.length
            ? '<div class="also">Also in: ' + others.map(function (v) { return esc(valueLabel(p, v)); }).join(", ") + "</div>"
            : "") +
        "</div>" +
      "</a></li>"
    );
  }

  // ---------- pages ----------
  function home() {
    var p = primary();
    var tiles = p.values.map(function (v) {
      var n = inValue(p.id, v.id).length;
      return '<li><a class="tile" href="' + categoryLink(v.id) + '">' +
        '<div class="ph ph-img">Image</div>' +
        "<strong>" + esc(v.label) + "</strong>" +
        '<span class="meta">' + n + " restaurant" + (n === 1 ? "" : "s") + "</span>" +
      "</a></li>";
    }).join("");
    return header("home") +
      "<main>" +
        '<section class="hero"><h1>' + esc(S.title) + "</h1>" + lines(2) + "</section>" +
        "<h2>Browse by " + esc(p.label.toLowerCase()) + "</h2>" +
        '<ul class="grid">' + tiles + "</ul>" +
      "</main>" + footer();
  }

  function category() {
    var p = primary();
    var id = param("id");
    var v = p.values.filter(function (x) { return x.id === id; })[0];
    if (!v) return notFound();
    document.title = v.label + " | " + S.title;

    var list = inValue(p.id, v.id).sort(byName);

    var filterHtml = filters().map(function (s) {
      var opts = s.values.map(function (val) {
        return '<label><input type="checkbox" data-scheme="' + esc(s.id) + '" value="' + esc(val.id) + '"> ' +
          esc(val.label) + "</label>";
      }).join("");
      return "<fieldset><legend>" + esc(s.label) + "</legend>" + opts + "</fieldset>";
    }).join("");

    return header(v.id) +
      "<main>" +
        breadcrumb([{ label: "Home", href: "index.html" }, { label: v.label }]) +
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
        JSON.stringify({ cat: v.id, ids: list.map(function (r) { return r.id; }) }) +
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
        ? shown.map(function (r) { return card(r, d.cat); }).join("")
        : '<li class="empty">No restaurants match these filters.</li>';
    }
    boxes.forEach(function (b) { b.addEventListener("change", apply); });
    var clear = document.getElementById("clear");
    if (clear) clear.addEventListener("click", function () {
      boxes.forEach(function (b) { b.checked = false; });
      apply();
    });
    apply();
  }

  function restaurant() {
    var p = primary();
    var r = S.restaurants.filter(function (x) { return x.id === param("id"); })[0];
    if (!r) return notFound();
    document.title = r.name + " | " + S.title;

    var cats = tagsOf(r, p.id);
    var from = param("from");
    if (cats.indexOf(from) === -1) from = cats[0];

    var crumbs = [{ label: "Home", href: "index.html" }];
    if (from) crumbs.push({ label: valueLabel(p, from), href: categoryLink(from) });
    crumbs.push({ label: r.name });

    var catLinks = cats.map(function (c) {
      return '<a class="tag" href="' + categoryLink(c) + '">' + esc(valueLabel(p, c)) + "</a>";
    }).join(" ");

    var facetRows = filters().map(function (s) {
      var vals = tagsOf(r, s.id).map(function (v) { return valueLabel(s, v); }).join(", ");
      return vals ? "<dt>" + esc(s.label) + "</dt><dd>" + esc(vals) + "</dd>" : "";
    }).join("");

    var related = from
      ? inValue(p.id, from).filter(function (x) { return x.id !== r.id; }).sort(byName).slice(0, 3)
      : [];

    return header(from) +
      "<main>" +
        breadcrumb(crumbs) +
        '<div class="ph ph-hero">Hero image</div>' +
        "<h1>" + esc(r.name) + "</h1>" +
        '<p class="tags">' + esc(p.label) + (cats.length > 1 ? " (" + cats.length + ")" : "") + ": " + catLinks + "</p>" +
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
            "<h2>Location</h2>" + '<div class="ph ph-map">Map</div>' + lines(1) +
            '<div class="buttons"><button type="button">Directions</button> <button type="button">Website</button></div>' +
          "</aside>" +
        "</div>" +
        (related.length
          ? "<h2>More in " + esc(valueLabel(p, from)) + '</h2><ul class="list">' +
            related.map(function (x) { return card(x, from); }).join("") + "</ul>"
          : "") +
      "</main>" + footer();
  }

  function notFound() {
    return header("") +
      "<main><h1>Page not found</h1><p><a href=\"index.html\">Back to Home</a></p></main>" + footer();
  }

  // ---------- boot ----------
  window.App = {
    render: function (page) {
      var html = { home: home, category: category, restaurant: restaurant }[page]();
      document.getElementById("app").innerHTML = html;
      if (page === "category") wireCategory();
    }
  };
})();
