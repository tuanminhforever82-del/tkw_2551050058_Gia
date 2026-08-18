document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Tạo hiệu ứng bóng đổ cho Header khi cuộn xuống ---
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }

  // --- 2. Xử lý nút Mở/Đóng menu trên Mobile ---
  const menuBtn = document.querySelector('button[aria-controls="menu-chinh"]');
  const menu = document.getElementById('menu-chinh');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Mở menu';
      } else {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.textContent = 'Đóng';
      }
    });
  }

  // --- 3. Xử lý chế độ Dark Mode (Có lưu trạng thái) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  // Kiểm tra xem người dùng đã từng chọn Dark Mode trước đó chưa
  if (localStorage.getItem('theme') === 'dark') {
    htmlElement.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  // Xử lý khi bấm nút
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      // Bật/tắt class dark trên thẻ html
      htmlElement.classList.toggle('dark');
      
      // Đổi icon và lưu vào bộ nhớ trình duyệt
      if (htmlElement.classList.contains('dark')) {
        if (themeIcon) themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
      } else {
        if (themeIcon) themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
      }
    });
  }

});