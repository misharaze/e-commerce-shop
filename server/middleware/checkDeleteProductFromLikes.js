const {Likes, LikesProduct} = require('../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {id} = req.params;
        const user = req.user;
        const userLikes = await Likes.findOne({where: {userId: user.id}});
        const productItem = await LikesProduct.findOne({where: {likeId: userLikes.id, productId: id}});

        if(productItem) {
            return next();
        }
        return res.json("ce produit n'a pas etait trouvé dans les produits aimer par l'utilisateur ");
    } catch (e) {
        res.json(e);
    }
};