/* HICH HOUSE — showroom interactions
   progress hairline · nav state · reveals · hero parallax · gallery strips */
(function(){
  "use strict";

  /* ---------- progress hairline ---------- */
  const progress = document.querySelector(".progress");
  const nav = document.querySelector("nav.bar");
  const hero = document.querySelector("header.hero");
  const heroImg = document.querySelector(".hero .hero-img");

  function onScroll(){
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    if (progress) progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
    if (nav && hero) nav.classList.toggle("solid", scrollY > hero.offsetHeight - 80);
    /* hero parallax — cinematic only */
    if (heroImg && document.body.dataset.motion === "cinematic" && !reduced){
      const y = Math.min(scrollY, innerHeight);
      heroImg.style.transform = "translateY(" + y * 0.22 + "px)";
    } else if (heroImg){
      heroImg.style.transform = "";
    }
  }
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveals (rv) + ken burns (kb) ----------
     Driven from the scroll handler (rAF-throttled) with a viewport check —
     no IntersectionObserver dependency, so it works in any embed. */
  let pending = Array.prototype.slice.call(document.querySelectorAll(".rv, .kb"));
  let rafQueued = false;
  function checkReveals(){
    rafQueued = false;
    if (!pending.length) return;
    const limit = innerHeight * 0.94;
    pending = pending.filter(function(el){
      const r = el.getBoundingClientRect();
      if (r.top < limit && r.bottom > 0){ el.classList.add("in"); return false; }
      return true;
    });
  }
  function queueReveals(){
    if (!rafQueued){ rafQueued = true; requestAnimationFrame(checkReveals); }
  }
  addEventListener("scroll", queueReveals, { passive: true });
  addEventListener("resize", queueReveals);
  addEventListener("load", queueReveals);
  checkReveals();
  /* failsafe: if nothing revealed shortly after load, show everything */
  setTimeout(function(){
    if (document.querySelectorAll(".rv.in").length === 0){
      pending.forEach(function(el){ el.classList.add("in"); });
      pending = [];
    }
  }, 1500);

  /* ---------- rAF scroll tween (smooth-scroll is unreliable in some embeds) ---------- */
  function tween(el, prop, target, dur, before, after){
    const start = el[prop];
    const delta = target - start;
    if (delta === 0) return;
    if (before) before();
    const prevBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    const t0 = performance.now();
    function frame(now){
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
      el[prop] = start + delta * e;
      if (p < 1) requestAnimationFrame(frame);
      else {
        document.documentElement.style.scrollBehavior = prevBehavior;
        if (after) after();
      }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- horizontal strips: arrows + drag ---------- */
  document.querySelectorAll(".room").forEach(function(room){
    const strip = room.querySelector(".strip");
    if (!strip) return;
    const prev = room.querySelector("[data-prev]");
    const next = room.querySelector("[data-next]");
    /* glide to an EXACT slide boundary so snap never yanks afterwards (no "jump") */
    function glide(dir){
      const max = Math.max(0, strip.scrollWidth - strip.clientWidth);
      const cur = strip.scrollLeft;
      const offs = Array.prototype.map.call(strip.querySelectorAll(".slide"), function(s){ return s.offsetLeft; });
      let target;
      if (dir > 0){
        target = offs.find(function(o){ return o > cur + 2; });
        if (target === undefined) target = max;            /* already at the last slide → ease to the tail */
      } else {
        target = 0;
        for (let i = 0; i < offs.length; i++){ if (offs[i] < cur - 2) target = offs[i]; }
      }
      target = Math.max(0, Math.min(target, max));
      if (reduced){ strip.scrollLeft = target; return; }
      tween(strip, "scrollLeft", target, 450,
        function(){ strip.style.scrollSnapType = "none"; },
        function(){ strip.style.scrollSnapType = ""; });
    }
    if (prev) prev.addEventListener("click", function(){ glide(-1); });
    if (next) next.addEventListener("click", function(){ glide(1); });

    /* keyboard access */
    strip.setAttribute("tabindex", "0");
    strip.setAttribute("role", "region");
    const h3 = room.querySelector(".room-head h3");
    strip.setAttribute("aria-label", (h3 ? h3.textContent + " " : "") + "photo gallery — use arrow keys");
    /* a11y: describe each gallery image and give the arrows their gallery context */
    strip.querySelectorAll(".slide").forEach(function(slide){
      const cap = slide.querySelector("figcaption span");
      const ph = slide.querySelector(".ph");
      if (ph && !ph.getAttribute("aria-label")){
        ph.setAttribute("role", "img");
        ph.setAttribute("aria-label", (cap ? cap.textContent : "Photo") + (h3 ? " — " + h3.textContent : "") + " at HICH House");
      }
    });
    if (prev) prev.setAttribute("aria-label", "Previous photo" + (h3 ? ", " + h3.textContent + " gallery" : ""));
    if (next) next.setAttribute("aria-label", "Next photo" + (h3 ? ", " + h3.textContent + " gallery" : ""));
    strip.addEventListener("keydown", function(e){
      if (e.key === "ArrowRight"){ e.preventDefault(); glide(1); }
      if (e.key === "ArrowLeft"){ e.preventDefault(); glide(-1); }
    });

    /* pointer drag */
    let down = false, startX = 0, startL = 0, moved = false;
    strip.addEventListener("pointerdown", function(e){
      down = true; moved = false; startX = e.clientX; startL = strip.scrollLeft;
    });
    addEventListener("pointermove", function(e){
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 6){ moved = true; strip.classList.add("dragging"); }
      if (moved) strip.scrollLeft = startL - dx;
    });
    addEventListener("pointerup", function(){
      down = false;
      strip.classList.remove("dragging");
    });
  });

  /* ---------- anchor links: rAF tween (same embed quirk) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click", function(e){
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const doc = document.documentElement;
      const dest = Math.min(target.getBoundingClientRect().top + scrollY, doc.scrollHeight - innerHeight);
      if (reduced || document.body.dataset.motion === "still") scrollTo(0, dest);
      else tween(doc, "scrollTop", dest, 700);
      history.replaceState(null, "", a.getAttribute("href"));
    });
  });

  /* ---------- brochure links carry the current mood ---------- */
  document.querySelectorAll(".book-pdf").forEach(function(a){
    a.addEventListener("click", function(){
      const base = a.getAttribute("href").split(/[?&]mood=/)[0];
      const sep = base.indexOf("?") === -1 ? "?" : "&";
      a.setAttribute("href", base + sep + "mood=" + (document.body.dataset.mood || "02"));
    });
  });

  /* ---------- "Share website": the END-CUSTOMER link — current mood locked, no wizard/index ---------- */
  document.querySelectorAll(".book-share").forEach(function(b){
    const original = b.textContent;
    let restoreTimer;
    function flash(msg){
      b.textContent = msg;
      clearTimeout(restoreTimer);
      restoreTimer = setTimeout(function(){ b.textContent = original; }, 2000);
    }
    function legacyCopy(url){
      try {
        const ta = document.createElement("textarea");
        ta.value = url; ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.top = "-9999px"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        flash(ok ? "Link copied ✓" : "Copy failed");
      } catch (err) { flash("Copy failed"); }
    }
    function copy(url){
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).then(
          function(){ flash("Link copied ✓"); },
          function(){ legacyCopy(url); }
        );
      } else { legacyCopy(url); }
    }
    b.addEventListener("click", function(){
      const mood = document.body.dataset.mood || "02";
      const url = location.origin + location.pathname + "?view=public&mood=" + mood;
      /* native share sheet only where it's the expected UX (touch / phones); desktop copies the link */
      const useNative = navigator.share &&
        (matchMedia("(pointer:coarse)").matches || innerWidth <= 720);
      if (useNative){
        navigator.share({ title: "Hich-House-Showroom", url: url }).catch(function(err){
          if (err && err.name === "AbortError") return;   /* user dismissed the sheet — fine */
          copy(url);                                       /* any real failure → reliable fallback */
        });
      } else {
        copy(url);
      }
    });
  });

  /* ---------- photo lightbox (GLightbox): tap any photo → full-screen, aspect kept, close button ---------- */
  if (window.GLightbox){
    const photos = Array.prototype.slice.call(document.querySelectorAll(".ph"))
      .filter(function(el){
        if (el.closest("header.hero")) return false;             /* the hero is a backdrop, not a gallery shot */
        const v = el.style.getPropertyValue("--img");
        return v && v.indexOf("url(") !== -1;
      });
    if (photos.length){
      const elements = photos.map(function(el){
        const raw = el.style.getPropertyValue("--img");
        const href = raw.replace(/^\s*url\(\s*['"]?/, "").replace(/['"]?\s*\)\s*$/, "");
        let cap = el.getAttribute("data-cap");
        if (!cap){
          const fig = el.closest("figure");
          const t = fig && fig.querySelector("figcaption span");
          cap = t ? t.textContent.trim() : "";
        }
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("aria-label", "View photo full screen" + (cap ? ": " + cap : ""));
        el.style.cursor = "zoom-in";
        return { href: href, type: "image", title: cap || "" };
      });
      const lb = GLightbox({ elements: elements, loop: true, zoomable: true, touchNavigation: true, closeButton: true, openEffect: "fade", closeEffect: "fade" });
      photos.forEach(function(el, i){
        el.addEventListener("click", function(){ lb.openAt(i); });
        el.addEventListener("keydown", function(e){
          if (e.key === "Enter" || e.key === " "){ e.preventDefault(); lb.openAt(i); }
        });
      });
    }
  }

  /* ---------- restore scroll position ---------- */
  try {
    const saved = sessionStorage.getItem("hich-scroll");
    if (saved) scrollTo(0, parseInt(saved, 10));
    addEventListener("scroll", function(){ sessionStorage.setItem("hich-scroll", String(scrollY)); }, { passive: true });
  } catch (err) { /* private mode */ }
})();
