const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../errors/ApiErrors");
const { Op } = require("sequelize");

class ProductInfoController {
  async createProductInfo(req, res, next) {
    try {
      let { description, title, id } = req.body;

          ProductInfo.create({
            title: title,
            description: description,
            productId: id,
          })
      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getProductInfo(req, res, next) {
    try {
      let { id } = req.params;
          let info = ProductInfo.findAll({
            where: {productId: id},
          })
          console.log(info);
      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getProductOneInfo(req, res) {
    try {
      let { id } = req.params;

          let info = ProductInfo.findAll({
            where: {id: id},
          })
      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateProductInfo(req, res) {
    try {
      let { title, description, id, productId } = req.body;

      ProductInfo.update({
        title: title,
        description: description,
        productId: productId,
      }, {where:{id: id}});

      return res.json(info);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteInfo(req, res) {
    try {
      const { id } = req.params;
      await ProductInfo.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await ProductInfo.destroy({ where: { id } }).then(() => {
            return res.json("informations supprimer");
          });
        } else {
          return res.json("cette informations n'est pas dans la base de données...");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new ProductInfoController();
