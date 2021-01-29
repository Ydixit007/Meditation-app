const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".move circle");
    const sounds = document.querySelectorAll(".sound-pick button");
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");

    const outlineLength = outline.getTotalLength();
    let fakeDuration = "120";

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    sounds.forEach(sound => {
        sound.addEventListener("click", () => {

        })
    })

    timeSelect.forEach(Option => {
        Option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration  / 60)} : ${Math.floor(fakeDuration % 60)}`;
        });
    });

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            play.src = "./material/svg/pause.svg"
        } else {
            song.pause();
            play.src = "./material/svg/play.svg"
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./material/svg/play.svg";
        };

    };
}


app();