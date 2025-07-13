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
- Colors are customisable via CSS variables in the plugin files

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
Powered by HFS + jsmediatags + JavaScript

---

## **Please report any issues or suggestions!** You are also free to modify the code to your liking and upload any changes you may see fit via pull requests.
  
**Please forgive any mistakes I may have made, I'm still new at web development and I would love to make the player even better, hence why I'm open to suggestions and pull requests.**

[Test it out by yourself on my maidcore archive](https://archive.maidcore.es)

[![Preview with player open](https://i.imgur.com/dpkPyfK.png)](https://archive.maidcore.es)
