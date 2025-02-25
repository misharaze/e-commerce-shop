import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//creer une réponse 
export const createAnswer= async (answer) => {
    const {data} = await $authHost.post('api/answer', answer)
    return data
}

// choisir une réponse 
export const fetchOneAnswer = async (id) => {
    const {data} = await $host.get('api/answer/' + id)
    return data
}

// mettre a jour réponse 
export const updateAnswerText = async (answer) => {
    const {data} = await $authHost({method:'PUT', url:`api/answer`, data: answer})
    return data
}

