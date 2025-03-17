let products = [];
let choice;
do {
    choice = +prompt(`-----MENU------\n` +
        `1. Thêm sản phẩm vào danh sách.\n` +
        `2. Hiển thị tất cả sản phẩm.\n` +
        `3. Hiển thị chi tiết sản phẩm theo id.\n` +
        `4. Cập nhật thông tin sản phẩm theo id.\n` +
        `5. Xóa sản phẩm theo id.\n` +
        `6. Lọc sản phẩm theo khoảng giá.\n` +
        `7. Thoát`
    );
    switch (choice) {
        case 1:
            addProduct();
            break;
        case 2:
            displayProduct();
            break;
        case 3:
            showProductDetail();
            break;
        case 4:
            updateProduct();
            break;
        case 5:
            deleteProduct();
            break;
        case 6:
            filterByPrice();
            break;
        case 7:
            alert("Thoát chương trình.");
            break;
        default:
            alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    }
} while (choice !== 7);
function generateId() {
    return Math.floor(10000000 + Math.random() * 90000000);
}
function addProduct() {
    let quantity = +prompt("Nhập số lượng sản phẩm muốn thêm");
    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ");
        return;
    }
    for (let i = 0; i < quantity; ++i) {
        let name = prompt("Nhập tên sản phẩm");
        let price;
        do {
            price = +prompt("Nhập giá của sản phẩm");
            if (isNaN(price) || price <= 0) alert("Giá không hợp lệ. Nhập lại");
        } while (isNaN(price) || price <= 0);
        let category = prompt("Nhập danh mục của sản phẩm");
        let stock;
        do {
            stock = +prompt("Nhập số lượng sản phẩm");
            if (isNaN(stock) || stock < 0) alert("Số lượng không hợp lệ. Nhập lại");
        } while (isNaN(stock) || stock < 0);
        let id = generateId();
        products.push({ id, name, price, category, quantity: stock });
        alert("Thêm sản phẩm thành công!");
    }
}
function displayProduct() {
    if (products.length === 0) {
        alert("Danh sách sản phẩm trống");
        return;
    }
    alert("Danh sách sản phẩm:\n" +
        products.map(product =>
            `${product.id} - ${product.name} - ${product.price} VND - ${product.category} - ${product.quantity} cái`
        ).join("\n")
    );
}
function showProductDetail() {
    let id = +prompt("Nhập ID sản phẩm cần xem chi tiết");
    let product = products.find(product => product.id === id);
    if (!product) {
        alert("Không tìm thấy sản phẩm có ID này");
        return;
    }
    alert(
        `Chi tiết sản phẩm:\n` +
        `ID: ${product.id}\n` +
        `Tên: ${product.name}\n` +
        `Giá: ${product.price} VNĐ\n` +
        `Danh mục: ${product.category}\n` +
        `Số lượng: ${product.quantity}`
    );
}
function updateProduct() {
    let id = +prompt("Nhập ID sản phẩm cần cập nhật");
    let product = products.find(product => product.id === id);
    if (!product) {
        alert("Không tìm thấy sản phẩm có ID này");
        return;
    }
    product.name = prompt("Nhập tên mới") || product.name;
    let newPrice;
    do {
        newPrice = prompt("Nhập giá mới");
        if (newPrice !== "" && (isNaN(newPrice) || +newPrice <= 0)) alert("Giá không hợp lệ. Nhập lại!");
    } while (newPrice !== "" && (isNaN(newPrice) || +newPrice <= 0));
    product.price = newPrice !== "" ? +newPrice : product.price;
    product.category = prompt("Nhập danh mục mới") || product.category;
    let newQuantity;
    do {
        newQuantity = prompt("Nhập số lượng mới");
        if (newQuantity !== "" && (isNaN(newQuantity) || +newQuantity < 0)) alert("Số lượng không hợp lệ. Nhập lại!");
    } while (newQuantity !== "" && (isNaN(newQuantity) || +newQuantity < 0));
    product.quantity = newQuantity !== "" ? +newQuantity : product.quantity;
    alert("Cập nhật sản phẩm thành công!");
}
function deleteProduct() {
    let id = +prompt("Nhập ID sản phẩm cần xoá");
    let index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        let confirmDelete = confirm(`Bạn có chắc muốn xoá sản phẩm "${products[index].name}"?`);
        if (confirmDelete) {
            products.splice(index, 1);
            alert("Xoá sản phẩm thành công!");
        }
    } else {
        alert("Không tìm thấy sản phẩm có ID này");
    }
}
function filterByPrice() {
    let minPrice = +prompt("Nhập giá thấp nhất");
    let maxPrice = +prompt("Nhập giá cao nhất");
    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
        alert("Khoảng giá không hợp lệ");
        return;
    }
    let filterProduct = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    if (filterProduct.length === 0) {
        alert("Không có sản phẩm nào trong khoảng giá này");
        return;
    }
    alert("Kết quả:\n" +
        filterProduct.map(product =>
            `${product.id} - ${product.name} - ${product.price} VND - ${product.category} - ${product.quantity} cái`
        ).join("\n")
    );
}
