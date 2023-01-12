let index = 0;
let json_data = {
        "streams": [
            {
                "name": "Scrollable Carousel - BMW Mini correct",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            {
                "name": "Scrollable Carousel - BMW Mini",
                "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            },
            // {
            //     "name": "Scrollable Carousel - BMW Mini",
            //     "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            // },
            // {
            //     "name": "Scrollable Carousel - BMW Mini",
            //     "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            // },
            // {
            //     "name": "Scrollable Carousel - BMW Mini",
            //     "mediaFile": "https://cdn-media.brightline.tv/demo/ces2023/creatives/isso_mini/media/videos/01_hulu_brightline_south_december_video_windowed_bl720.mp4"
            // },
            {
                "name": "Scrollable Carousel - Vizzy",
                "mediaFile": "https://3860af3e8e3fbfdb.mediapackage.us-east-2.amazonaws.com/out/v1/791e60d1176b4746aabf4e580a1c0611/index.m3u8"
            },
            {
                "name": "Bunny",
                "mediaFile": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            }
        ]
    }
;

window.onload = async () => {
    // await fetch('https://cdn-media.brightline.tv/training/demo.json')
    //     .then((response) => response.json())
    //     .then((json) => {
    //         json_data = json;
    //     });
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
        video.src = element.mediaFile
        video.oncanplay = () => {
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

document.addEventListener('keydown', (e) => {
    const currentFocus = document.querySelector('.focus-button');
    if (currentFocus !== null) {
        const currentId = parseInt(currentFocus.id);
        const buttonList = document.querySelectorAll(".card");
        const videoContainer = document.getElementById('div-video-player');
        const video = document.getElementById('video-player');
        const preview = document.getElementById('preview-player');
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
                    preview.src = prevFocus.getAttribute('source');
                    preview.play();
                }
                break;
            case 40: //down
                if (currentId < buttonList.length - 1) {
                    const nextFocus = document.getElementById(`${currentId + 1}`)
                    currentFocus.classList.remove("focus-button");
                    nextFocus.classList.add("focus-button");
                    preview.src = nextFocus.getAttribute('source');
                    preview.play();
                }
                break;
            // case "37": //left
            // case "39": //right
        }
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