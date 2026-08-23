export function initAccordion() {
  const root = document.getElementById("faq-accordion");
  if (!root) return;

  const triggers = root.querySelectorAll("[data-faq-trigger]");

  // Hàm setOpen dùng để cập nhật class CSS và aria-expanded
  function setOpen(trigger, open) {
    trigger.setAttribute("aria-expanded", String(open));
    
    // Tìm phần tử nội dung nằm ngay sau nút bấm
    const content = trigger.nextElementSibling;
    if (content) {
      content.classList.toggle("hidden", !open);
    }
    
    // Xoay icon mượt mà (Tùy chọn cho đẹp)
    const icon = trigger.querySelector("svg");
    if (icon) {
      icon.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
    }
  }

  // Event Delegation: Gắn 1 listener cho thằng cha (root) thay vì từng nút
  root.addEventListener("click", (e) => {
    // closest(...) dùng để tìm đúng cái nút, kể cả khi bấm vào icon SVG hay text bên trong
    const trigger = e.target.closest("[data-faq-trigger]");
    if (!trigger) return;

    // Kiểm tra xem nút bấm có đang đóng không
    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    
    // 1. Đóng hết tất cả các câu hỏi
    triggers.forEach(t => setOpen(t, false));
    
    // 2. Chỉ mở đúng cái vừa bấm (nếu nó đang ở trạng thái đóng)
    if (willOpen) {
      setOpen(trigger, true);
    }
  });
}