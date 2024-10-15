import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

// choisir produit
export const fetchProductExcel = async (productTypeId, productBrandId) => {
  const { data } = await $host.get("api/product_excel", {
    params: {
      productTypeId,
      productBrandId,
    },
  });
  return data;
};

// choisir les commandes 
export const fetchOrderExcel = async ({ complete }) => {
  const { data } = await $authHost.get(`api/order_excel?complete=${complete}`);
  return data;
};

// choisir marques
export const fetchBrandExcel = async () => {
  const { data } = await $authHost.get(`api/brand_excel`);
  return data;
};

// choisir catégorie
export const fetchTypeExcel = async () => {
  const { data } = await $authHost.get(`api/type_excel`);
  return data;
};

// choisir utilisateur
export const fetchUserExcel = async () => {
  const { data } = await $authHost.get(`api/user_excel`);
  return data;
};