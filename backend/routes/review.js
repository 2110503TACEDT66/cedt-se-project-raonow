const express = require('express');
const {getReviews, createReview, getReviewHeader} = require('../controllers/review');

const router = express.Router({mergeParams:true});
const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Review:
*       type: object
*       required:
*         - user
*         - booking
*         - hotel
*         - rating
*         - title
*         - review
*         - travelerType
*       properties:
*         id:
*           type: string
*           format: uuid
*         user:
*           type: object
*           properties:
*             id:
*               type: string
*               format: uuid
*             name:
*               type: string
*         booking:
*           type: object
*           properties:
*             id:
*               type: string
*               format: uuid
*             bookDate:
*               type: string
*               format: date
*             roomType:
*               type: string
*               example: Standard
*             duration:
*               type: integer
*               example: 1
*         hotel:
*           type: object
*           properties:
*             id:
*               type: string
*               format: uuid
*             name:
*               type: string
*         rating:
*           type: number
*         title:
*           type: string
*         review:
*           type: string
*         travelerType:
*           type: string
*           example: solo
*         attitude:
*           type: string
*           example: neutral
*         readStatus:
*           type: string
*           example: unread
*         createdAt:
*           type: string
*           format: date
*     InputReview:
*       type: object
*       required:
*         - user
*         - booking
*         - hotel
*         - rating
*         - title
*         - review
*         - travelerType
*       properties:
*         user:
*           type: string
*           format: uuid
*         booking:
*           type: string
*           format: uuid
*         hotel:
*           type: string
*           format: uuid
*         rating:
*           type: number
*         title:
*           type: string
*         review:
*           type: string
*         travelerType:
*           type: string
*           example: solo
*         attitude:
*           type: string
*           example: neutral
*/

/**
* @swagger
* components:
*   schemas:
*     CreateReview:
*       type: object
*       required:
*         - review
*       properties:
*         review:
*           type: object
*           required:
*             - user
*             - booking
*             - hotel
*             - rating
*             - title
*             - review
*             - travelerType
*             - attitude
*           properties:
*             id:
*               type: string
*               format: uuid
*             user:
*               type: string
*               format: uuid
*             booking:
*               type: string
*               format: uuid
*             hotel:
*               type: string
*               format: uuid
*             rating:
*               type: integer
*               format: int32
*             title:
*               type: string
*             review:
*               type: string
*             travelerType:
*               type: string
*             attitude:
*               type: string
*/

/**
* @swagger
* components:
*   schemas:
*     ReviewHeader:
*       type: object
*       required:
*         - hotel
*         - averageRating
*         - totalReviewCount
*       properties:
*         hotel:
*           type: string
*           format: uuid
*         averageRating:
*           type: number
*         totalReviewCount:
*           type: number
*/

//Tag
/**
* @swagger
* tags:
*   name: Review
*/

//Get All with query
/**
* @swagger
* /hotel/{hotel_id}/reviews:
*   get:
*     summary: Returns the list of all reviews
*     tags: [Review]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: hotel_id
*         schema:
*           type: string
*           default: 65e43ae76ab856889745475e
*         required: true
*       - in: query
*         name: date
*         schema:
*           type: string
*         description: date
*       - in: query
*         name: rating
*         schema:
*           type: array
*           items:
*             type: number
*             format: float
*         explode: false
*         description: 1-5
*       - in: query
*         name: travelerType
*         schema:
*           type: string
*         description: "solo, couple, family, group, business"
*       - in: query
*         name: sort
*         schema:
*           type: string
*         description: "mostRelevant, -createdAt, -rating, rating, createdAt"
*       - in: query
*         name: id
*         schema:
*           type: string
*         description: id
*       - in: query
*         name: lastCheck
*         schema:
*           type: string
*         description: lastCheck
*     responses:
*       200:
*         description: The list of all reviews
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Review'
*/

//Get header
/**
* @swagger
* /hotel/{hotel_id}/reviews/header:
*   get:
*     summary: Returns the basic information of the review
*     tags: [Review]
*     parameters:
*       - in: path
*         name: hotel_id
*         schema:
*           type: string
*           default: 65e43ae76ab856889745475e
*         required: true
*     responses:
*       200:
*         description: The basic information of the review
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/ReviewHeader'
*/

//Create
/**
* @swagger
* /hotel/{hotel_id}/reviews:
*   post:
*     summary: Create a review
*     tags: [Review]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: hotel_id
*         schema:
*           type: string
*         required: true
*         default: 66047bf2ea8d18035a6a5ca3
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/CreateReview'
*     responses:
*       201:
*         description: Created review successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/InputReview'
*/

//Update
/**
* @swagger
* /auth/users/{user_id}/reviewFilter:
*   put:
*     summary: Update a review
*     tags: [Review]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: user_id
*         schema:
*           type: string
*         required: true
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/InputReview'
*     responses:
*       200:
*         description: Updated review successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/InputReview'
*/

router.route('/')
    .get(protect, getReviews)
    .post(protect, createReview);

router.route('/header').get(getReviewHeader);

module.exports=router;