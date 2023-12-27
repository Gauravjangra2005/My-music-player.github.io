const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: '1.mp3',
        displayName: 'Tu hai kahan',
        cover: '1.jpeg',
        artist: 'Raffey - Usama - Ahad',
    },
    {
        path: '2.mp3',
        displayName: 'Distance Love',
        cover: '2.jpeg',
        artist: 'Yaari Ghuman',
    },
    {
        path: '3.mp3',
        displayName: 'Soch',
        cover: '3.jpeg',
        artist: 'Karan Aujla',
    },
    {
        path: '4.mp3',
        displayName: 'Pehle bhi mei',
        cover: '4.jpeg',
        artist: 'Vishal Mishra , Raj Shekhar',
    },
    {
        path: '5.mp3',
        displayName: 'Husn',
        cover: '5.jpeg',
        artist: 'Anuv Jain ',
    },
    {
        path: '6.mp3',
        displayName: 'Bewafa',
        cover: '6.jpeg',
        artist: 'Imran khan',
    },
    {
        path: '7.mp3',
        displayName: 'Downers AT Dusk',
        cover: '7.jpeg',
        artist: 'Talha Anjum , Umair    ',
    },
    {
        path: '8.mp3',
        displayName: 'Aaja We Mahiya',
        cover: '8.jpeg',
        artist: 'Imran Khan',
    },
    {
        path: '9.mp3',
        displayName: 'Happy Hour',
        cover: '9.jpeg',
        artist: 'Talha Anjum',
    },
    {
        path: '10.mp3',
        displayName: 'Faasle',
        cover: '10.jpeg',
        artist: 'Aditya Rikhari',
    },
    
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
