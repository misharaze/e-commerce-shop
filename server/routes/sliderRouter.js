const Router = require("express");
const router = new Router();
const sliderController = require("../controllers/sliderControllers");
const checkRole = require("../middleware/checkRoleMiddleware");

/**
 * @openapi
 * '/api/slider':
 *  post:
 *     tags:
 *     - Slider
 *     summary: creation slide
 *     parameters:
 *     - name: title
 *       in: query
 *       required: true
 *       description: en tete du slide
 *       schema:
 *         type : string
 *         example: nouveau produit
 *
 *     - name: text
 *       in: query
 *       required: true
 *       description: texte du slide
 *       schema:
 *         type : string
 *         example: les nouveaux produits sont arrivés
 *
 *     - name: img
 *       in: query
 *       required: true
 *       description: image du slide
 *       schema:
 *         type : file
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide créer
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur
 */
router.post("/", checkRole("ADMIN"), sliderController.createSlider);

/**
 * @openapi
 * '/api/slider/':
 *  get:
 *     tags:
 *     - Slider
 *     summary: obtenir liste des slides
 *
 *     responses:
 *       200:
 *         description: liste des slides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       img:
 *                         type: string
 *                         example: 08c96c56-c6b7-44ea-ad24-9710e1fbbf6c.jpg
 *                       title:
 *                         type: string
 *                         example: salut, nouveaux slide!
 *                       text:
 *                         type: string
 *                         example: descritpion slide
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide non trouvé
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur
 */
router.get("/", sliderController.getSliders);

/**
 * @openapi
 * '/api/slider/:id':
 *  get:
 *     tags:
 *     - Slider
 *     summary: obtention d'un slide
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID slide
 *       schema:
 *         type : integer
 *         example: 5
 *     responses:
 *       200:
 *         description: parametre du slide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       img:
 *                         type: string
 *                         example: 08c96c56-c6b7-44ea-ad24-9710e1fbbf6c.jpg
 *                       title:
 *                         type: string
 *                         example: salut, nouveaux slide
 *                       text:
 *                         type: string
 *                         example: description slide
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide non trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur
 */
router.get("/:id", sliderController.getOneSlides);

/**
 * @openapi
 * '/api/slider/:id':
 *  delete:
 *     tags:
 *     - Slider
 *     summary: surpression du slide
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID slide
 *       schema:
 *         type : integer
 *         example: 5
 *     responses:
 *       200:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide supprimer
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide non trouvé
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur
 */
router.delete("/:id", checkRole("ADMIN"), sliderController.deleteSlide);

/**
 * @openapi
 * '/api/slider/:id':
 *  put:
 *     tags:
 *     - Slider
 *     summary: modifications du slide
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID slide
 *       schema:
 *         type : integer
 *         example: 5
 *     - name: title
 *       in: query
 *       required: true
 *       description: en tete du slide
 *       schema:
 *         type : string
 *         example: nouveaux produits
 *
 *     - name: text
 *       in: query
 *       required: true
 *       description: texte du slide
 *       schema:
 *         type : string
 *         example: nouveaux produits arrivés
 *
 *     - name: img
 *       in: query
 *       required: true
 *       description: image du slide
 *       schema:
 *         type : file
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: slide modifier
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur
 */
router.put("/:id", checkRole("ADMIN"), sliderController.updateSlide);

module.exports = router;
