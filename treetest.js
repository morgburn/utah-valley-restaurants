/*
 * Tree test harness. It wraps the wireframe (app.js + data.js) without changing it.
 * Tasks come from tasks.js. Each participant gets an independently shuffled order.
 * A task ends when the participant clicks any restaurant card or "I would give up".
 * Results download as a CSV when the run finishes (one file per participant).
 */
(function () {
  var S = window.SITE, TASKS = window.TREETEST_TASKS, App = window.App;
  var KEY = "treetest-run";
  var root = document.getElementById("tt");
  var appEl = document.getElementById("app");
  var run = null;   // { participant, started, order:[ids], index, rows:[] }
  var cur = null;   // current task state

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function taskById(id) { return TASKS.filter(function (t) { return t.id === id; })[0]; }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(run)); } catch (e) {} }
  function load() { try { return JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { return null; } }
  function clearSaved() { try { sessionStorage.removeItem(KEY); } catch (e) {} }
  function primary() { return App.helpers.primary(); }
  function catLabel(id) { return App.helpers.valueLabel(primary(), id); }
  function restaurantName(id) {
    var r = S.restaurants.filter(function (x) { return x.id === id; })[0];
    return r ? r.name : id;
  }
  function viewLabel(v) { return v.page === "home" ? "Home" : catLabel(v.params.id); }

  // ---------- screens ----------
  function screen(html) {
    appEl.innerHTML = "";
    root.innerHTML = '<div class="tt-screen">' + html + "</div>";
    window.scrollTo(0, 0);
  }

  function intro() {
    var saved = load();
    var resume = saved && saved.index < saved.order.length && saved.rows.length
      ? '<div class="tt-box"><p><strong>Unfinished run found</strong> for "' + esc(saved.participant) + '" (' +
        saved.rows.length + " of " + saved.order.length + ' tasks done).</p>' +
        '<button type="button" id="tt-resume">Resume that run</button> ' +
        '<button type="button" id="tt-partial">Download its partial results</button></div>'
      : "";
    screen(
      "<h1>Tree test</h1>" + resume +
      '<div class="tt-box"><h2>For the facilitator</h2>' +
      "<p>Enter a participant name or ID, then hand over the computer.</p>" +
      '<label>Participant <input id="tt-pid" type="text" autocomplete="off"></label>' +
      "</div>" +
      '<div class="tt-box"><h2>Instructions for the participant</h2>' +
      "<p>We are testing how this website is organized. <strong>We are testing the website, not you.</strong></p>" +
      "<p>You will get " + TASKS.length + " short tasks, one at a time. For each one, click through the site to where you " +
      "think you would find it, and click the restaurant you would choose. Please think out loud as you go.</p>" +
      '<p>If you can\'t find something, press <strong>"I would give up."</strong> That is a useful result, not a failure.</p>' +
      "</div>" +
      '<button type="button" id="tt-start" class="tt-primary">Start the test</button>' +
      ' <a href="index.html">Back to the wireframe</a>'
    );
    document.getElementById("tt-start").onclick = function () {
      var pid = document.getElementById("tt-pid").value.trim();
      if (!pid) { alert("Please enter a participant name or ID."); return; }
      run = {
        participant: pid, started: new Date().toISOString(),
        order: shuffle(TASKS.map(function (t) { return t.id; })), index: 0, rows: []
      };
      save();
      taskIntro();
    };
    if (resume) {
      document.getElementById("tt-resume").onclick = function () { run = saved; taskIntro(); };
      document.getElementById("tt-partial").onclick = function () { download(saved, true); };
    }
  }

  function taskIntro() {
    var t = taskById(run.order[run.index]);
    screen(
      '<p class="tt-count">Task ' + (run.index + 1) + " of " + run.order.length + "</p>" +
      '<div class="tt-box tt-task">' + esc(t.text) + "</div>" +
      "<p>When you're ready, start the task. You'll begin on the home page.</p>" +
      '<button type="button" id="tt-begin" class="tt-primary">Start task</button>'
    );
    document.getElementById("tt-begin").onclick = function () { beginTask(t); };
  }

  function finish() {
    clearSaved();
    var done = run;
    screen(
      "<h1>All done. Thank you!</h1>" +
      '<div class="tt-box"><h2>For the facilitator</h2>' +
      "<p>The results for <strong>" + esc(done.participant) + "</strong> downloaded as a CSV file. " +
      "If it didn't download, use the button below. Keep this file; it is your raw data.</p>" +
      '<button type="button" id="tt-dl" class="tt-primary">Download results again</button> ' +
      '<button type="button" id="tt-next">Start next participant</button> ' +
      '<a href="index.html">Back to the wireframe</a></div>'
    );
    document.getElementById("tt-dl").onclick = function () { download(done, false); };
    document.getElementById("tt-next").onclick = function () { run = null; intro(); };
    download(done, false);
  }

  // ---------- running a task ----------
  function beginTask(t) {
    cur = {
      task: t, start: performance.now(), path: [], visited: {}, revisits: 0,
      filterChanges: 0, backs: 0
    };
    root.innerHTML =
      '<div class="tt-banner"><div><span class="tt-count">Task ' + (run.index + 1) + " of " + run.order.length +
      "</span><br>" + esc(t.text) + "</div>" +
      '<button type="button" id="tt-giveup">I would give up</button></div>';
    document.getElementById("tt-giveup").onclick = function () { endTask(null); };
    var v = { page: "home", params: {} };
    cur.visited.Home = 1;
    cur.key = run.participant + "#" + run.index;
    cur.view = v;
    history.pushState({ tt: true, k: cur.key, v: v }, "");
    show(v);
  }

  function show(v) {
    var params = new URLSearchParams(v.params);
    App.render(v.page, { params: params, test: true, onFilter: onFilter });
    window.scrollTo(0, 0);
  }

  function log(label) { cur.path.push(label); }

  function visit(v, viaBack) {
    var label = viewLabel(v);
    if (cur.visited[label]) cur.revisits++;
    cur.visited[label] = (cur.visited[label] || 0) + 1;
    if (viaBack) cur.backs++;
    log((viaBack ? "[Back] " : "") + label);
    cur.view = v;
    show(v);
  }

  function onFilter(f) {
    if (!cur) return;
    cur.filterChanges++;
    log(f.clear ? "[Clear filters]" : "[Filter " + f.scheme + ": " + f.value + (f.checked ? " on" : " off") + "]");
  }

  function endTask(restaurantId) {
    var t = cur.task;
    var secs = (performance.now() - cur.start) / 1000;
    var navClicks = cur.path.filter(function (p) { return p.charAt(0) !== "["; }).length;
    run.rows.push({
      participant: run.participant,
      session_start: run.started,
      task_position: run.index + 1,
      task_id: t.id,
      task_text: t.text,
      target: t.target,
      predicted_first_click: t.predicted,
      first_click: cur.path[0] || (restaurantId ? restaurantName(restaurantId) : "(none)"),
      click_path: ["Home"].concat(cur.path).concat(restaurantId ? [restaurantName(restaurantId)] : ["(gave up)"]).join(" > "),
      final_block: restaurantId ? restaurantName(restaurantId) : "",
      final_category: restaurantId ? (cur.lastCategory ? catLabel(cur.lastCategory) : "") : "",
      outcome: restaurantId ? "selected" : "gave_up",
      page_clicks: navClicks,
      filter_changes: cur.filterChanges,
      back_button_uses: cur.backs,
      revisits: cur.revisits,
      seconds: secs.toFixed(1)
    });
    run.index++;
    save();
    cur = null;
    if (run.index >= run.order.length) finish(); else taskIntro();
  }

  // Intercept clicks inside the wireframe while a task is running
  appEl.addEventListener("click", function (e) {
    if (!cur) return;
    var a = e.target.closest("a");
    if (!a) return;
    e.preventDefault();
    var href = a.getAttribute("href") || "";
    var q = new URLSearchParams(href.split("?")[1] || "");
    if (href.indexOf("restaurant.html") === 0) {
      cur.lastCategory = q.get("from") || (history.state && history.state.v && history.state.v.params.id) || "";
      endTask(q.get("id"));
      return;
    }
    var v = href.indexOf("category.html") === 0
      ? { page: "category", params: { id: q.get("id") } }
      : { page: "home", params: {} };
    history.pushState({ tt: true, k: cur.key, v: v }, "");
    visit(v, false);
  });

  // Browser back/forward during a task
  window.addEventListener("popstate", function (e) {
    if (!cur) return;
    // Backing out past the start of this task: stay on the current page
    if (!e.state || !e.state.tt || e.state.k !== cur.key) {
      history.pushState({ tt: true, k: cur.key, v: cur.view }, "");
      return;
    }
    visit(e.state.v, true);
  });

  // ---------- CSV ----------
  var COLS = ["participant", "session_start", "task_position", "task_id", "task_text", "target",
    "predicted_first_click", "first_click", "click_path", "final_block", "final_category", "outcome",
    "page_clicks", "filter_changes", "back_button_uses", "revisits", "seconds"];

  function csv(rows) {
    function cell(v) {
      v = v == null ? "" : String(v);
      return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
    }
    return [COLS.join(",")].concat(rows.map(function (r) {
      return COLS.map(function (c) { return cell(r[c]); }).join(",");
    })).join("\n");
  }

  function download(r, partial) {
    var blob = new Blob(["﻿" + csv(r.rows)], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    var safe = r.participant.replace(/[^a-z0-9_-]+/gi, "_");
    a.href = URL.createObjectURL(blob);
    a.download = "treetest_" + safe + "_" + r.started.slice(0, 10) + (partial ? "_partial" : "") + ".csv";
    document.body.appendChild(a); a.click(); a.remove();
  }

  intro();
})();
