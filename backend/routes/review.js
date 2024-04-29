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
*         attitude:
*           type: string
*         readStatus:
*           type: string
*         createdAt:
*           type: string
*           format: date
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
*         description: rating
*       - in: query
*         name: travelerType
*         schema:
*           type: string
*         description: ['solo', 'couple', 'family', 'group', 'business']
*       - in: query
*         name: sort
*         schema:
*           type: string
*         description: sort
*       - in: query
*         name: id
*         schema:
*           type: string
*         description: id
*       - in: query
*         name: header
*         schema:
*           type: integer
*         description: header
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
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Review'
*     responses:
*       200:
*         description: Created review successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Review'
*/

//Update
/**
* @swagger
* /auth/users/${user_id}/reviewFilter:
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
*             $ref: '#/components/schemas/Review'
*     responses:
*       200:
*         description: Updated review successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Review'
*/

router.route('/')
    .get(protect, getReviews)
    .post(protect, createReview);

router.route('/header').get(getReviewHeader);

module.exports=router;