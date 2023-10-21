import routes from './routes.js'
import { fetchHeaders } from './fetch.js'

export async function listVideos(){
    const request = await fetch(routes.videos, { headers: fetchHeaders })
    const response = await request.json()

    return response
}

export async function listComments(){
    const request = await fetch(routes.comments, { headers: fetchHeaders })
    const response = await request.json()

    return response
}

export async function putComment(data){
    const request = await fetch(routes.comments, { 
        method: 'PUT',
        headers: fetchHeaders,
        body: JSON.stringify(data)
    })

    const response = await request.json()

    return response
}

export async function putVideo(data){
    const request = await fetch(routes.videos, { 
        method: 'PUT',
        headers: fetchHeaders,
        body: JSON.stringify(data)
    })

    const response = await request.json()

    return response
}