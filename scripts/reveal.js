/**
 * scripts/reveal.js — 스크롤 등장 애니메이션 · 헤더 스크롤 전환 · 카운트업
 * 모든 페이지(index/services/cases/consult)가 main.js와 함께 이 파일을 로드합니다.
 * prefers-reduced-motion이 설정된 환경에서는 애니메이션을 건너뛰고 최종 상태를 즉시 보여줍니다.
 */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. 스크롤 등장 애니메이션(reveal) */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* 2. 헤더 스크롤 전환(투명 → 화이트/블러) */
  var header = document.querySelector('.site-header');
  if (header) {
    var toggleHeaderState = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    toggleHeaderState();
    window.addEventListener('scroll', toggleHeaderState, { passive: true });
  }

  /* 3. 신뢰 지표 카운트업(data-countup="10" 형태의 숫자만 애니메이션) */
  var countEls = document.querySelectorAll('[data-countup]');
  if (countEls.length) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute('data-countup'));
      if (isNaN(target)) return;
      if (reduceMotion) { el.textContent = target; return; }
      var duration = 900;
      var start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };
      requestAnimationFrame(step);
    };
    if (reduceMotion) {
      countEls.forEach(function (el) { el.textContent = el.getAttribute('data-countup'); });
    } else {
      var countIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      countEls.forEach(function (el) { countIo.observe(el); });
    }
  }
})();
