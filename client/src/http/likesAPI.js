
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//travailler sur les produits ajouter a la liste de souhait
export const addProductToLikes = async (product) => {
    const {data} = await $authHost.post('api/likes', product);
    return data;
}

export const getProductFromLikes = async () => {
    const {data} = await $authHost.get('api/likes');
    return data;
}

export const deleteProductFromLikes = async (id) => {
    const {data} = await $authHost.delete(`api/likes/${id}`);
    return data;
}
