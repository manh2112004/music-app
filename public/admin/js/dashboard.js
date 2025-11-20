document.addEventListener("DOMContentLoaded", () => {
  console.log("test");
  const canvas = document.getElementById("chartSingers");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const singerLabels = singersData.map((s) => s.fullName);
  const listens = singersData.map((s) =>
    songsData
      .filter((song) => song.singerId === s._id)
      .reduce((sum, song) => sum + song.listen, 0)
  );
  const likes = singersData.map((s) =>
    songsData
      .filter((song) => song.singerId === s._id)
      .reduce((sum, song) => sum + song.like, 0)
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: singerLabels,
      datasets: [
        {
          label: "Lượt nghe",
          data: listens,
          backgroundColor: "rgba(54, 162, 235, 0.7)",
        },
        {
          label: "Lượt thích",
          data: likes,
          backgroundColor: "rgba(255, 206, 86, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Thống kê lượt nghe & lượt thích theo ca sĩ",
        },
      },
      scales: { y: { beginAtZero: true } },
    },
  });
});
