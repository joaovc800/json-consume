import { listVideos } from './list-videos.js'
import { cardVideos } from './card-videos.js'
import { cardComments } from './card-comments.js'

const divCardVideos = document.getElementById('card-videos')
const divCardComments = document.getElementById('comments')
const iframeVideo = document.getElementById('iframe-videos')

const releaseDOM = string => {
    const parser = new DOMParser()
    return parser.parseFromString(string, 'text/html').body.firstChild
}

const alternateVideo = (target, comments) => {
    divCardComments.innerHTML = ''
    iframeVideo.src = target.getAttribute('url')
    const id = target.getAttribute('id')
    const commentsFiltered = comments.filter(c => c['id-video'] == id)
    divCardComments.appendChild(releaseDOM(cardComments(commentsFiltered)))
}

const r = await fetch('../../mock.json')
const j = await r.json()




//const { record } = await listVideos()
const cards = cardVideos(j)

const r2 = await fetch('../../mock-comments.json')
const j2 = await r2.json()

const comments = cardComments(j2)

divCardVideos.appendChild(releaseDOM(cards))
divCardComments.appendChild(releaseDOM(comments))

document.body.addEventListener('click', e => {
    const target = e.target

    if(target.classList.contains('div-content-video')) alternateVideo(target, j2)
})