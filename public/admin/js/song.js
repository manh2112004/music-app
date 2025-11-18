const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const isConfirmed = confirm(
        "Bạn có chắc chắn muốn xóa bài hát này không?"
      );
      if (!isConfirmed) return;
      const link = `/admin/songs/delete/${id}`;
      const option = {
        method: "GET",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            alert(data.message);
            window.location.reload();
          } else {
            alert(data.message);
          }
        });
    });
  });
}
