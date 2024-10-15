const {ProductType} = require('../models/models')
const ApiError = require('../errors/ApiErrors')
const uuid = require('uuid');
const path = require('path');

class ProductTypeController{
    async createProductType(req, res) {
        const {name} = req.body

        const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static_brand_and_type', fileName))

        const type = await ProductType.create({name, img: fileName})
        return res.json(type)
    }

    async getProductType(req, res) {
        const types = await ProductType.findAndCountAll()
        return res.json(types)
    }

    async updateType(req, res) {
        try {
          const { id } = req.params;
          const { name } = req.body;
    
          const {img} = req.files
          let fileName = uuid.v4() + ".jpg"
          img.mv(path.resolve(__dirname, '..', 'static_brand_and_type', fileName))

          await ProductType.findOne({ where: { id: id } }).then(async (data) => {
            if (data) {
              await ProductType.update({ name: name, img: fileName }, {where:{id: id}}).then(() => {
                return res.json("Type updated");
              });
            } else {
              return res.json("cette catégorie n'est pas dans la abse de donnée");
            }
          });
        } catch (e) {
          return res.json("mise a jour nom terminés car une erreur est survenue: " + e);
        }
      }

    async deleteProductType(req, res) {
        try {
            const {id} = req.params;
            await ProductType.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await ProductType.destroy({where:{id}}).then(() => {
                            return res.json("catégorie supprimer");
                        })
                    } else {
                        return res.json("cette catégorie n'existe pas dans la base de données");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new ProductTypeController()