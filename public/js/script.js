// menu trên mobile
const menuToggle = document.querySelector(".menu-toggle");
const innerMenu = document.querySelector("header.header .inner-menu");
const boxSearch = document.querySelector("header.header .box-search");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    innerMenu.classList.toggle("active");
    boxSearch.classList.toggle("active");
  });
}
// end menu trên mobile
// APlayer
// const aplayer = document.querySelector("#aplayer");
// if (aplayer) {
//   let dataSong = aplayer.getAttribute("data-song");
//   dataSong = JSON.parse(dataSong);
//   let dataSinger = aplayer.getAttribute("data-singer");
//   dataSinger = JSON.parse(dataSinger);
//   const ap = new APlayer({
//     container: aplayer,
//     lrcType: 1,
//     audio: [
//       {
//         name: dataSong.title,
//         artist: dataSinger.fullName,
//         url: dataSong.audio,
//         cover: dataSong.avatar,
//         lrc: dataSong.lyrics,
//       },
//     ],
//     autoplay: true,
//   });
//   const avatar = document.querySelector(".singer-detail .inner-avatar img");
//   ap.on("play", function () {
//     avatar.style.animationPlayState = "running";
//   });
//   ap.on("pause", function () {
//     avatar.style.animationPlayState = "paused";
//   });
//   ap.on("ended", function () {
//     const link = `/songs/listen/${dataSong._id}`;
//     const option = {
//       method: "PATCH",
//     };
//     fetch(link, option)
//       .then((res) => res.json())
//       .then((data) => {
//         const elementListenSpan = document.querySelector(
//           ".singer-detail .inner-listen span"
//         );
//         elementListenSpan.innerHTML = `${data.listen} Lượt nghe`;
//       });
//   });
// }
// APlayer
// mini player
const songItems = document.querySelectorAll(".song-item");
songItems.forEach((item) => {
  item.addEventListener("click", async (e) => {
    const slug = item.getAttribute("data-slug");
    if (slug) {
      await playSong(slug);
    }
  });
});
// button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${idSong}`;
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
// end button like
// button favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const idSong = buttonFavorite.getAttribute("button-favorite");
      const isActive = buttonFavorite.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${idSong}`;
      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });
    });
  });
}
// end button favorite

// search Suggest
const boxSearchSuggest = document.querySelector(".box-search");
if (boxSearchSuggest) {
  const input = boxSearchSuggest.querySelector("input[name='keyword']");
  const boxSuggest = boxSearchSuggest.querySelector(".inner-suggest");
  input.addEventListener("keyup", () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 0) {
          boxSuggest.classList.add("show");
          const htmls = songs.map((song) => {
            return `
                <a class="inner-item" href="/songs/detail/${song.slug}">
                    <div class="inner-image"><img src="${song.avatar}"></div>
                    <div class="inner-info">
                        <div class="inner-title">${song.title}</div>
                        <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i>${song.infoSinger.fullName}</div>
                    </div>
                </a>
            `;
          });
          const boxList = boxSearchSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
// end search Suggest
