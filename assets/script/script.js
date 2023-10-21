import { listVideos, postComment } from './list-videos.js'
import { cardVideos } from './card-videos.js'
import { cardComments } from './card-comments.js'

const divCardVideos = document.getElementById('card-videos')
const divCardComments = document.getElementById('comments')
const iframeVideo = document.getElementById('iframe-videos')
const inputSearch = document.querySelector('.input-search')
const btnSendComment = document.getElementById('send-comment')
const textArea = document.getElementById('text-area-comment')

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

const like = target => {
    target.classList.replace('far', 'fas')

    const likes = target.nextSibling.nextSibling
    const quantity = parseInt(likes.textContent)

    const config = {
        true: {
            action: 'remove',
            content: quantity - 1,
            replace: {
                before: 'fas',
                after: 'far'
            }
        },
        false: {
            action: 'add',
            content: quantity + 1,
            replace: {
                before: 'far',
                after: 'fas'
            }
        }
    }

    const validation = target.classList.contains('liked')

    likes.textContent = config[validation].content
    target.classList[config[validation].action]('liked')
    target.classList.replace(config[validation].replace.before, config[validation].replace.after)

    
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

    if(target.classList.contains('like-comment')) like(target)
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

btnSendComment.addEventListener('click', async e => {
    const target = e.target

    const data = [
        {
            "id-video": target.getAttribute('id-video') ,
            "name": "You",
            "date": "Now",
            "comment": textArea.value,
            "profile": "avatar.png",
            "likes": 0
        }
    ]

    const post = await postComment(data[0])

    divCardComments.appendChild(releaseDOM(cardComments(data)))

    textArea.value = ''

    console.log(post);
})