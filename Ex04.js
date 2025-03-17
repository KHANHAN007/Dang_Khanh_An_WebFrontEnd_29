let tasks = [];
let choice;
do {
    choice = +prompt(`----- MENU QUẢN LÝ CÔNG VIỆC -----\n` +
        `1. Thêm công việc mới\n` +
        `2. Hiển thị tất cả công việc\n` +
        `3. Cập nhật trạng thái công việc\n` +
        `4. Lọc công việc theo trạng thái\n` +
        `5. Sắp xếp công việc theo trạng thái\n` +
        `6. Thoát\n` +
        `Nhập lựa chọn của bạn:`);

    switch (choice) {
        case 1:
            addTask();
            break;
        case 2:
            displayTasks();
            break;
        case 3:
            updateTaskStatus();
            break;
        case 4:
            filterTasksByStatus();
            break;
        case 5:
            sortTasksByStatus();
            break;
        case 6:
            alert("Thoát chương trình.");
            break;
        default:
            alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    }
} while (choice !== 6);
function generateId() {
    return Math.floor(100000 + Math.random() * 900000);
}
function addTask() {
    let name = prompt("Nhập tên công việc").trim();
    let description = prompt("Nhập mô tả công việc").trim();
    let startTime = prompt("Nhập thời gian bắt đầu (yyyy-mm-dd)").trim();
    let status = prompt("Nhập trạng thái (chưa hoàn thành / hoàn thành)").trim().toLowerCase();
    if (!["chưa hoàn thành", "hoàn thành"].includes(status)) {
        alert("Trạng thái không hợp lệ");
        return;
    }
    let id = generateId();
    tasks.push({ id, name, description, startTime, status });
    alert("Thêm công việc thành công");
}
function displayTasks() {
    if (tasks.length === 0) {
        alert("Danh sách công việc trống");
        return;
    }
    let result = "Danh sách công việc\n";
    tasks.forEach(task => {
        result += `\nId: ${task.id}\nTên: ${task.name}\nMô tả: ${task.description}\nThời gian bắt đầu: ${task.startTime}\nTrạng thái: ${task.status}\n`;
    });
    alert(result);
}
function updateTaskStatus() {
    let id = +prompt("Nhập ID công việc cần cập nhật");
    let task = tasks.find(task => task.id === id);
    if (!task) {
        alert("Không tìm tháy công viện có ID này");
        return;
    }
    let newStatus = prompt("Nhập trạng thái mới (chưa hoàn thành / hoàn thành)").trim().toLowerCase();
    if (!["chưa hoàn thành", "hoàn thành"].includes(newStatus)) {
        alert("Trạng thái không hợp lệ");
        return;
    }
    task.status = newStatus;
    alert("Cập nhật trạng thái công việc thành công");
}
function filterTasksByStatus() {
    let status = prompt("Nhập trạng thái cần lọc (chưa hoàn thành / hoàn thành)").trim().toLowerCase();
    if (!["chưa hoàn thành", "hoàn thành"].includes(status)) {
        alert("Trạng thái không hợp lệ");
        return;
    }
    let filteredTasks = tasks.filter(task => task.status === status);
    if (filteredTasks.length === 0) {
        alert("Không có công việc nào trong trạng thái này");
        return;
    }
    let result = `Cồng việc với trạng thái "${status}"\n`;
    filteredTasks.forEach(task => { result += `\nID: ${task.id}\nTên: ${task.name}\nMô tả: ${task.description}\nThời gian bắt đầu: ${task.startTime}\n` });
    alert(result);
}
function sortTasksByStatus() {
    tasks.sort((a, b) => {
        let statusOrder = { "chưa hoàn thành": 0, "hoàn thành": 1 };
        return statusOrder[a.status] - statusOrder[b.status];
    });
    alert("Sắp xếp công việc theo trạng thái thành công!");
    displayTasks();
}
