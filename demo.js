let products = [
    { id: 1, name: "mèn mén", price: 20000, quantity: 20, category: "món ăn dân tộc Mông" },
    { id: 2, name: "mứt", price: 80000, quantity: 21, category: "món ăn dân tộc Kinh" },
    { id: 3, name: "cơm lam", price: 40000, quantity: 15, category: "món ăn dân tộc Mông" },
    { id: 4, name: "bánh đậu xanh", price: 60000, quantity: 30, category: "món ăn dân tộc Kinh" }
];
let cart = [];
let choice;
do {
    choice = +prompt(`----- MENU QUẢN LÝ CỬA HÀNG -----\n` +
        `1. Hiển thị sản phẩm theo danh mục\n` +
        `2. Chọn sản phẩm để mua\n` +
        `3. Sắp xếp sản phẩm theo giá\n` +
        `4. Tính số tiền thanh toán\n` +
        `5. Thoát\n` +
        `Nhập lựa chọn của bạn:`);

    switch (choice) {
        case 1:
            displayByCategory();
            break;
        case 2:
            purchaseProduct();
            break;
        case 3:
            sortProducts();
            break;
        case 4:
            calculateTotal();
            break;
        case 5:
            alert("Thoát chương trình.");
            break;
        default:
            alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    }
} while (choice !== 5);
function displayByCategory() {
    let category = prompt("Nhập danh mục muốn xem:").trim();
    let filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());

    if (filteredProducts.length === 0) {
        alert("Không có sản phẩm trong danh mục này.");
        return;
    }
    let result = `Sản phẩm trong danh mục "${category}":\n`;
    filteredProducts.forEach(p => {
        result += `ID: ${p.id}, Tên: ${p.name}, Giá: ${p.price} VND, Số lượng: ${p.quantity}\n`;
    });
    alert(result);
}
function purchaseProduct() {
    let id = +prompt("Nhập ID sản phẩm muốn mua:");
    let product = products.find(p => p.id === id);

    if (!product) {
        alert("Sản phẩm không có trong cửa hàng.");
        return;
    }
    let quantity = +prompt(`Nhập số lượng muốn mua (có sẵn: ${product.quantity}):`);
    if (quantity > product.quantity || product.quantity === 0) {
        alert("Số lượng sản phẩm không đủ hoặc đã hết hàng.");
        return;
    }
    product.quantity -= quantity;
    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }

    alert(`Mua thành công ${quantity} ${product.name}!`);
}
function sortProducts() {
    let sortType = +prompt("Chọn kiểu sắp xếp:\n1. Tăng dần\n2. Giảm dần");
    if (sortType === 1) {
        products.sort((a, b) => a.price - b.price);
    } else if (sortType === 2) {
        products.sort((a, b) => b.price - a.price);
    } else {
        alert("Lựa chọn không hợp lệ.");
        return;
    }
    alert("Sắp xếp thành công!");
}
function calculateTotal() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống.");
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Tổng số tiền cần thanh toán: ${total} VND`);
}
