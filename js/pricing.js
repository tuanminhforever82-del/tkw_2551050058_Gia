export function initPricingSwitch() {
  const switchBtn = document.getElementById('pricing-switch');
  const priceDisplays = document.querySelectorAll('.price-display');
  // Lấy thêm các phần tử hiển thị thời gian (/ tháng, / năm)
  const durationDisplays = document.querySelectorAll('.duration-display');

  if (!switchBtn || priceDisplays.length === 0) return;

  const dong = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  priceDisplays.forEach(el => {
    el.textContent = dong.format(Number(el.dataset.monthly));
  });

  switchBtn.addEventListener('click', () => {
    const isChecked = switchBtn.getAttribute('aria-checked') === 'true';
    const newState = !isChecked;
    switchBtn.setAttribute('aria-checked', String(newState));

    // Cập nhật giá tiền
    priceDisplays.forEach(el => {
      const targetPrice = newState ? el.dataset.yearly : el.dataset.monthly;
      el.textContent = dong.format(Number(targetPrice));
    });

    // Cập nhật chữ "/ tháng" thành "/ năm"
    durationDisplays.forEach((el, index) => {
      if (newState) {
        // Nếu là gói Team (index 1) thì giữ lại chữ "người"
        el.textContent = index === 1 ? '/ người / năm' : '/ năm';
      } else {
        el.textContent = index === 1 ? '/ người / tháng' : '/ tháng';
      }
    });
  });
}