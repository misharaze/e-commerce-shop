const {
  Basket,
  BasketProduct,
  Product,
  ProductInfo,
  ProductBrand,
  ProductType,
  Sizes,
} = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op, Sequelize } = require("sequelize");

class BasketController {
  async changeCount(req, res) {
    const { id, action } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const basket = await Basket.findOne({ where: { userId: user.id } });

    if (action == "-") {
      await BasketProduct.update(
        {
          count: Sequelize.literal("count - 1"),
        },
        { where: { basketId: basket.id, productId: id,  } }
      ).then((data) => {
        res.send("quantité à évolué");
      });
    } else if (action == "+") {
      await BasketProduct.update(
        {
          count: Sequelize.literal("count + 1"),
        },
        { where: { basketId: basket.id, productId: id,  } }
      ).then((data) => {
        res.send("quantité à évolué");
      });
    } else {
      res.send("Error");
    }
  }

  async addProducts(req, res) {
    try {
      const { id  } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketProduct.create({
        basketId: basket.id,
        productId: id,
        
      });
      return res.json("Produit ajouter au panier");
    } catch (e) {
      console.error(e);
    }
  }

  async getProducts(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = await Basket.findOne({ where: { userId: user.id } });
      const basket = await BasketProduct.findAll({ where: { basketId: id } });

      const basketArr = [];
      for (let i = 0; i < basket.length; i++) {
        let BasketProduct = await Product.findOne({
          where: {
            id: basket[i].productId,
          },
          include: {
            model: ProductInfo,
            as: "info",
            where: {
              productId: basket[i].productId,
              [Op.or]: [
                {
                  productId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });
        
        const count = { count: basket[i].count };
        const resultOne = Object.assign(BasketProduct.dataValues,);
        const result = Object.assign(resultOne, count);

        basketArr.push(result);
      }

      return res.json(basketArr);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const { size_product } = req.body;
      const user = req.user;

      await Basket.findOne({ where: { userId: user.id } }).then(
        async (userBasket) => {
          if (userBasket.userId === user.id) {
            await BasketProduct.destroy({
              where: {
                basketId: userBasket.id,
                productId: id,
               
              },
            });
          }
          return res.json(
            `vous n'etes pas authoriser a supprimer ce produit(${id}) du panier qui ne vous appartient pas `
          );
        }
      );
      return res.json("produit supprimer de votre panier");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new BasketController();
