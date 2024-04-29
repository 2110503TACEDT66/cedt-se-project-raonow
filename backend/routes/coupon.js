const express = require('express');

const {getCoupons, getCoupon, createCoupon}
    = require('../controllers/coupon');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Coupon:
*       type: object
*       required:
*         - code
*         - campaign
*         - member
*         - createdAt
*         - expiryDate
*         - used
*       properties:
*         id:
*           type: string
*           format: uuid
*         code:
*           type: string
*           format: uuid
*         campaign:
*           type: string
*           format: uuid
*         member:
*           type: string
*           format: uuid
*         createdAt:
*           type: string
*           format: date
*         expiryDate:
*           type: string
*           format: date
*         used:
*           type: boolean
*         useBy:
*           type: string
*           format: uuid
*         useAt:
*           type: string
*           format: uuid
*         useDate:
*           type: string
*           format: date
*/

//Tag
/**
* @swagger
* tags:
*   name: Coupon
*/

//Get All
/**
* @swagger
* /coupon:
*   get:
*     summary: Returns the list of all coupons
*     tags: [Coupon]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: The list of all coupons
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*/

//Get One
/**
* @swagger
* /coupon/{id}:
*   get:
*     summary: Returns a coupon
*     tags: [Coupon]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*     responses:
*       200:
*         description: A coupon
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*/

//Create
/**
* @swagger
* /coupon:
*   post:
*     summary: Create a coupon
*     tags: [Coupon]
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Coupon'
*     responses:
*       200:
*         description: Created coupon successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Coupon'
*/

router.route('/')
    .get(protect, getCoupons)
    .post(protect, createCoupon);

router.route('/:id')
    .get(protect, getCoupon);
    
module.exports=router;