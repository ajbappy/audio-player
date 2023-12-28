const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const coverImage = document.querySelector("#cover");

// song title
const songs = ["audio-1", "audio-2", "audio-3"];

// keep track song

let songIndex = 1;

// initially load song details

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `Music/${song}.mp3`;
  coverImage.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// next and prev song

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// update progressbar

function updateProgressbar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressBar = (currentTime / duration) * 100;
  progress.style.width = `${progressBar}%`;
}

function setProgressbar(e) {
  const width = this.clientWidth;
  const clientX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clientX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgressbar);
progressContainer.addEventListener("click", setProgressbar);
