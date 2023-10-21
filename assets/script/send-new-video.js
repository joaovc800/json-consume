import { getStore, createStore } from "./store.js";
import { putVideo } from "./list-videos.js";

const form = document.getElementById('form-new-video')

const isYouTubeEmbedLink = link => {
    const regex = /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]+/
    return regex.test(link);
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const postNewVideo = { icon: 'fa-youtube' }

    const url = document.getElementById('url-video')
    const name = document.getElementById('name-video')

    url.classList.remove('border-danger', 'url-not-valid')

    if(!isYouTubeEmbedLink(url.value)){
        url.classList.add('border-danger', 'url-not-valid')
        return
    }

    const videos = getStore('videos')

    postNewVideo.url = url.value
    postNewVideo.name = name.value
    postNewVideo.id = videos.length

    videos.push(postNewVideo)

    createStore('videos', videos)

    const response = await putVideo(getStore('videos'))

    console.log(response);

})