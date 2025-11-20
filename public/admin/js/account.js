const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const accountId = button.getAttribute("delete-account-id");
      const link = `/admin/accounts/delete/${accountId}`;
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa tài khoản này?");
      if (!confirmDelete) return;
      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Xóa tài khoản thành công!");
            window.location.reload();
          } else {
            alert("Xóa tài khoản thất bại!");
          }
        });
    });
  });
}
