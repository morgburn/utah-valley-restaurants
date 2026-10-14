/*
 * ============================================================
 *  LOGGING: the task test's instrument
 * ============================================================
 *  - Every click on the page is logged (links, buttons, checkboxes,
 *    facet buttons, cards), with the page it happened on.
 *  - Every search query is logged with an id (qid). Clicks on a search
 *    result carry that qid and the result's rank, so each result-click
 *    is tied to the query that produced it.
 *  - Events persist in localStorage (survive reloads and page changes)
 *    and export as JSON or CSV from log.html.
 */
(function () {
  var KEY = "uvr_v1_log";
  var SESSION_KEY = "uvr_v1_session";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save(events) {
    try { localStorage.setItem(KEY, JSON.stringify(events)); } catch (e) { /* storage full or blocked */ }
  }
  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
  }
  function session() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) {}
    if (!s) {
      s = { id: uid("s"), participant: "", started: new Date().toISOString() };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
    }
    return s;
  }
  function pageName() {
    var file = (location.pathname.split("/").pop() || "index.html").replace(".html", "") || "index";
    return file + location.search;
  }

  var Log = {
    session: session,
    newSession: function (participant) {
      var s = { id: uid("s"), participant: participant || "", started: new Date().toISOString() };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
      Log.event("session_start", { label: participant || "(no name)" });
      return s;
    },
    setParticipant: function (name) {
      var s = session();
      s.participant = name;
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {}
    },
    newQueryId: function () { return uid("q"); },
    // type: page_view | click | filter | facet | search | result_click | session_start
    event: function (type, data) {
      var s = session();
      var e = {
        ts: new Date().toISOString(),
        session: s.id,
        participant: s.participant,
        page: pageName(),
        type: type,
        label: "", target: "", qid: "", query: "", rank: "", restaurant: "", detail: ""
      };
      for (var k in data) if (data[k] !== undefined && data[k] !== null) e[k] = data[k];
      var all = load();
      all.push(e);
      save(all);
      return e;
    },
    all: load,
    clear: function () { save([]); },
    columns: ["ts", "session", "participant", "page", "type", "label", "target", "qid", "query", "rank", "restaurant", "detail"],
    toCSV: function (events) {
      var cols = Log.columns;
      function cell(v) {
        v = v === undefined || v === null ? "" : (typeof v === "object" ? JSON.stringify(v) : String(v));
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }
      return [cols.join(",")].concat(events.map(function (e) {
        return cols.map(function (c) { return cell(e[c]); }).join(",");
      })).join("\n");
    }
  };

  // ---------- one delegated listener logs every click ----------
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest("a, button, input, label, summary, [data-log]");
    if (!el) {
      Log.event("click", { label: "(background)", target: ev.target.tagName.toLowerCase() });
      return;
    }
    // A label click fires a second click on its checkbox; log only the checkbox.
    if (el.tagName === "LABEL" && el.querySelector("input")) return;
    if (el.tagName === "INPUT" && el.type === "text") return;        // focusing the search box
    if (el.tagName === "INPUT" && el.type === "search") return;

    var text = (el.getAttribute("data-log-label") || el.getAttribute("aria-label") ||
                (el.innerText || el.value || "")).replace(/\s+/g, " ").trim().slice(0, 120);
    var d = {
      label: text,
      target: el.getAttribute("href") || el.getAttribute("data-log") || el.tagName.toLowerCase(),
      qid: el.getAttribute("data-qid") || "",
      query: el.getAttribute("data-query") || "",
      rank: el.getAttribute("data-rank") || "",
      restaurant: el.getAttribute("data-restaurant") || ""
    };
    var type = el.getAttribute("data-log-type") || "click";
    if (el.tagName === "INPUT" && el.type === "checkbox") {
      type = "filter";
      var lab = el.closest("label"), span = lab && lab.querySelector("span");
      d.label = (span ? span.innerText : el.value).replace(/\s+/g, " ").trim();
      d.target = el.getAttribute("data-scheme") + ":" + el.value;
      d.detail = el.checked ? "on" : "off";
    }
    Log.event(type, d);
  }, true);

  window.Log = Log;
})();
