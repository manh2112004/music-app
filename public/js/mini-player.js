let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;
let playlist = [];
let currentSongSlug = "";

async function playSong(slug, songs = []) {
  const res = await fetch(`/songs/miniPlayer/${slug}`);
  const data = await res.json();

  const song = {
    title: data.title,
    singer: data.singerName,
    audio: data.audio,
    avatar: data.avatar,
    slug: slug,
  };

  playlist = songs.length ? songs : [song];
  currentSongIndex = playlist.findIndex((s) => s.slug === slug);
  currentSongSlug = slug;

  loadMiniPlayer(song);
  saveCurrentSong(false);
}

function loadMiniPlayer(song) {
  const miniPlayer = document.getElementById("miniPlayer");
  const avatar = document.getElementById("miniPlayerAvatar");
  const title = document.getElementById("miniPlayerTitle");
  const singer = document.getElementById("miniPlayerSinger");
  const audio = document.getElementById("miniPlayerAudio");
  const playBtn = document.getElementById("miniPlayerPlay");
  const progress = document.getElementById("miniPlayerProgress");
  const volume = document.getElementById("miniPlayerVolume");

  avatar.src =
    song.avatar ||
    "https://vivureviews.com/wp-content/uploads/2022/08/avatar-vo-danh-9.png";
  title.textContent = song.title;
  singer.textContent = song.singer;
  audio.src = song.audio;

  audio.play().catch(() => {});

  audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    saveCurrentSong(false);
  };

  progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
    saveCurrentSong(false);
  };

  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
    saveCurrentSong(false);
  };

  volume.oninput = () => {
    audio.volume = volume.value;
    saveCurrentSong(false);
  };

  document.getElementById("miniPlayerNext").onclick = () => nextSong();
  document.getElementById("miniPlayerPrev").onclick = () => prevSong();

  document.getElementById("miniPlayerShuffle").onclick = () => {
    isShuffle = !isShuffle;
    document.getElementById("miniPlayerShuffle").style.color = isShuffle
      ? "#1db954"
      : "#000";
    saveCurrentSong(false);
  };

  document.getElementById("miniPlayerRepeat").onclick = () => {
    isRepeat = !isRepeat;
    document.getElementById("miniPlayerRepeat").style.color = isRepeat
      ? "#1db954"
      : "#000";
    saveCurrentSong(false);
  };

  audio.onended = () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      nextSong();
    }
  };

  miniPlayer.classList.remove("hidden");

  document.getElementById("miniPlayerClose").onclick = () => {
    miniPlayer.classList.add("hidden");
    audio.pause();
    saveCurrentSong(true); // đóng miniplayer
  };
}

function nextSong() {
  if (!playlist.length) return;
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
  }
  currentSongSlug = playlist[currentSongIndex].slug;
  loadMiniPlayer(playlist[currentSongIndex]);
}

function prevSong() {
  if (!playlist.length) return;
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentSongIndex =
      (currentSongIndex - 1 + playlist.length) % playlist.length;
  }
  currentSongSlug = playlist[currentSongIndex].slug;
  loadMiniPlayer(playlist[currentSongIndex]);
}

function saveCurrentSong(isClosed) {
  const audio = document.getElementById("miniPlayerAudio");
  const songState = {
    slug: currentSongSlug,
    currentTime: audio.currentTime,
    volume: audio.volume,
    isShuffle: isShuffle,
    isRepeat: isRepeat,
    isClosed: isClosed,
  };
  localStorage.setItem("miniPlayerSong", JSON.stringify(songState));
}

window.addEventListener("DOMContentLoaded", async () => {
  const saved = JSON.parse(localStorage.getItem("miniPlayerSong") || "{}");
  const miniPlayer = document.getElementById("miniPlayer");

  if (saved && saved.slug && !saved.isClosed) {
    isShuffle = saved.isShuffle;
    isRepeat = saved.isRepeat;
    currentSongSlug = saved.slug;

    const res = await fetch(`/songs/miniPlayer/${saved.slug}`);
    const data = await res.json();
    const song = {
      title: data.title,
      singer: data.singerName,
      audio: data.audio,
      avatar: data.avatar,
      slug: saved.slug,
    };

    loadMiniPlayer(song);
    const audio = document.getElementById("miniPlayerAudio");
    audio.currentTime = saved.currentTime || 0;
    audio.volume = saved.volume || 0.5;
    audio.play().catch(() => {});
  } else {
    miniPlayer.classList.add("hidden");
  }
});
window.playSong = playSong;
