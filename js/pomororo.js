export function initPomodoro() {
  const timeDisplay = document.getElementById('pomodoro-time');
  const startBtn = document.getElementById('pomodoro-start');
  const resetBtn = document.getElementById('pomodoro-reset');
  const modeDisplay = document.getElementById('pomodoro-mode');

  // Nếu trang web không có khối pomodoro thì thoát êm để không báo lỗi
  if (!timeDisplay) return;

  const WORK_TIME = 25 * 60; // 25 phút tính bằng giây
  const BREAK_TIME = 5 * 60;  // 5 phút tính bằng giây

  let timeLeft = WORK_TIME;
  let timerId = null;
  let isWorking = true; // Biến kiểm tra xem đang học hay đang nghỉ

  // Hàm cập nhật giao diện đồng hồ
  function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Thêm số 0 đằng trước nếu nhỏ hơn 10 (vd: 09:05)
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Hàm xử lý nút Bắt đầu / Tạm dừng
  function toggleTimer() {
    if (timerId === null) {
      // BẮT ĐẦU CHẠY
      startBtn.textContent = 'Tạm dừng';
      startBtn.classList.replace('btn-primary', 'btn-outline'); // Đổi màu nút cho đẹp

      timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        // KHI HẾT GIỜ
        if (timeLeft <= 0) {
          clearInterval(timerId);
          timerId = null;
          
          // Đảo trạng thái: Đang học -> Nghỉ, Đang nghỉ -> Học
          isWorking = !isWorking;
          timeLeft = isWorking ? WORK_TIME : BREAK_TIME;
          
          // Cập nhật giao diện
          modeDisplay.textContent = isWorking ? 'Phiên tập trung' : 'Nghỉ giải lao';
          timeDisplay.classList.toggle('text-green-500', !isWorking); // Đổi màu chữ sang xanh khi nghỉ
          startBtn.textContent = 'Bắt đầu';
          startBtn.classList.replace('btn-outline', 'btn-primary');
          
          updateDisplay();
          
          // Hiển thị thông báo (Sau này có thể thay bằng âm thanh Ting ting)
          alert(isWorking ? 'Hết giờ nghỉ! Quay lại tập trung nào.' : 'Tuyệt vời! Bạn đã hoàn thành 1 phiên. Nghỉ ngơi 5 phút nhé!');
        }
      }, 1000); // 1000ms = 1 giây
    } else {
      // TẠM DỪNG
      clearInterval(timerId);
      timerId = null;
      startBtn.textContent = 'Tiếp tục';
      startBtn.classList.replace('btn-outline', 'btn-primary');
    }
  }

  // Hàm xử lý nút Khôi phục (Reset)
  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorking = true;
    timeLeft = WORK_TIME;
    
    // Đưa giao diện về như cũ
    modeDisplay.textContent = 'Phiên tập trung';
    timeDisplay.classList.remove('text-green-500');
    startBtn.textContent = 'Bắt đầu';
    startBtn.classList.replace('btn-outline', 'btn-primary');
    
    updateDisplay();
  }

  // Lắng nghe sự kiện click
  startBtn.addEventListener('click', toggleTimer);
  resetBtn.addEventListener('click', resetTimer);
  
  // Hiển thị đúng số phút ngay khi vừa load trang
  updateDisplay();
}