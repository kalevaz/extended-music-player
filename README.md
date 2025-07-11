# 🎵 HFS Music Player Extension

This project enhances your [HFS](https://rejetto.com/hfs/) file server with an embedded **music player** interface. It automatically detects and lists audio files, allows playback directly in the browser, and reads metadata for a smooth listening experience.

## 🚀 Features

- 🎧 Auto-detect common audio formats: `.mp3`, `.wav`, `.aac`, `.ogg`, `.flac`, `.m4a`
- 🖼️ Dynamic display of song title, artist, album, and embedded cover art via [jsmediatags](https://github.com/aadsm/jsmediatags)
- 🎚️ Volume control and progress bar
- ⏯️ Play/pause, next/previous track controls
- 📜 Scrollable song queue from the current directory
- 🔁 Autoplay toggle with visual feedback
- 🧠 Intelligent metadata loading and graceful fallback

## 🖼️ UI Preview

The interface includes:
- A collapsible player panel
- Cover art and song info
- Album queue list
- Time and progress visualizers
- Playback controls and autoplay toggle

## 🛠️ Requirements

- [HFS 3.x](https://github.com/rejetto/hfs)
- JavaScript-enabled browser
- Local files or hosted audio content in supported formats


## 📁 Supported Audio Formats

| Format | Extensions |
|--------|------------|
| MP3    | `.mp3`     |
| WAV    | `.wav`     |
| AAC    | `.aac`     |
| OGG    | `.ogg`     |
| FLAC   | `.flac`    |
| M4A    | `.m4a`     |

## 🙌 Credits

Made with 💚 by [kalevaz](https://github.com/kalevaz)  
Inspired by [Not Simple Player](https://github.com/yurixahri/not-simple-player)
Powered by HFS + jsmediatags + sweet vanilla JavaScript

---
