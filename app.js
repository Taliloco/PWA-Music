const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');

let songs = [];

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    for (const file of files) {
        const songURL = URL.createObjectURL(file);
        songs.push({ name: file.name, url: songURL });
    }
    savePlaylist();
    updatePlaylist();
});

function updatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.addEventListener('click', () => {
            audioPlayer.src = song.url;
            audioPlayer.play();
        });
        playlist.appendChild(li);
    });
}

function savePlaylist() {
    localStorage.setItem('playlist', JSON.stringify(songs));
}

function loadPlaylist() {
    const storedSongs = localStorage.getItem('playlist');
    if (storedSongs) {
        songs = JSON.parse(storedSongs);
        updatePlaylist();
    }
}

window.addEventListener('load', loadPlaylist);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
  .then(() => console.log("Service Worker registrado"));
}
