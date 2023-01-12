let index = 0;
let json_data;

window.onload = async () => {
    await fetch('https://cdn-media.brightline.tv/training/demo.json')
        .then((response) => response.json())
        .then((json) => {
            json_data = json;
        });
    startWebApp()
};

const startWebApp = () => {
    let videoElement = document.getElementById('video-player');
    videoElement.addEventListener('ended', endedVideo, false);

    let parent_button_div = document.getElementById("video-cards");
    for (let stream of json_data.streams) {
        constructCardVideo(parent_button_div, stream);
    }
}

const constructCardVideo = (parent_button_div, element) => {
    if (element.name && element.mediaFile) {
        let video = document.createElement('video');
        video.src = element.mediaFile
        video.oncanplay = () => {
            let button = document.createElement("button");
            button.className = index === 0 ? "card focus-button" : "card";
            button.textContent = element.name;
            button.id = index.toString();
            index++;
            button.setAttribute('source', element.mediaFile);
            parent_button_div.appendChild(button);
        }
    }
};

document.addEventListener('keydown', (e) => {
    const currentFocus = document.querySelector('.focus-button');
    const currentId = parseInt(currentFocus.id);
    const buttonList = document.querySelectorAll(".card");
    const videoContainer = document.getElementById('div-video-player');
    const video = document.getElementById('video-player');
    switch (e.keyCode) {
        case 8:
            videoContainer.classList.add("hide-element");
            video.muted = true;
            video.pause();
            exitFullscreen();
            break;
        case 13: //enter
            video.src = currentFocus.getAttribute('source');
            video.muted = true;
            videoContainer.classList.remove("hide-element");
            enterFullScreen(video);
            video.play();
            break;
        case 38: //up
            if (currentId > 0) {
                const prevFocus = document.getElementById(`${currentId - 1}`)
                currentFocus.classList.remove("focus-button");
                prevFocus.classList.add("focus-button");
            }
            break;
        case 40: //down
            if (currentId < buttonList.length - 1) {
                const nextFocus = document.getElementById(`${currentId + 1}`)
                currentFocus.classList.remove("focus-button");
                nextFocus.classList.add("focus-button");
            }
            break;
        // case "37": //left
        // case "39": //right
    }
});

const endedVideo = () => {
    const videoContainer = document.getElementById('div-video-player');
    const video = document.getElementById('video-player');
    video.pause();
    exitFullscreen();
    videoContainer.classList.add("hide-element");
}

const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

const enterFullScreen = (video) => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
    }
}