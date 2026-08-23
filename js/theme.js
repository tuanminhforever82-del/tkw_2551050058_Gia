export function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Kiểm tra sự tồn tại của phần tử (Thoát êm nếu không có)
  if (!themeToggleBtn) return; 

  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    
    if (htmlElement.classList.contains('dark')) {
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}
export function initScrollAnimation() {
  const elements = document.querySelectorAll('.scroll-animate');
  if (elements.length === 0) return;

  // KIỂM TRA: BẮT BUỘC TÔN TRỌNG NGƯỜI DÙNG (Nhiệm vụ 4)
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Nếu họ đã tắt hiệu ứng trên hệ điều hành, ta hiện chữ luôn, không animate gì cả
    elements.forEach((el) => {
      el.classList.remove('opacity-0', 'translate-y-10');
      el.classList.add('opacity-100', 'translate-y-0');
    });
    return; // Thoát hàm luôn, không dùng IntersectionObserver nữa
  }

  // Nếu họ bình thường, cho chạy hiệu ứng mượt mà
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-10');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        // Nhớ gỡ theo dõi sau khi hiện (Yêu cầu Nhiệm vụ 4)
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  elements.forEach(el => observer.observe(el));
}
