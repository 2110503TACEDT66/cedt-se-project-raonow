const express = require('express');
const {getHotels, getHotel, createHotel, updateHotel, deleteHotel} 
    = require('../controllers/hotels');

//Include other resource routers
const bookingRouter = require('./booking'); 
const reviewRouter = require('./review');

const router = express.Router();
const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Hotel:
*       type: object
*       required:
*         - name
*         - address
*         - province
*         - telephoneNumber
*         - starRating
*         - basePrice
*         - images
*         - hotelier
*       properties:
*         id:
*           type: string
*           format: uuid
*         name:
*           type: string
*         address:
*           type: string
*         province:
*           type: string
*         telephoneNumber:
*           type: string
*         starRating:
*           type: integer
*         basePrice:
*           type: integer
*         images:
*           type: object
*           properties:
*             main:
*               type: string
*         hotelier:
*           type: string
*           format: uuid
*/

//Tag
/**
* @swagger
* tags:
*   name: Hotel
*/

//Get All
/**
* @swagger
* /hotel:
*   get:
*     summary: Returns the list of all hotels
*     tags: [Hotel]
*     responses:
*       200:
*         description: The list of the hotels
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Hotel'
*/

//Re-route into other resource routers
router.use('/:hotelId/booking/', bookingRouter);
router.use('/:hotelId/reviews', reviewRouter);

router.route('/')
    .get(getHotels)
    .post(protect, authorize('admin'), createHotel);
router.route('/:id')
    .get(getHotel)
    .put(protect, authorize('admin'), updateHotel)
    .delete(protect, authorize('admin'), deleteHotel);

module.exports=router;