const express = require('express');
const {register, login, getMe, logout, getAllUser, updateReviewFilter} = require('../controllers/auth');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

/**
* @swagger
* components:
*   securitySchemes:
*     BearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/

//Model
/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - name
*         - telephoneNumber
*         - email
*         - password
*       properties:
*         id:
*           type: string
*           format: uuid
*         name:
*           type: string
*         telephoneNumber:
*           type: string
*         email:
*           type: string
*         password:
*           type: string
*         role:
*           type: string
*         member:
*           type: string
*           format: uuid
*         createdAt:
*           type: string
*           format: date
*       example:
*         id: UID
*         name: Name
*         telephoneNumber: "0987654321"
*         email: any@gmail.com
*         password: "123456"
*         role: "admin"
*         member: null
*         createAt: 2024-04-18T14:42:41.562Z
*/

//Tag
/**
* @swagger
* tags:
*   name: User
*/

//Register
/**
* @swagger
* /auth/register:
*   post:
*     summary: Register
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: Create user successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

//Login
/**
* @swagger
* /auth/login:
*   post:
*     summary: Login
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*             example:
*               email: AdminFR@gmail.com
*               password: "123456"
*     responses:
*       200:
*         description: Successful login
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 token:
*                   type: string
*                   example: "<JWT_TOKEN>"
*       400:
*         description: Bad request
*       401:
*         description: Invalid email or password
*/

//Get Profile
/**
* @swagger
* /auth/me:
*   get:
*     summary: Get your Profile
*     tags: [User]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.route('/users').get(protect, authorize('admin'), getAllUser);
router.route('/users/:id/reviewFilter').put(protect, updateReviewFilter);
module.exports = router;