export function initSlider() {
  const root = document.getElementById('testimonial-slider');
  if (!root) return;

  const track = root.querySelector('.slider-track');
  const slides = root.querySelectorAll('.slider-slide');
  const btnPrev = root.querySelector('.slider-prev');
  const btnNext = root.querySelector('.slider-next');
  const dotsContainer = root.querySelector('.slider-dots');
  
  let currentIndex = 0;
  let autoplayTimer = null;

  // 1. Sinh chấm tròn bằng JS từ số slide thật (Yêu cầu 3)
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-accent-500' : 'bg-line dark:bg-line-invert'}`;
    dot.setAttribute('aria-label', `Đi tới slide ${i + 1}`);
    dot.addEventListener('click', () => {
      go(i); // Bấm vào chấm nào, nhảy tới slide đó
    });
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('button');

  // Hàm cốt lõi chuyển slide
  function go(next) {
    // 2. Logic vòng tròn (Modulo) một dòng lo cả hai đầu (Yêu cầu 1)
    currentIndex = (next + slides.length) % slides.length;
    
    // Dịch chuyển dải băng
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // 3. Thêm thuộc tính 'inert' cho các slide đang ẩn (Yêu cầu 2)
    slides.forEach((s, i) => s.toggleAttribute("inert", i !== currentIndex));
    
    // Cập nhật màu cho chấm tròn
    dots.forEach((d, i) => {
      d.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-accent-500' : 'bg-line dark:bg-line-invert hover:bg-muted'}`;
    });
  }

  // Khởi tạo ban đầu (Ẩn các slide khác ngoài slide 0)
  go(0);

  // Gắn sự kiện cho nút Next/Prev
  if(btnNext) btnNext.addEventListener('click', () => go(currentIndex + 1));
  if(btnPrev) btnPrev.addEventListener('click', () => go(currentIndex - 1));

  // --- LOGIC TỰ ĐỘNG CHẠY VÀ DỪNG THÔNG MINH ---
  function start() {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(() => go(currentIndex + 1), 3000); // Tự chuyển sau 3 giây
    }
  }

  function stop() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Bắt đầu tự chạy
  start();

  // Dừng khi người dùng đang xem (Chuột, Bàn phím, Chuyển tab)
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop); // Ai đó đang dùng bàn phím (Tab)
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
}