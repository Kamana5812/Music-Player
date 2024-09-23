// 1. Define Variables
let songIndex = 0;
const songs = [
  { title: "Song 1", file: "songs/song1.mp3" },
  { title: "Song 2", file: "songs/song2.mp3" },
  { title: "Song 3", file: "songs/song3.mp3" },
  { title: "Song 4", file: "songs/song4.mp3" },
  { title: "Song 5", file: "songs/song5.mp3" },
  { title: "Song 6", file: "songs/song6.mp3" },
  { title: "Song 7", file: "songs/song7.mp3" },
  { title: "Song 8", file: "songs/song8.mp3" },
  { title: "Song 9", file: "songs/song9.mp3" },
  { title: "Song 10", file: "songs/song10.mp3" }
];

let isPlaying = false;
let isShuffling = false;

const audio = new Audio();
const playPauseButton = document.getElementById('playPause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');
const volumeSlider = document.getElementById('volume');
const progressBar = document.getElementById('progressBar');
const songTitle = document.getElementById('songTitle');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');

// 2. Load the First Song
function loadSong(songIndex) {
  audio.src = songs[songIndex].file;
  songTitle.textContent = songs[songIndex].title;
  progressBar.value = 0;
  currentTimeDisplay.textContent = '0:00';

  // Wait for metadata to load to get song duration
  audio.addEventListener('loadedmetadata', () => {
    const duration = formatTime(audio.duration);
    totalTimeDisplay.textContent = duration;
  });
}

// 3. Format Time (Helper Function)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds};
}

// 4. Play and Pause Functionality
function playPauseSong() {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = 'Play';
  } else {
    audio.play();
    playPauseButton.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}

// 5. Next and Previous Song Functionality
function nextSong() {
  if (isShuffling) {
    songIndex = Math.floor(Math.random() * songs.length); // Shuffle
  } else {
    songIndex = (songIndex + 1) % songs.length; // Sequential
  }
  loadSong(songIndex);
  playPauseSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playPauseSong();
}

// 6. Shuffle Functionality
function toggleShuffle() {
  isShuffling = !isShuffling;
  shuffleButton.textContent = isShuffling ? 'Shuffle On' : 'Shuffle Off';
}

// 7. Update Progress Bar and Time
audio.addEventListener('timeupdate', function () {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;

  // Update current time display
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// 8. Volume Control
volumeSlider.addEventListener('input', function () {
  audio.volume = volumeSlider.value;
});

// 9. Initialize Player
loadSong(songIndex);

playPauseButton.addEventListener('click', playPauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
shuffleButton.addEventListener('click', toggleShuffle);