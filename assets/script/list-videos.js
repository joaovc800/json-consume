import routes from './routes.js'
import { fetchHeaders } from './fetch.js'

export async function listVideos(){
    const request = await fetch(routes.videos, { headers: fetchHeaders })
    const response = await request.json()

    return response
}

export async function postComment(data){
    const request = await fetch(routes.comments, { 
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(data)
    })

    const response = await request.json()

    return response
}