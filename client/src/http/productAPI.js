import {$authHost, $host} from "./index";
//import jwt_decode from "jwt-decode";

//Сréer catégorie
export const createType = async (type) => {
    const {data} = await $authHost.post('api/productType', type)
    return data
}

// supprimer catégorie
export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/productType/'+id});
    return data;
}

// choisir catégorie
export const fetchTypes = async () => {
    const {data} = await $host.get('api/productType')
    return data
}

// créer une marque
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/productBrand', brand)
    return data
}

// choisir une  marque
export const fetchBrands = async () => {
    const {data} = await $host.get('api/productBrand', )
    return data
}

// surprimer une  marque
export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/productBrand/'+id});
    return data;
}

// mettre à jour marque
export const updateBrand= async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/productBrand/${id}`, data: body});
    return data;
}

// mettre a jour catégorie
export const updateType= async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/productType/${id}`, data: body});
    return data;
}


// Сréer un produit
export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

// creer un produit exel  en grande quantité 
export const createMoreProduct = async (products) => {
    const {data} = await $authHost.post('api/product_excel', products)
    return data
}

// choisir produit
export const fetchProduct = async (productTypeId, productBrandId) => {
    const {data} = await $host.get('api/product', {params: {
        productTypeId, productBrandId
        }})
    return data
}

// choisir produit
export const fetchProductsForAdmin = async () => {
    const {data} = await $authHost.get(`api/display_product`);
    return data;
}


// choisir un produit
export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

// surpimer un produit
export const fetchDeleteProduct = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/product/${id}`});
    return data;
}

// mettre a jour produit
export const updateProduct = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/product/${id}`, data: body});
    return data;
}

// mettre a jour image
export const updateDisplayProduct = async ({display, id}) => {
    const {data} = await $authHost.put('api/display_product', {display, id});
    return data;
}

// ajout panier
export const addProductToBasket = async (product) => {
    const {data} = await $authHost.post('api/basket', product);
    return data;
}

// Рanier (modifier supprimer )
export const changeCountProductBasket = async (data_action) => {
    const {data} = await $authHost.post('api/basket/change_count', data_action);
    return data;
}

export const getProductFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteProductFromBasket = async (id) => {
    const {data} = await $authHost({method: "DELETE", url: `api/basket/${id}`});
    return data;
}

//recherche produits
export const getAllProductSearch = async (name) => {
    const {data} = await $host({method:'GET', url:`api/product/search/${name}`});
    return data;
}

// surppimer marques
export const deleteInfo = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/info_product/'+id});
    return data;
}


