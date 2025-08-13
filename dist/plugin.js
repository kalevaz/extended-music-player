exports.repo = "kalevaz/extended-music-player"
exports.version = 1.41
exports.description = "Extended music player"
exports.apiRequired = 8.1
exports.frontend_js = [
    'https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js',
    'main.js',
]
exports.frontend_css = [
    'style.css',
    "user-custom.css", // Modify this to your liking
]

exports.config = {
    openOnButtonClick: { frontend: true, type: 'boolean', defaultValue: true, label: "Play music files by using the play button" },
    openOnFileClick: { frontend: true, type: 'boolean', defaultValue: false, label: "Play music files by clicking on music files" },
}
