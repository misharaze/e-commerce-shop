import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//créer un slide
export const createSlider = async (slider) => {
    const {data} = await $authHost.post('api/slider', slider)
    return data
}

// supprimer un slide
export const deleteSlider = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/slider/'+id});
    return data;
}

// choisir un slide
export const fetchSlider = async () => {
    const {data} = await $host.get('api/slider')
    return data
}


// choisir un seul slide
export const fetchOneSlider = async (id) => {
    const {data} = await $host.get('api/slider/' + id)
    return data
}


// mettre a jour un slide
export const updateSlider = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/slider/${id}`, data: body});
    return data;
}

