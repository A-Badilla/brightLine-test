let index = 0;
let scrollVal = 0;
let json_data;

window.onload = async () => {
    await fetch('https://cdn-media.brightline.tv/training/demo.json')
        .then((response) => response.json())
        .then((json) => {
            json_data = json;
        });
    json_data !== undefined ? startWebApp() : alert("Couldn't fetch from server")
};

const startWebApp = () => {
    let videoElement = document.getElementById('video-player');
    videoElement.addEventListener('ended', endedVideo, false);


    let parentButtonDiv = document.getElementById("video-cards");
    for (let stream of json_data.streams) {
        constructCardVideo(parentButtonDiv, stream);
    }
}

const constructCardVideo = (parentButtonDiv, element) => {
    if ("name" in element && "mediaFile" in element) {
        let video = document.createElement('video');
        video.src = element.mediaFile;
        video.oncanplay = () => {
            if (index === 0) {
                let preview = document.getElementById('preview-player');
                preview.src = element.mediaFile;
            }
            let button = document.createElement("button");
            button.className = index === 0 ? "card focus-button" : "card";
            button.textContent = element.name;
            button.id = index.toString();
            index++;
            button.setAttribute('source', element.mediaFile);
            parentButtonDiv.appendChild(button);
        }
    }
};


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
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

const enterFullScreen = (video) => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

document.addEventListener('keydown', (e) => {
    const currentFocus = document.querySelector('.focus-button');
    if (currentFocus !== null) {
        const focusDiv = document.getElementById('video-cards');
        const currentId = parseInt(currentFocus.id);
        const buttonList = document.querySelectorAll(".card");
        const videoContainer = document.getElementById('div-video-player');
        const video = document.getElementById('video-player');
        const preview = document.getElementById('preview-player');
        const buttonHeight = document.querySelector('.card').clientHeight;
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
                preview.pause();
                break;
            case 38: //up
                if (currentId > 0) {
                    const prevFocus = document.getElementById(`${currentId - 1}`)
                    currentFocus.classList.remove("focus-button");
                    prevFocus.classList.add("focus-button");
                    preview.src = prevFocus.getAttribute('source');
                    preview.muted = true;
                    scrollVal -= buttonHeight + 7;
                    focusDiv.scroll(0, scrollVal)
                }
                break;
            case 40: //down
                if (currentId < buttonList.length - 1) {
                    const nextFocus = document.getElementById(`${currentId + 1}`)
                    currentFocus.classList.remove("focus-button");
                    nextFocus.classList.add("focus-button");
                    preview.src = nextFocus.getAttribute('source');
                    preview.muted = true;
                    scrollVal += buttonHeight + 7;
                    focusDiv.scroll(0, scrollVal)
                }
                break;
            case 80:
                preview.muted = true;
                preview.play();
                break;
        }
    }
});
