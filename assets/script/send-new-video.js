import { getStore, createStore } from "./store.js";
import { putVideo } from "./list-videos.js";

const form = document.getElementById('form-new-video')
const url = document.getElementById('url-video')
const name = document.getElementById('name-video')
const iframe = document.getElementById('iframe-new-videos')

const isYouTubeEmbedLink = link => {
    const regex = /^(https?:\/\/)?(www\.)?youtube\.com/
    return regex.test(link);
}

const replaceForEmbed = link => {
    const embedRegex = /^https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/;
    if (embedRegex.test(link)) {
        return link;
    } else {
        console.log(link);
        const videoId = link.match(/[?&]v=([A-Za-z0-9_-]+)/);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId[1]}`;
        } else {
            return link;
        }
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const postNewVideo = { icon: 'fa-youtube' }

    url.classList.remove('border-danger', 'url-not-valid')

    if (!isYouTubeEmbedLink(url.value)) {
        url.classList.add('border-danger', 'url-not-valid')
        return
    }

    const urlEmbed = replaceForEmbed(url.value)

    const videos = getStore('videos')

    postNewVideo.url = urlEmbed
    postNewVideo.name = name.value
    postNewVideo.id = videos.length

    videos.push(postNewVideo)

    createStore('videos', videos)

    const response = await putVideo(getStore('videos'))

    if(response.record) window.location = './index.html'

})

url.addEventListener('blur', e => {
    if(isYouTubeEmbedLink(e.target.value)){
        const link = replaceForEmbed(e.target.value)
        iframe.src = link
    }
})