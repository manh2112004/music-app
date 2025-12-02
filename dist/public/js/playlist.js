function openCreatePlaylistModal() {
  document.getElementById("createPlaylistModal").classList.add("active");
}

function closeCreatePlaylistModal() {
  document.getElementById("createPlaylistModal").classList.remove("active");
}
async function savePlaylist() {
  const name = document.getElementById("playlistName").value.trim();
  if (!name) {
    alert("Vui lòng nhập tên playlist!");
    return;
  }
  await fetch("/playlists/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: name }),
  });
  location.reload();
}
