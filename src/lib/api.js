// Voici trois fonctions qui te permettent de contacter le backend
// En gros la fonction makeCustomRequestToDB fait appel à makeRequestToDB pour composer la requête
// et utilise handleError pour gérer l'affichage des erreurs

import axios from "axios"

// Le type de makeRequestToDB peut être égal à 'sql' ou 'json'
// C'est à dire que tu peux faire des requêtes en envoyant une requête sous forme json ou une requête sql directe
// L'objet request de makeRequestToDB a cette forme quand type='json'
/*
interface JSONRequest {
	action: 'select' | 'insert' | 'update' | 'delete'
	table: string
	resolve?: boolean
	columns?: string[]
	functions?: unknown
	expressions?: unknown
	conditions?: unknown
	data?: unknown
	runner?: unknown
}
*/
// Et quand type='sql'
/*
interface SQLRequest {
	query: string
	data: unknown
}
*/
export async function makeCustomRequestToDB(request, type = 'json'){

    let task = await makeRequestToDB({
        url: `/global/custom-request/${type}`,
        method: 'post',
        data: request
    })
    return task
}



// L'objet payload de makeRequestToDB a cette forme
/*
interface Payload {
method?: Method
routeBase?: string
params?: object
data?: object
url?: string
id?: string
}
*/
export async function makeRequestToDB(payload){

    let success = false

    let response = null
    let error = null

    try {

        response = await axios.request({
            method: payload.method || 'get',
            baseURL: 'http://localhost/breeze-server/db-api/',
            headers: {
              'X-API-Key': 'b47e8c19-9e29-4287-acb1-4f34481402a0'
            },
            params: payload.params || {},
            data: payload.data || {},
            url: payload.url || '/'
        })

        success = response && response.data !== ''

    } catch (err) {

        error = err

        success = false

        handleError(err)

    }

    return {
        success: success,
        failure: !success,
        data: response ? response.data : null,
        error: error
    }
}

export function handleError(error) {

    if (process.env.NODE_ENV === 'development') {

        if (error.response) {

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            
        } else if (error.request) {

            console.log(error.request); 

        } else {

             console.log('Error', error.message);

        }

        console.log(error.config);

    }

}