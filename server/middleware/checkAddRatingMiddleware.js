const {Rating, Product} = require('./../models/models');

const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const {productId} = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const checkRating = await Rating.findOne({where: {productId, userId: user.id}});
        const checkProducts =  await Product.findOne({where: {id: productId}});

        if (!checkProducts) {
            return res.json("ce produit n'existe pas dans la base de donnée");
        } else if(checkRating && checkProducts) {
            return res.json("vous avez oublié de noté ce produit");
        }
        return next();
    } catch (e) {
        return res.status(401).json("erreur au niveau de checkAddRatingMiddleware.js");
    }
};