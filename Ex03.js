let menu = {};
let choice;

do {
    choice = +prompt(`----- MENU QUẢN LÝ NHÀ HÀNG -----\n` +
        `1. Thêm món ăn vào danh mục\n` +
        `2. Xóa món ăn theo tên khỏi danh mục\n` +
        `3. Cập nhật thông tin món ăn\n` +
        `4. Hiển thị toàn bộ menu\n` +
        `5. Tìm kiếm món ăn theo tên\n` +
        `6. Thoát\n` +
        `Nhập lựa chọn của bạn:`
    );
    switch (choice) {
        case 1:
            addDish();
            break;
        case 2:
            deleteDish();
            break;
        case 3:
            updateDish();
            break;
        case 4:
            displayMenu();
            break;
        case 5:
            searchDish();
            break;
        case 6:
            alert("Thoát chương trình.");
            break;
        default:
            alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    }
} while (choice !== 6);
function addDish() {
    let category = prompt("Nhập danh mục món ăn").trim();
    if (!category) {
        alert("Danh mục không hợp lệ");
        return;
    }
    let name = prompt("Nhập tên món ăn").trim();
    let price;
    do {
        price = +prompt("Nhập giá của món ăn");
        if (isNaN(price) || price <= 0) alert("Giá không hợp lệ. Nhập lại!");
    } while (isNaN(price) || price <= 0);
    let description = prompt("Nhập mô tả món ăn").trim();
    if (!menu[category])
        menu[category] = [];
    menu[category].push({ name, price, description });
    alert(`Thêm món ăn "${name}" vào danh mục "${category}" thành công!`);
}
function displayMenu() {
    if (Object.keys(menu).length === 0) {
        alert("Menu đang trống!");
        return;
    }
    let result = "===== MENU NHÀ HÀNG =====\n";
    for (let category in menu) {
        result += `\n*** ${category} ***\n`;
        menu[category].forEach(dish => {
            result += `${dish.name} - ${dish.price} VND\n${dish.description}\n`;
        });
    }
    alert(result);
}
function deleteDish() {
    let category = prompt("Nhập danh mục món ăn cần xáo").trim();
    if (!menu[category]) {
        alert("Danh mục không tồn tại");
        return;
    }
    let name = prompt("Nhập tên món ăn cần xoá").trim();
    let index = menu[category].findIndex(dish => dish.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        alert("Không tìm thấy món ăn trong danh mục");
        return;
    }
    menu[category].splice(index, 1);
    alert(`Xoá món ăn "${name}" thành công`);
}
function updateDish() {
    let category = prompt("Nhập danh mục món ăn cần cập nhật").trim();
    if (!menu[category]) {
        alert("Danh mục không tồn tại");
        return;
    }
    let name = prompt("Nhập tên món ăn cần cập nhật").trim();
    let dish = menu[category].find(dish => dish.name.toLowerCase() === name.toLowerCase());
    if (!dish) {
        alert("Không tìm thấy món ăn");
        return;
    }
    dish.name = prompt("Nhập tên mới").trim() !== "" || dish.name;
    let newPrice;
    do {
        newPrice = prompt("Nhập giá mới");
        if (newPrice !== "" && (isNaN(newPrice) || +newPrice <= 0)) {
            alert("Giá không hợp lệ. Nhập lại!");
        }
    } while (newPrice !== "" && (isNaN(newPrice) || +newPrice <= 0));
    dish.price = newPrice !== "" ? +newPrice : dish.price;
    dish.description = prompt("Nhập mô tả mới") || dish.description;
    alert("Cập nhật món ăn thành công");
}
function searchDish() {
    let searchName = prompt("Nhập tên món ăn cần tìm").trim().toLowerCase();
    let foundDishes = [];
    for (let category in menu) {
        menu[category].forEach(dish => {
            if (dish.name.toLowerCase().includes(searchName)) {
                foundDishes.push({ category, ...dish });
            }
        });
    }
    if (foundDishes.length === 0) {
        alert("Không tìm thấy món ăn!");
        return;
    }
    let result = "Kết quả tìm kiếm\n";
    foundDishes.forEach(dish => {
        result += `\n*** ${dish.category} ***\n${dish.name} - ${dish.price} VND\n${dish.description}\n`
    });
    alert(result);
}