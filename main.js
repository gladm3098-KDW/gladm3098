/**
 * main.js - 지엘행정사 사무소 필수 인터랙션(바닐라 JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 헤더 모바일 메뉴 토글
  const menuBtn = document.querySelector('.header__menu-btn');
  const nav = document.querySelector('.header__nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // 2. 스크롤 방향에 따른 헤더 숨김/표시 (선택적 UX 개선)
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if (!header) return;
    
    // 모바일 메뉴가 열려있을 때는 헤더가 숨겨지지 않도록 함
    if (nav.classList.contains('active')) return;

    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // 스크롤 내릴 때 헤더 숨김
      header.classList.add('hide-up');
    } else {
      // 스크롤 올릴 때 헤더 표시
      header.classList.remove('hide-up');
    }
    lastScrollY = window.scrollY;
  });

  // 3. Smooth fade-in 애니메이션 (섹션 등장 시)
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 한 번 보이면 관측 취소
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
});
