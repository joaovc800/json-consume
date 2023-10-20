import routes from './routes.js'
import { fetchHeaders } from './fetch.js'

export async function listVideos(){
    const request = await fetch(routes.videos, { headers: fetchHeaders })
    const response = await request.json()

    return response
}