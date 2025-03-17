let contacts = [];
let choice;
do {
  choice = +prompt(
    `-------Menu-------\n` +
    `1. Thêm liên hệ.\n` +
    `2. Hiển thị danh sách liên hệ.\n` +
    `3. Tìm kiếm theo số điện thoại.\n` +
    `4. Cập nhật liên hệ theo ID.\n` +
    `5. Xóa liên hệ theo ID.\n` +
    `6. Thoát\n` +
    `Nhập lựa chọn: `
  );
  switch (choice) {
    case 1:
      addContact();
      break;
    case 2:
      displayContacts();
      break;
    case 3:
      searchContact();
      break;
    case 4:
      updateContact();
      break;
    case 5:
      deleteContact();
      break;
    case 6:
      alert("Thoát chương trình.");
      break;
    default:
      alert("Lựa chọn không hợp lệ, vui lòng nhập lại.");
  }
} while (choice !== 6);
function generateId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}
function addContact() {
  let quantity = +prompt("Nhập số lượng liên hệ muốn thêm:");
  if (isNaN(quantity) || quantity <= 0) {
    alert(`Số lượng không hợp lệ!`);
    return;
  }

  for (let i = 0; i < quantity; ++i) {
    let name = prompt("Nhập tên liên hệ:");

    let email;
    do {
      email = prompt("Nhập email:");
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Email không hợp lệ. Vui lòng nhập lại!");
      }
    } while (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    let phone;
    do {
      phone = prompt("Nhập số điện thoại:");
      if (!/^\d{10,11}$/.test(phone)) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập lại!");
      }
    } while (!/^\d{10,11}$/.test(phone));
    let id = generateId();
    contacts.push({ id, name, email, phone });
    alert("Thêm liên hệ thành công!");
  }
}
function displayContacts() {
  if (contacts.length === 0) {
    alert("Danh sách liên hệ trống.");
    return;
  }
  console.table(contacts);
  alert(
    "Danh sách liên hệ:\n" +
    contacts.map(contact =>
      `${contact.id} - ${contact.name} - ${contact.email} - ${contact.phone}`
    ).join("\n")
  );
}
function searchContact() {
  let phoneSearch = prompt("Nhập số điện thoại cần tìm:");
  let found = contacts.filter(contact => contact.phone.includes(phoneSearch));

  if (found.length === 0) {
    alert("Không tìm thấy liên hệ nào.");
    return;
  }
  alert(
    "Kết quả tìm kiếm:\n" +
    found.map(contact =>
      `${contact.id} - ${contact.name} - ${contact.email} - ${contact.phone}`
    ).join("\n")
  );
}
function updateContact() {
  if (contacts.length === 0) {
    alert("Danh sách liên hệ trống.");
    return;
  }
  let id = +prompt("Nhập ID liên hệ cần cập nhật:");
  let contact = contacts.find(contact => contact.id === id);
  if (contact) {
    contact.name = prompt("Nhập tên mới:") || contact.name;
    contact.email = prompt("Nhập email mới:") || contact.email;
    contact.phone = prompt("Nhập số điện thoại mới:") || contact.phone;
    alert("Cập nhật thông tin thành công!");
  } else {
    alert("Không tìm thấy liên hệ với ID này.");
  }
}
function deleteContact() {
  if (contacts.length === 0) {
    alert("Danh sách liên hệ trống.");
    return;
  }
  let id = +prompt("Nhập ID liên hệ cần xóa:");
  let index = contacts.findIndex(contact => contact.id === id);
  if (index !== -1) {
    let confirmDelete = confirm(`Bạn có chắc muốn xóa liên hệ "${contacts[index].name}"?`);
    if (confirmDelete) {
      contacts.splice(index, 1);
      alert("Xóa liên hệ thành công.");
    }
  } else {
    alert("Không tìm thấy liên hệ có ID này.");
  }
}
