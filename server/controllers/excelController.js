const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");
const {
  Question,
  Product,
  Answer,
  ProductBrand,
  ProductType,
  OrderProduct,
  Orders,
  User,
} = require("../models/models");
const { badRequest } = require("../errors/ApiErrors");

class excelController {
  async getProductExcel(req, res) {
    let { productBrandId, productTypeId } = req.query;
    let product;

    if (!productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom du produit"],
          ["price", "prix"],
          ["rating", "rating"],
        ],
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "rating"],
        ],
        where: { productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (!productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "note produit"],
        ],
        where: { productTypeId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "appellation"],
          ["price", "prix"],
          ["rating", "note produit"],
        ],

        where: { productTypeId, productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    return res.json(product);
  }

  async getOrderExcel(req, res) {
    let { complete } = req.query;
    let products;
    if (complete === "not-completed") {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "statut de la commande"],
          ["userId", "ID_utilisateur"],
          ["createdAt", "date de la mise a jour"],
          ["updatedAt", "date_commande_executer"],
        ],
        where: { complete: false },
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_produit"],
              ["orderId", "ID_commande"],
              ["count", "quantité_produit"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "nom_produit"],
                  ["price", "prix_produit"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "prénom"],
              ["family", "nom"],
            ],
          },
        ],
      });
    } else if (complete === "completed") {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "statut_commande"],
          ["userId", "ID_utilisateur"],
          ["createdAt", "date de la mise a jour"],
          ["updatedAt", "date_commande_executer"],
        ],
        where: { complete: true },
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_produit"],
              ["orderId", "ID_commande"],
              ["count", "quantité_produit"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "nom_produit"],
                  ["price", "prix_produit"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "prénom"],
              ["family", "nom"],
            ],
          },
        ],
      });
    } else {
      products = await Orders.findAndCountAll({
        attributes: [
          ["complete", "statut_commande"],
          ["userId", "ID_utilisateur"],
          ["createdAt", "date de la mise a jour"],
          ["updatedAt", "date_commande_executer"],
        ],
        include: [
          {
            model: OrderProduct,
            attributes: [
              ["id", "ID"],
              ["productId", "ID_produit"],
              ["orderId", "ID_commande"],
              ["count", "quantité_produit"],
            ],
            include: [
              {
                model: Product,
                attributes: [
                  ["name", "nom_produit"],
                  ["price", "prix_produit"],
                ],
                include: [
                  { model: ProductBrand, attributes: ["name"] },
                  { model: ProductType, attributes: ["name"] },
                ],
              },
            ],
          },
          {
            model: User,
            attributes: [
              ["name", "prénom"],
              ["family", "nom de famille"],
            ],
          },
        ],
      });
    }

    return res.json(products);
  }

  async getProductExcel(req, res) {
    let { productBrandId, productTypeId } = req.query;
    let product;

    if (!productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "rating"],
        ],
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && !productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "rating"],
        ],
        where: { productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (!productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "rating"],
        ],
        where: { productTypeId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    if (productBrandId && productTypeId) {
      product = await Product.findAndCountAll({
        attributes: [
          ["id", "ID"],
          ["name", "nom"],
          ["price", "prix"],
          ["rating", "rating"],
        ],

        where: { productTypeId, productBrandId },
        include: [
          { model: ProductBrand, attributes: ["name"] },
          { model: ProductType, attributes: ["name"] },
        ],
      });
    }
    return res.json(product);
  }

  async getBrandExcel(req, res) {
    let brands_res;
    brands_res = await ProductBrand.findAll({
        attributes: [
          ["id", "numéro"],
          ["name", "nom"],
          ["createdAt", "jour_d'ajout"],
        ],
      });

    return res.json(brands_res);
  }

  async getTypeExcel(req, res) {
    let types_res;
    types_res = await ProductType.findAll({
        attributes: [
          ["id", "numéro"],
          ["name", "nom"],
          ["createdAt", "jour_d'ajout"],
        ],
      });

    return res.json(types_res);
  }

  async getUsersExcel(req, res) {
    let users_res;
    users_res = await User.findAll({
        attributes: [
          ["name", "prénom"],
          ["family", "nom de famille"],
          ["date_birthday", "date de naissance"],
          ["role", "role"],
          ["createdAt", "date_de creation du compte"],
        ],
      });

    return res.json(users_res);
  }
}

module.exports = new excelController();
