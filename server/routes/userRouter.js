const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth.Middleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

/**
 * @openapi
 * '/api/user/registration':
 *  post:
 *     tags:
 *     - User
 *     summary: enregirstrement d'un utilisateur 
 *     parameters:
 *     - name: email
 *       in: query
 *       required: true
 *       description: adresse mail utilisateur
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: true
 *       description: mot de passe utilisateur
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     - name: name
 *       in: query
 *       required: true
 *       description: prenom utilisateur
 *       schema:
 *         type : string
 *         example: Иван
 *
 *     - name: family
 *       in: query
 *       required: true
 *       description:   nom utilisateur
 *       schema:
 *         type : string
 *         example: Иванов
 *
 *     - name: data_birthday
 *       in: query
 *       required: true
 *       description: date de naissance utilisateur
 *       schema:
 *         type : string
 *         example: 02.02.1999
 *
 *     - name: numberPhone
 *       in: query
 *       required: true
 *       description: numéro de telephone пользователя
 *       schema:
 *         type : string
 *         example: 88008002526
 *
 *     - name: gender
 *       in: query
 *       required: true
 *       description: Пол
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: allowSpam
 *       in: query
 *       required: true
 *       description: acces au email envoyer
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: role
 *       in: query
 *       required: true
 *       description: role utilisateur
 *       schema:
 *         type : string
 *         example: USER
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utilisateur existe deja!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur!
 */
router.post("/registration", userController.registration);

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: connexion utilisateur
 *     parameters:
 *     - name: email
 *       in: query
 *       required: true
 *       description: adresse email utilisateur
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: true
 *       description: mot de passe utilisateur
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utlilsateur n'a pas etait trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur du serveur!
 */
router.post("/login", userController.login);

/**
 * @openapi
 * '/api/user/auth':
 *  get:
 *     tags:
 *     - User
 *     summary: vérifications de l'utilisateur (quelle type d'utilisateur)
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9.QEm7CXwf_0Fmm0HwdgRz9uVkUjx5FZH17A6J6rdfYTI
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utilisateur n'a pas l'accés nécessaire !
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get("/auth", authMiddleware, userController.checkAuth);

/**
 * @openapi
 * '/api/user/admin_user':
 *  get:
 *     tags:
 *     - User
 *     summary: obtention de la liste des administrateurs
 *
 *     responses:
 *       200:
 *         description: liste des administrateurs 
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
 *                       name:
 *                         type: string
 *                         example: Admin
 *                       family:
 *                         type: string
 *                         example: Admin
 *                       email:
 *                         type: string
 *                         example: admin@admin.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: utilisateur non trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get(
  "/admin_user",
  checkRoleMiddleware("ADMIN"),
  userController.getUsersRoleAdmin
);

/**
 * @openapi
 * '/api/user/new_user':
 *  get:
 *     tags:
 *     - User
 *     summary: obtention de la liste des nouveaux utilisateurs
 *
 *     responses:
 *       200:
 *         description: liste des nouveaux utilisateurs
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
 *                       name:
 *                         type: string
 *                         example: jean
 *                       family:
 *                         type: string
 *                         example: gérard
 *                       email:
 *                         type: string
 *                         example: gerard@gmail.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: utilisateur non trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get(
  "/new_user",
  checkRoleMiddleware("ADMIN"),
  userController.getNewUser
);

/**
 * @openapi
 * '/api/user/money_user':
 *  get:
 *     tags:
 *     - User
 *     summary: obtention liste utilisateur , qui ont procéder à un grand nombre d'achats
 *
 *     responses:
 *       200:
 *         description: liste utilisateur 
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
 *                       name:
 *                         type: string
 *                         example: jean
 *                       family:
 *                         type: string
 *                         example: gerard
 *                       email:
 *                         type: string
 *                         example: gerard@gmail.com
 *
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: utilisteur non trouvé !
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get(
  "/money_user",
  checkRoleMiddleware("ADMIN"),
  userController.getMoneyUser
);

/**
 * @openapi
 * '/api/user/:id':
 *  get:
 *     tags:
 *     - User
 *     summary: obtention donnée sur un utilisateur
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID utilisateur
 *       schema:
 *         type : integer
 *         example: 4
 *     responses:
 *       200:
 *         description: Сliste utilisateur
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
 *                         example: 4
 *                       name:
 *                         type: string
 *                         example: jean
 *                       family:
 *                         type: string
 *                         example: gerard
 *                       email:
 *                         type: string
 *                         example: gerard@gmail.com
 *                       numberPhone:
 *                         type: string
 *                         example: 88005663478
 *                       dataBirthday:
 *                         type: string
 *                         example: 02.02.2000
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utilisateur n'a pas etait trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get("/:id", authMiddleware, userController.getDataUser);

/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - User
 *     summary: obtention
 *
 *     responses:
 *       200:
 *         description: liste utilisateur
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
 *                         example: 4
 *                       name:
 *                         type: string
 *                         example: jean
 *                       family:
 *                         type: string
 *                         example: gerard
 *                       email:
 *                         type: string
 *                         example: gerard@gmail.com
 *                       numberPhone:
 *                         type: string
 *                         example: 88005663478
 *                       dataBirthday:
 *                         type: string
 *                         example: 02.02.2000
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utilisateur n'a pas etait trouvé!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.get("/", authMiddleware, userController.getAllUsers);

/**
 * @openapi
 * '/api/user/:id':
 *  put:
 *     tags:
 *     - User
 *     summary: mise a jour donnée utilisateur
 *     parameters:
 *     - name: id
 *       in: query
 *       required: true
 *       description: ID utilisateur
 *       schema:
 *         type : integer
 *         example: 4
 *     - name: email
 *       in: query
 *       required: false
 *       description: adresse email utilisateur
 *       schema:
 *         type : string
 *         example: example@example.com
 *
 *     - name: password
 *       in: query
 *       required: false
 *       description: mot de passe utilisateur
 *       schema:
 *         type : string
 *         example: examplepassword12345
 *
 *     - name: name
 *       in: query
 *       required: false
 *       description: prenom utilisateur
 *       schema:
 *         type : string
 *         example: jean
 *
 *     - name: family
 *       in: query
 *       required: false
 *       description: nom de famille utilisateur
 *       schema:
 *         type : string
 *         example: gerard
 *
 *     - name: data_birthday
 *       in: query
 *       required: false
 *       description: date de naissance utilisateur
 *       schema:
 *         type : string
 *         example: 02.02.1999
 *
 *     - name: numberPhone
 *       in: query
 *       required: false
 *       description: numéro de telephone utilisateur
 *       schema:
 *         type : string
 *         example: 88008002526
 *
 *     - name: gender
 *       in: query
 *       required: false
 *       description: Пол
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: allowSpam
 *       in: query
 *       required: false
 *       description: accés au email publicitaire
 *       schema:
 *         type : bool
 *         example: true
 *
 *     - name: role
 *       in: query
 *       required: false
 *       description: role utilisateur
 *       schema:
 *         type : string
 *         example: USER
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: données utilisateur mise a jour!
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: cette utilisateur est deja existant!
 *       '400':
 *         description: badRequest
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: erreur serveur!
 */
router.put("/:id", userController.updateUserData);

module.exports = router;
