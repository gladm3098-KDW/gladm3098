/**
 * main.js — 지엘행정사 사무소 공통 스크립트
 * 모든 페이지(index/services/cases/consult)가 이 파일 하나를 공유합니다.
 */
document.addEventListener('DOMContentLoaded', function () {

  /* 1. 모바일 메뉴 토글 */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var backdrop = document.querySelector('.nav-backdrop');

  function closeNav() {
    if (toggle) toggle.classList.remove('is-open');
    if (nav) nav.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    if (toggle) toggle.classList.add('is-open');
    if (nav) nav.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.classList.add('no-scroll');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeNav(); else openNav();
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeNav);
  if (nav) {
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
  });

  /* 2. 등장 애니메이션(reveal) */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* 3. FAQ 아코디언 (data-faq 컨테이너 내부에 위임) */
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var group = item.closest('.faq-list');
      var wasOpen = item.classList.contains('is-open');
      if (group) {
        group.querySelectorAll('.faq-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
      }
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  /* 4. 업무분야 앵커 탭 활성화(services.html) */
  var tabLinks = document.querySelectorAll('.tab-link');
  if (tabLinks.length) {
    tabLinks.forEach(function (t) {
      t.addEventListener('click', function () {
        tabLinks.forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
      });
    });
    var blockIds = Array.prototype.map.call(tabLinks, function (t) { return t.getAttribute('href').replace('#', ''); });
    window.addEventListener('scroll', function () {
      var offset = 190;
      blockIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var rect = el.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          tabLinks.forEach(function (t) { t.classList.remove('is-active'); });
          var active = document.querySelector('.tab-link[href="#' + id + '"]');
          if (active) active.classList.add('is-active');
        }
      });
    }, { passive: true });
  }

  /* 5. GA 이벤트: 전화/카카오 클릭 추적 */
  var pageName = document.body.getAttribute('data-page') || document.title;
  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag !== 'undefined') gtag('event', 'phone_click', { event_category: 'contact', event_label: pageName });
    });
  });
  document.querySelectorAll('a[href*="open.kakao.com"]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag !== 'undefined') gtag('event', 'kakao_click', { event_category: 'contact', event_label: pageName });
    });
  });
  document.querySelectorAll('a[href^="consult.html"]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag !== 'undefined') gtag('event', 'consult_click', { event_category: 'contact', event_label: pageName });
    });
  });
});
