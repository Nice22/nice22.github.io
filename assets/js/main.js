/* =============================================
   MAIN JAVASCRIPT
   portfolio/assets/js/main.js
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ══════════════════════════════
     1. CUSTOM CURSOR
     ══════════════════════════════ */
  const cur  = document.getElementById("cur");
  const ring = document.getElementById("cur-ring");
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top  = my + "px";
  });

  (function loopRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(loopRing);
  })();

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cur.style.width   = "5px";
      cur.style.height  = "5px";
      ring.style.width  = "52px";
      ring.style.height = "52px";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width   = "10px";
      cur.style.height  = "10px";
      ring.style.width  = "36px";
      ring.style.height = "36px";
    });
  });


  /* ══════════════════════════════
     2. DARK / LIGHT THEME TOGGLE
     ══════════════════════════════ */
  const html      = document.documentElement;
  const themeIcon = document.getElementById("theme-icon");

  window.toggleTheme = function () {
    const isDark = html.getAttribute("data-theme") === "dark";
    const next   = isDark ? "light" : "dark";
    html.setAttribute("data-theme", next);
    themeIcon.textContent = isDark ? "🌙" : "☀️";
    localStorage.setItem("theme", next);
  };

  // Restore saved theme on load
  const saved = localStorage.getItem("theme");
  if (saved) {
    html.setAttribute("data-theme", saved);
    if (themeIcon) themeIcon.textContent = saved === "light" ? "🌙" : "☀️";
  }


  /* ══════════════════════════════
     3. TYPEWRITER EFFECT
     ══════════════════════════════ */
  const phrases = [
    "Dev Web Full-Stack",
    "Électrotechnicien",
    "IoT & Innovation",
    "Créateur de contenu TIC",
    "Marketing Digital IA"
  ];

  const tw = document.getElementById("typewriter");
  if (tw) {
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const word = phrases[pi];
      if (!deleting) {
        tw.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        tw.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    setTimeout(type, 1000);
  }


  /* ══════════════════════════════
     4. SCROLL REVEAL
     ══════════════════════════════ */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));


  /* ══════════════════════════════
     5. SKILL BAR ANIMATION
     ══════════════════════════════ */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.getAttribute("data-w");
        setTimeout(() => { e.target.style.width = w + "%"; }, 80);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".skill-bar-fill").forEach(b => {
    b.style.width = "0";
    barObs.observe(b);
  });


  /* ══════════════════════════════
     6. COUNTER ANIMATION
     ══════════════════════════════ */
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.getAttribute("data-target");
        let current  = 0;
        const step   = target / 40;
        const iv     = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(iv);
          }
          e.target.textContent = Math.floor(current) + (target >= 5 ? "+" : "");
        }, 30);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".counter").forEach(c => counterObs.observe(c));


  /* ══════════════════════════════
     7. PROJECT FILTER TABS
     ══════════════════════════════ */
  document.querySelectorAll(".ftab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".proj-card").forEach(card => {
        const cats = card.getAttribute("data-cat") || "";
        card.classList.toggle("hidden", filter !== "all" && !cats.includes(filter));
      });
    });
  });


  /* ══════════════════════════════
     8. CONTACT FORM → EMAIL
        Remplacez l'adresse email ci-dessous
        par celle de votre choix.
     ══════════════════════════════ */
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const prenom  = document.getElementById("f-prenom").value.trim();
      const nom     = document.getElementById("f-nom").value.trim();
      const email   = document.getElementById("f-email").value.trim();
      const tel     = document.getElementById("f-tel").value.trim();
      const message = document.getElementById("f-message").value.trim();

      /* ── Mailto fallback (aucune dépendance serveur) ── */
      const subject  = encodeURIComponent(`[Portfolio] Demande de ${prenom} ${nom}`);
      const body     = encodeURIComponent(
        `Prénom : ${prenom}\nNom : ${nom}\nEmail : ${email}\nTél : ${tel || "—"}\n\n${message}`
      );

      /* ⚠️  REMPLACEZ "benothouessou74@gmail.com" par votre adresse email */
      window.location.href = `mailto:benothouessou74+portfolio@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
