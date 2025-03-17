let users = [];
let choice;
do {
    choice = +prompt(`----- MENU QUẢN LÝ NGƯỜI DÙNG -----\n` +
        `1. Đăng ký\n` +
        `2. Đăng nhập\n` +
        `3. Thoát\n` +
        `Nhập lựa chọn của bạn:`);

    switch (choice) {
        case 1:
            register();
            break;
        case 2:
            login();
            break;
        case 3:
            alert("Thoát chương trình.");
            break;
        default:
            alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
    }
} while (choice !== 3);
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.(com|vn)$/.test(email);
}
function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*\W).{6,}$/.test(password);
} function register() {
    let name = prompt("Nhập tên của bạn").trim();
    let email;
    do {
        email = prompt("Nhập email của bạn").trim();
        if (!isValidEmail(email)) alert("Email không hợp lệ. Email phải chứa '@' và kết thúc bằng .com hoặc .vn.");
    } while (!isValidEmail(email));
    if (users.some(user => user.email === email)) {
        alert("Email này đã được đăng ký trước đó!");
        return;
    }
    let password;
    do {
        password = prompt("Nhập mật khẩu (tối thiểu 6 ký tự, chứa ký tự đặc biệt và chữ hoa)").trim();
        if (!isValidPassword(password)) alert("Mật khẩu không hợp lệ! Phải có ít nhất 6 ký tự, chứa ký tự đặc biệt và chữ hoa.");
    } while (!isValidPassword(password));
    users.push({ name, email, password });
    alert("Đăng ký thành công!");
}
function login() {
    let email = prompt("Nhập email của bạn").trim();
    let password = prompt("Nhập mật khẩu của bạn").trim();
    let user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        alert("Đăng nhập thất bại! Email hoặc mật khẩu không đúng.");
        return;
    }
    alert(`Đăng nhập thành công!\nTên: ${user.name}\nEmail: ${user.email}`);
}
