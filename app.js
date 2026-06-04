// ==========================================================================
// SHAHRIXON 1-SON TEHNIKUM — Premium Interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavScrollBehaviour();
  initMobileMenu();
  initScrollReveal();
  initHeroVideoPerf();
  initLanguageSwitcher();
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. NAV — transparent over hero, white after scroll
// ─────────────────────────────────────────────────────────────────────────────
function initNavScrollBehaviour() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  function update() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // run once on load
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. MOBILE MENU — slide-in from right, swipe-to-close
// ─────────────────────────────────────────────────────────────────────────────
function initMobileMenu() {
  const burger  = document.getElementById('burger');
  const overlay = document.getElementById('mobile-overlay');
  const close   = document.getElementById('mobile-close');

  if (!burger || !overlay) return;

  const links = overlay.querySelectorAll('a');

  function openMenu() {
    overlay.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    overlay.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  links.forEach(l => l.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Swipe-left to close on mobile
  let touchStartX = 0;
  overlay.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 60) closeMenu(); // swipe left 60px to close
  }, { passive: true });
}


// ─────────────────────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL — IntersectionObserver based, no library
// ─────────────────────────────────────────────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Only fire once
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => {
    observer.observe(el);
  });

  // Elements already visible on load (above the fold)
  requestAnimationFrame(() => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('in-view');
        observer.unobserve(el);
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. VIDEO PERFORMANCE — Pause videos when off-screen (saves CPU/battery)
// ─────────────────────────────────────────────────────────────────────────────
function initHeroVideoPerf() {
  const videos = document.querySelectorAll('video[autoplay]');
  if (!videos.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const vid = entry.target;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    },
    { threshold: 0.1 }
  );

  videos.forEach(v => observer.observe(v));
}


// ─────────────────────────────────────────────────────────────────────────────
// 5. LANGUAGE SWITCHER (Google Translate Custom UI)
// ─────────────────────────────────────────────────────────────────────────────
function initLanguageSwitcher() {
  // 1. Inject hidden Google Translate Element
  const gtag = document.createElement('div');
  gtag.id = 'google_translate_element';
  gtag.style.display = 'none';
  document.body.appendChild(gtag);

  // 2. Inject Google Translate Script
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'uz', 
      includedLanguages: 'uz,ru,en', 
      autoDisplay: false
    }, 'google_translate_element');
  };
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(script);

  // 3. Inject Custom Switcher into Nav
  const navInner = document.querySelector('.nav-inner');
  if (!navInner) return;

  const switcherHTML = `
    <div class="lang-switcher">
      <div class="lang-current">
        <img src="https://flagcdn.com/w20/uz.png" alt="UZ">
        <span>UZ</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="lang-dropdown">
        <button data-lang="uz"><img src="https://flagcdn.com/w20/uz.png" alt="UZ"> O'zbek</button>
        <button data-lang="ru"><img src="https://flagcdn.com/w20/ru.png" alt="RU"> Русский</button>
        <button data-lang="en"><img src="https://flagcdn.com/w20/gb.png" alt="EN"> English</button>
      </div>
    </div>
  `;
  
  // Insert before burger menu or at end of nav
  const burger = document.querySelector('.burger');
  if(burger) {
    burger.insertAdjacentHTML('beforebegin', switcherHTML);
  } else {
    navInner.insertAdjacentHTML('beforeend', switcherHTML);
  }

  // 4. Logic for Dropdown & Translate trigger
  const switcher = document.querySelector('.lang-switcher');
  const currentBtn = switcher.querySelector('.lang-current');
  const dropdown = switcher.querySelector('.lang-dropdown');
  
  currentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('active');
  });

  const langBtns = dropdown.querySelectorAll('button');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      
      // Update UI
      const imgSrc = e.currentTarget.querySelector('img').src;
      const langCode = lang.toUpperCase();
      currentBtn.innerHTML = `<img src="${imgSrc}" alt="${langCode}"> <span>${langCode}</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>`;

      // Trigger Google Translate
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      } else {
        // If script hasn't loaded yet, retry shortly
        setTimeout(() => {
          const sel = document.querySelector('.goog-te-combo');
          if (sel) { sel.value = lang; sel.dispatchEvent(new Event('change')); }
        }, 1000);
      }
    });
  });
}

