// 1. STATE & BẢNG TRA
const state = {
  records: [],
  query: "",
  category: "all",
  status: "all",
  sort: "date-desc",
  loading: true,
  error: null
};

const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
};

function visibleRecords() {
  const q = state.query.trim().toLowerCase();
  return state.records
    .filter(r => state.category === "all" || r.category === state.category)
    .filter(r => state.status === "all" || r.status === state.status)
    .filter(r => !q || r.trader.toLowerCase().includes(q))
    .sort(sorters[state.sort]);
}

// 2. DEBOUNCE (Hạn chế số lần gọi hàm khi gõ phím)
function debounce(fn, delay = 300) {
  let id;
  return (...args) => { 
    clearTimeout(id); 
    id = setTimeout(() => fn(...args), delay); 
  };
}

// 2.5 HÀM TẠO THÔNG BÁO LỖI (Nhiệm vụ 3)
function messageFor(field) {
  const v = field.validity;
  if (v.valueMissing) return "Vui lòng điền mục này, không được để trống.";
  if (v.typeMismatch) {
    if (field.type === "email") return "Email chưa đúng dạng, ví dụ: sinhvien@ou.edu.vn";
    if (field.type === "url") return "URL chưa đúng định dạng.";
  }
  if (v.tooShort) return `Vui lòng nhập ít nhất ${field.minLength} ký tự.`;
  if (v.rangeUnderflow) return `Vui lòng nhập số lớn hơn hoặc bằng ${field.min}.`;
  if (v.patternMismatch) return "Dữ liệu chưa đúng định dạng yêu cầu.";
  return "Dữ liệu không hợp lệ.";
}

// 3. RENDER AN TOÀN BẰNG TEMPLATE & REPLACECHILDREN
function render() {
  const container = document.getElementById("app-container");
  if (!container) return;

  if (state.loading) {
    container.innerHTML = `<div class="p-8 text-center text-muted font-medium animate-pulse">Đang nạp dữ liệu tiến độ...</div>`;
    return;
  }

  if (state.error) {
    container.innerHTML = `<div class="p-8 text-center text-red-600 bg-red-50 rounded-card font-bold">${state.error}</div>`;
    return;
  }

  const recordsToDisplay = visibleRecords();

  if (recordsToDisplay.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-muted bg-surface rounded-card border border-line">Không tìm thấy kết quả nào phù hợp.</div>`;
    return;
  }

  // Dùng Template cloneNode để chống XSS
  const template = document.getElementById("record-template");
  
  // Hàm buildRow tạo ra 1 dòng HTML (DOM Element) từ dữ liệu
  const buildRow = (record) => {
    const row = template.content.firstElementChild.cloneNode(true);
    
    // Gán dữ liệu bằng textContent (An toàn tuyệt đối)
    row.querySelector("[data-cell='trader']").textContent = record.trader;
    row.querySelector("[data-cell='date']").textContent = record.date;
    row.querySelector("[data-cell='category']").textContent = record.category;
    row.querySelector("[data-cell='amount']").textContent = record.amount;
    
    // Xử lý riêng cho trạng thái (màu sắc badge)
    const statusNode = row.querySelector("[data-cell='status']");
    if (record.status === "da-hoan-thanh") { 
      statusNode.textContent = "Đã xong";
      statusNode.className = "badge shrink-0 text-center bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    } else if (record.status === "dang-hoc") { 
      statusNode.textContent = "Đang học";
      statusNode.className = "badge shrink-0 text-center bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    } else {
      statusNode.textContent = "Chưa học";
      statusNode.className = "badge shrink-0 text-center bg-line text-ink dark:bg-line-invert dark:text-ink-invert";
    }
    
    return row;
  };

  // Thay thế toàn bộ nội dung container bằng danh sách DOM Nodes mới trong 1 lần chạm
  const domNodes = recordsToDisplay.map(buildRow);
  container.replaceChildren(...domNodes);
}

// 4. LƯU TRỮ VỚI LOCALSTORAGE
async function fetchDefaultRecords() {
  const res = await fetch("./data/records.json");
  // fetch không tự ném lỗi 404, phải chủ động kiểm tra
  if (!res.ok) throw new Error(`Máy chủ trả về mã lỗi: ${res.status}`);
  const data = await res.json();
  
  // Cập nhật lại localStorage
  localStorage.setItem("studyflow_records", JSON.stringify(data));
  return data;
}

async function loadRecords() {
  // Đọc từ localStorage trước
  const cachedData = localStorage.getItem("studyflow_records");
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  
  // Nếu chưa có (lần đầu vào web), thì tải từ JSON
  return await fetchDefaultRecords();
}

// 5. KHỞI CHẠY APP & GẮN SỰ KIỆN
async function initApp() {
  // Ô tìm kiếm dùng debounce (đợi 300ms sau khi ngừng gõ mới lọc)
  const handleSearch = debounce((e) => {
    state.query = e.target.value;
    render();
  }, 300);
  document.getElementById("search-input").addEventListener("input", handleSearch);
  // --- NHIỆM VỤ 3: XỬ LÝ KIỂM TRA FORM ---
  const form = document.getElementById("add-record-form");
  const summaryError = document.getElementById("form-summary-error");

  // 1. Tắt bóng bóng mặc định của trình duyệt
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Chặn hành động load lại trang
    
    let firstInvalidField = null;
    let isValid = true;

    // 2. Lặp qua tất cả các ô nhập liệu trong form
    Array.from(form.elements).forEach(field => {
      // Bỏ qua các thẻ không cần validate như BUTTON
      if (field.tagName === "BUTTON") return;

      const errorBox = document.getElementById(`${field.id}-error`);
      
      // Kiểm tra tính hợp lệ của ô hiện tại
      if (!field.checkValidity()) {
        isValid = false;
        // Bật cờ lỗi để CSS bắt viền đỏ
        field.setAttribute("aria-invalid", "true");
        
        // Hiển thị text báo lỗi
        if (errorBox) {
          errorBox.textContent = messageFor(field);
          errorBox.classList.remove("hidden");
        }
        
        // Ghi nhận ô sai đầu tiên
        if (!firstInvalidField) firstInvalidField = field;
      } else {
        // Xóa cờ lỗi nếu dữ liệu đã đúng
        field.removeAttribute("aria-invalid");
        if (errorBox) {
          errorBox.textContent = "";
          errorBox.classList.add("hidden");
        }
      }
    });

    if (!isValid) {
      // 3. THẤT BẠI: Đưa tiêu điểm về ô sai đầu tiên & Hiện tóm tắt
      firstInvalidField.focus();
      summaryError.classList.remove("hidden");
    } else {
      // 4. THÀNH CÔNG: Thêm dữ liệu vào State và LocalStorage
      summaryError.classList.add("hidden");
      
      // Tạo bản ghi mới từ dữ liệu form
      const newRecord = {
        id: `SF-${Date.now()}`, // Tạo ID ngẫu nhiên
        trader: document.getElementById("trader-input").value.trim(),
        category: document.getElementById("category-input").value,
        amount: Number(document.getElementById("amount-input").value),
        date: document.getElementById("date-input").value,
        status: "chua-hoc" // Mặc định khi mới thêm
      };

      // Đẩy vào mảng state hiện tại (đưa lên đầu danh sách)
      state.records.unshift(newRecord);
      
      // Lưu xuống localStorage (áp dụng của Nhiệm vụ 2)
      localStorage.setItem("studyflow_records", JSON.stringify(state.records));
      
      // Vẽ lại giao diện & Xóa trắng form
      render();
      form.reset();
      alert("Đã thêm tiến độ thành công!");
    }
  });
  // --- KẾT THÚC NHIỆM VỤ 3 ---
  document.getElementById("filter-category").addEventListener("change", (e) => { state.category = e.target.value; render(); });
  document.getElementById("filter-status").addEventListener("change", (e) => { state.status = e.target.value; render(); });
  document.getElementById("sort-select").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

  // Sự kiện Nút Khôi phục dữ liệu mẫu
  document.getElementById("btn-restore").addEventListener("click", async () => {
    state.loading = true;
    render();
    try {
      state.records = await fetchDefaultRecords();
      // Reset các bộ lọc về mặc định
      state.query = "";
      state.category = "all";
      state.status = "all";
      document.getElementById("search-input").value = "";
      document.getElementById("filter-category").value = "all";
      document.getElementById("filter-status").value = "all";
    } catch (err) {
      state.error = err.message;
    } finally {
      state.loading = false;
      render();
    }
  });

  // Tải dữ liệu lần đầu
  render();
  try {
    state.records = await loadRecords();
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

document.addEventListener("DOMContentLoaded", initApp);