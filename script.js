(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track Mouse for Cursor Gradient
  if (!reduceMotion) {
    var cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
      document.addEventListener('mousemove', function (e) {
        // Set CSS custom properties on the glow layer
        cursorGlow.style.setProperty('--mouse-x', e.clientX + 'px');
        cursorGlow.style.setProperty('--mouse-y', e.clientY + 'px');
      });
    }
  }

  // Mobile nav drawer
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = drawer.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  // Scroll-triggered reveal
  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, (i % 3) * 70);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Popup-mockup shortcut cycle
  if (!reduceMotion) {
    var steps = document.querySelectorAll('.pm-bar span');
    if (steps.length) {
      var i = 0;
      steps[0].classList.add('step-active');
      setInterval(function () {
        steps[i].classList.remove('step-active');
        i = (i + 1) % steps.length;
        steps[i].classList.add('step-active');
      }, 2200);
    }
  }
})();