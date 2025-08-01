HFS.onEvent('afterEntryName', ({ entry, h }) =>
    /mp3|wav|aac|ogg|flac|m4a/.test(entry.ext) &&
    HFS.h('button', {
        id: `play-song-${entry.n}`, // unique ID, optional for styling or debugging
        className: 'fas fa-play fa-sm',
        title: 'Play this song on the player at the left',
        onClick: () => play(entry.n)
    }))

HFS.onEvent('beforeHeader', () => `
<div class="music-player hidden" id="player">
    <div class="top-section">
      <div class="cover me-3" id="cover"><i class="fas fa-music"></i></div>
      <div>
        <div style="font-size: 1.2rem" class="fw-semibold" id="title">(Title)</div>
        <div class="text-muted small" id="artist">(Artist)</div>
      </div>
    </div>

    <div class="middle-section">
      <div class="left-column">
        <div class="album-title" id="album">(Album name)</div>
        <div class="queue" id="queue">
            <ol id="player-list">
                <li>Queue</li>
            </ol>
        </div>
      </div>
    </div>

    <div class="progress-time">
      <span id="currentTime">0:00</span>
      <span id="duration">0:00</span>
    </div>
    <div class="progress-bar-container">
      <div class="progress-fill" id="progressFill"></div>
    </div>

    <div class="d-flex align-items-center justify-content-between px-3 pt-2 pb-3">
      <div class="d-flex gap-2">
        <button class="btn btn-success btn-sm px-3" id="previousSong" title="Previous Song"><i class="fas fa-backward-step"></i></button>
        <button class="btn btn-success btn-sm px-3" id="playPause" title="Play/Pause"><i class="fas fa-play"></i></button>
        <button class="btn btn-success btn-sm px-3" id="nextSong" title="Next Song"><i class="fas fa-forward-step"></i></button>
      </div>

      <div class="d-flex align-items-center ms-auto gap-3">
        <button title="Autoplay On/Off" aria-checked="false" id="autoplayToggle">
            <i class="fas fa-stop"></i>
        </button>

        <div class="d-flex align-items-center volume-slider">
          <i class="fas fa-volume-up"></i>
          <input type="range" id="volumeSlider" min="0" max="100" value="25" />
        </div>
      </div>
    </div>
  </div>

  <div class="slide-toggle" title="Show/hide player" id="slideToggle"><i class="fas fa-chevron-right"></i></div>
  <audio id="audio" controls hidden></audio>
  <script>initPlayer()</script>
`)

let songUrls = [];
let currentSongIndex = -1;
let playingFromQueue = false;

function initPlayer() {
    const player = document.getElementById('player');
    const slideToggle = document.getElementById('slideToggle');
    const autoplayToggle = document.getElementById('autoplayToggle');
    const playPauseBtn = document.getElementById('playPause');
    const audio = document.getElementById('audio');
    const durationEl = document.getElementById('duration');
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');
    const progressBarContainer = document.querySelector('.progress-bar-container');

    slideToggle.addEventListener('click', () => {
        player.classList.toggle('hidden');
        const icon = slideToggle.querySelector('i');
        icon.className = player.classList.contains('hidden') ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
    });

    autoplayToggle.addEventListener('click', () => {
        const isChecked = autoplayToggle.getAttribute('aria-checked') === 'true';
        autoplayToggle.setAttribute('aria-checked', !isChecked);
        autoplayToggle.setAttribute('title', `Autoplay is ${isChecked ? 'off' : 'on'}`);
        autoplayToggle.setAttribute('aria-label', `Autoplay is ${isChecked ? 'off' : 'on'}`);
        const icon = autoplayToggle.querySelector('i');
        icon.className = isChecked ? 'fas fa-stop' : 'fas fa-forward';
        // console.log("Autoplay is", !isChecked ? "ON" : "OFF");
    });

    document.getElementById('volumeSlider').addEventListener('input', e => {
        audio.volume = e.target.value / 100;
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.querySelector('i').className = 'fas fa-pause';
        } else {
            audio.pause();
            playPauseBtn.querySelector('i').className = 'fas fa-play';
        }
    });

    document.getElementById('nextSong').addEventListener('click', () => {
        if (songUrls.length > 0 && currentSongIndex < songUrls.length - 1) {
            play(songUrls[currentSongIndex + 1], true);
        }
    });

    document.getElementById('previousSong').addEventListener('click', () => {
        if (songUrls.length > 0 && currentSongIndex > 0) {
            play(songUrls[currentSongIndex - 1], true);
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            currentTime.textContent = formatTime(audio.currentTime);
            durationEl.textContent = formatTime(audio.duration);
            const percent = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${percent}%`;
        }
    });

    progressBarContainer.addEventListener('click', (e) => {
        if (!audio.duration) return;
        const rect = progressBarContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percent = offsetX / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    audio.addEventListener('ended', () => {
        const autoplayToggle = document.getElementById('autoplayToggle');
        const autoplayEnabled = autoplayToggle.getAttribute('aria-checked') === 'true';

        if (autoplayEnabled && songUrls.length > 0 && currentSongIndex < songUrls.length - 1) {
            play(songUrls[currentSongIndex + 1], true);
        }
    });
}

function play(filename, fromQueue = false) {
    playingFromQueue = fromQueue;

    const player = document.getElementById('player');
    const slideToggle = document.getElementById('slideToggle');
    const titleEl = document.getElementById('title');
    const artistEl = document.getElementById('artist');
    const albumEl = document.getElementById('album');
    const coverEl = document.getElementById('cover');
    const playPauseBtn = document.getElementById('playPause');
    const queueList = document.getElementById('player-list');
    const audio = document.getElementById('audio');
    const icon = slideToggle.querySelector('i');
    const currentTime = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    player.classList.remove('hidden');
    icon.className = 'fas fa-chevron-left';

    titleEl.textContent = "Preparing...";
    artistEl.textContent = "Preparing...";
    albumEl.textContent = "Preparing...";
    currentTime.textContent = "0:00";
    durationEl.textContent = "0:00";
    coverEl.innerHTML = `<i class="fas fa-music"></i>`;
    queueList.innerHTML = '';

    songUrls = [];

    const anchors = document.querySelectorAll('a[id^=":r"]');
    anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href || !/\.(mp3|wav|aac|ogg|flac|m4a)$/i.test(href)) return;

        const fullUrl = new URL(href, window.location.origin).href;
        const displayName = decodeURIComponent(href).split('/').pop().replace(/\.[^/.]+$/, '');

        const li = document.createElement('li');
        li.textContent = displayName;
        li.addEventListener('click', () => play(fullUrl, true));
        queueList.appendChild(li);

        songUrls.push(fullUrl);
    });

    currentSongIndex = songUrls.findIndex(url => url === filename);
    let fullPath = filename;
    if (!playingFromQueue) {
        let fullUrlName = window.location + encodeURIComponent(filename);
        fullUrlName = fullUrlName.replace(/%2F/g, '/'); // This fixes playing the song from the search menu since slashes are encoded too, and the full URL cant be found

        currentSongIndex = songUrls.findIndex(url => url === fullUrlName);

        fullPath = `${window.location.origin}${window.location.pathname}${encodeURIComponent(filename)}`;
        fullPath = fullPath.replace(/%2F/g, '/'); // Also fixes the search menu song playing
    }

    if (currentSongIndex >= 0) {
        const currentItem = queueList.children[currentSongIndex];
        currentItem.classList.add('current-track');
    }
    
    audio.src = fullPath;

    const progressFill = document.getElementById('progressFill');
    progressFill.style.background = 'repeating-linear-gradient(-45deg, #e9ecef 0, #e9ecef 10px, #707070 10px, #707070 20px)';
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fullPath, true);
    xhr.responseType = 'blob';
    xhr.onprogress = e => {
        const percent = (e.loaded / e.total) * 100;
        progressFill.style.width = `${percent}%`;
    };
    xhr.onload = () => {
        if (xhr.status === 200) {
            const blob = xhr.response;
            window.jsmediatags.read(blob, {
                onSuccess: tag => {
                    const tags = tag.tags;
                    titleEl.textContent = tags.title || filename;
                    artistEl.textContent = tags.artist || '(Unknown artist)';
                    albumEl.textContent = tags.album || '(Unknown album)';

                    if (tags.picture) {
                        const { data, format } = tags.picture;
                        let binary = '';
                        for (let i = 0; i < data.length; i++) {
                            binary += String.fromCharCode(data[i]);
                        }
                        const base64String = btoa(binary);
                        coverEl.innerHTML = `<img src="data:${format};base64,${base64String}" alt="Cover" class="cover-img">`;
                    }

                    progressFill.style.background = 'var(--custom-progress-fill)';
                    
                    audio.play();
                    playPauseBtn.querySelector('i').className = 'fas fa-pause';
                },
                onError: error => {
                    console.error('Tag read error:', error);
                    progressFill.style.background = 'red';
                    titleEl.textContent = 'Tag Error';
                    artistEl.textContent = 'Tag Error';
                    albumEl.textContent = 'Tag Error';
                    coverEl.innerHTML = `<i class="fas fa-music"></i>`;
                    currentTime.textContent = '0:00';

                    audio.play();
                    playPauseBtn.querySelector('i').className = 'fas fa-pause';
                }
            });
        } else {
            console.error('Failed to fetch audio blob:', xhr.statusText);
            progressFill.style.background = 'red';
            titleEl.textContent = 'Error Fetching Audio';
            artistEl.textContent = 'Error';
            albumEl.textContent = 'Error';
            coverEl.innerHTML = `<i class="fas fa-music"></i>`;
            currentTime.textContent = '0:00';
            duration.textContent = '0:00';
        }
    };
    xhr.send();

    audio.volume = document.getElementById('volumeSlider').value / 100; // The html holds the default value which is 25
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
