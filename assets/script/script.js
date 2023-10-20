import { listVideos } from './list-videos.js'
import { cardVideos } from './card-videos.js'
import { cardComments } from './card-comments.js'

const divCardVideos = document.getElementById('card-videos')
const divCardComments = document.getElementById('comments')
const iframeVideo = document.getElementById('iframe-videos')
const inputSearch = document.querySelector('.input-search')
const btnSendComment = document.getElementById('send-comment')

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

    btnSendComment.setAttribute('id-video', id)
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

inputSearch.addEventListener('keyup', e => {
    const value = e.target.value.toUpperCase()
    
    const allCardsVideos = Array.from(document.querySelectorAll('.div-content-video'))

    allCardsVideos.forEach(card => {
        card.classList.remove('d-none')
        if(!card.getAttribute('name').toUpperCase().includes(value)){
            card.classList.add('d-none')
        }
    })
   
})

btnSendComment.addEventListener('click', e => {
    const target = e.target

    const data = [
        {
            "id-video": target.getAttribute('id-video') ,
            "name": "You",
            "date": "Now",
            "comment": target.value,
            "profile": "avatar.png"
        }
    ]

    divCardComments.appendChild(releaseDOM(cardComments(data)))
})