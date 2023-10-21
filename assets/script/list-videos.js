import routes from './routes.js'
import { fetchHeaders } from './fetch.js'
import { loading } from './loading.js'

export async function listVideos(){
    loading(true)
    const request = await fetch(routes.videos, { headers: fetchHeaders })
    const response = await request.json()
    loading(false)
    return response
}

export async function listComments(){
    loading(true)
    const request = await fetch(routes.comments, { headers: fetchHeaders })
    const response = await request.json()
    loading(false)
    return response
}

export async function putComment(data){
    loading(true)
    const request = await fetch(routes.comments, { 
        method: 'PUT',
        headers: fetchHeaders,
        body: JSON.stringify(data)
    })

    const response = await request.json()
    loading(false)
    return response
}

export async function putVideo(data){
    loading(true)
    const request = await fetch(routes.videos, { 
        method: 'PUT',
        headers: fetchHeaders,
        body: JSON.stringify(data)
    })

    const response = await request.json()
    loading(false)
    return response
}