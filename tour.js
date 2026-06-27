/* HICH HOUSE — first-visit tour
   Two coach-marks: (1) the mood switcher, (2) the one-click brochure download. */
(function(){
  "use strict";
  var KEY = "hich-tour-done";
  /* the end-customer (public) link has no wizard / tour */
  try { if (new URLSearchParams(location.search).get("view") === "public") return; } catch(e){}
  try { if (localStorage.getItem(KEY)) return; } catch(e){ return; }

  var step = 0;
  var backdrop, card;

  var STEPS = [
    {
      eyebrow: "Welcome · 1 of 2",
      title: "One house, many moods.",
      body: "Use the Mood button to dress the whole page in any of the moodboard directions — colours, typography, atmosphere.",
      cta: "Next",
      anchor: function(){ return document.querySelector(".nav-moods"); }
    },
    {
      eyebrow: "Welcome · 2 of 2",
      title: "Take your favourite with you.",
      body: "At the end of the page you can open the brochure — A4 or mobile, in the mood you're viewing — or share a single-mood link for guests.",
      cta: "Got it",
      anchor: null
    }
  ];

  function finish(){
    try { localStorage.setItem(KEY, "1"); } catch(e){}
    if (backdrop) backdrop.remove();
    if (card) card.remove();
    document.body.style.overflow = "";
    var btn = document.querySelector(".nav-moods");
    if (btn){ btn.classList.remove("tour-glow"); btn.focus(); }
    removeEventListener("keydown", onKey);
  }

  function onKey(e){
    if (e.key === "Escape"){ finish(); return; }
    /* keep focus inside the dialog (WCAG 2.1.2) */
    if (e.key === "Tab" && card){
      var f = card.querySelectorAll("button");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      else if (!card.contains(document.activeElement)){ e.preventDefault(); first.focus(); }
    }
  }

  function render(){
    var s = STEPS[step];
    card.innerHTML =
      '<span class="tour-eyebrow">' + s.eyebrow + '</span>' +
      '<h2 class="tour-title">' + s.title + '</h2>' +
      '<p class="tour-body">' + s.body + '</p>' +
      '<div class="tour-actions">' +
        '<button class="tour-skip" type="button">Skip</button>' +
        '<button class="tour-next" type="button">' + s.cta + '</button>' +
      '</div>';

    var moodBtn = document.querySelector(".nav-moods");
    if (moodBtn) moodBtn.classList.toggle("tour-glow", step === 0);

    var anchor = s.anchor && s.anchor();
    var mobile = innerWidth <= 720;
    if (mobile){
      /* dock full-width just under the nav — no arrow chasing a tiny button */
      card.classList.remove("anchored");
      card.style.top = (anchor ? anchor.getBoundingClientRect().bottom + 12 : 80) + "px";
      card.style.left = "16px"; card.style.right = "16px";
      card.style.width = "auto"; card.style.transform = "none";
    } else if (anchor){
      var r = anchor.getBoundingClientRect();
      card.classList.add("anchored");
      card.style.top = (r.bottom + 14) + "px";
      card.style.right = Math.max(12, innerWidth - r.right) + "px";
      card.style.left = "auto"; card.style.width = ""; card.style.transform = "none";
    } else {
      card.classList.remove("anchored");
      card.style.top = "50%"; card.style.left = "50%"; card.style.right = "auto";
      card.style.width = ""; card.style.transform = "translate(-50%,-50%)";
    }

    card.querySelector(".tour-skip").addEventListener("click", finish);
    card.querySelector(".tour-next").addEventListener("click", function(){
      step += 1;
      if (step >= STEPS.length) finish();
      else render();
    });
    card.querySelector(".tour-next").focus();
  }

  function start(){
    backdrop = document.createElement("div");
    backdrop.className = "tour-backdrop";
    backdrop.addEventListener("click", finish);
    card = document.createElement("div");
    card.className = "tour-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    card.setAttribute("aria-label", "Quick tour");
    document.body.appendChild(backdrop);
    document.body.appendChild(card);
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    render();
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){ setTimeout(start, 1400); });
  } else {
    setTimeout(start, 1400);
  }
})();
