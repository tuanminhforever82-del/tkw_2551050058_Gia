// --- 1. TỐI ƯU NAVBAR KHI CUỘN BẰNG IntersectionObserver ---
export function initHeaderOnScroll() {
  const header = document.getElementById('main-header');
  const sentinel = document.getElementById('nav-sentinel'); // Bắt phần tử canh gác
  
  if (!header || !sentinel) return; // Tự kiểm tra sự tồn tại

  const observer = new IntersectionObserver(([entry]) => {
    // entry.isIntersecting là true nếu thẻ sentinel nằm trong màn hình,
    // false nếu nó bị cuộn đi khuất (tức là trang đã cuộn xuống)
    const scrolled = !entry.isIntersecting;
    header.classList.toggle("shadow-md", scrolled); 
  });

  observer.observe(sentinel); // Bắt đầu theo dõi
}


// --- 2. XỬ LÝ MENU MOBILE KÈM CHUẨN TRỢ NĂNG (A11y) ---
export function initNav() {
  const toggle = document.querySelector('button[aria-controls="menu-chinh"]');
  const menu = document.getElementById('menu-chinh');
  const header = document.getElementById('main-header');

  if (!toggle || !menu) return;

  // Hàm trung tâm giúp đồng bộ 4 thứ mỗi khi đóng/mở (Nhiệm vụ 2)
  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    menu.classList.toggle("flex", open); // tailwind class để hiện menu
    
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    
    // Chặn/Mở cuộn trang phía sau menu trên điện thoại
    document.body.classList.toggle("overflow-hidden", open);
  }

  // Sự kiện click nút mở menu
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // BA CÁCH ĐÓNG MENU DÀNH CHO CÁC NHÓM NGƯỜI DÙNG KHÁC NHAU:
  
  // Cách 1: Đóng khi ấn phím ESC và trả tiêu điểm về nút toggle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus(); 
    }
  });

  // Cách 2: Đóng khi click ra ngoài vùng Header
  document.addEventListener('click', (e) => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen && header && !header.contains(e.target)) {
      setOpen(false);
    }
  });

  // Cách 3: Đóng khi xoay ngang điện thoại hoặc kéo màn hình to lên (desktop)
  window.addEventListener('resize', () => {
    // 1024px là breakpoint lg của Tailwind
    if (window.innerWidth >= 1024) { 
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) setOpen(false);
    }
  });
}

// Giải quyết "Bài khởi động"
export function initToTop() {
  const toTopBtn = document.getElementById('to-top-btn');
  if (!toTopBtn) return; // Thoát êm nếu trang không gắn nút này

  // Hiện nút khi cuộn quá 400px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.remove('hidden');
      toTopBtn.classList.add('flex');
    } else {
      toTopBtn.classList.add('hidden');
      toTopBtn.classList.remove('flex');
    }
  });

  // Sự kiện click để lên đầu trang
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}