const express = require('express');

const {getBookings, getBooking, createBooking, updateBooking, deleteBooking, getDashboard}
    = require('../controllers/bookings');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Booking:
*       type: object
*       required:
*         - bookDate
*         - user
*         - hotel
*         - roomType
*         - duration
*       properties:
*         id:
*           type: string
*           format: uuid
*         bookDate:
*           type: string
*           format: date
*         user:
*           type: string
*           format: uuid
*         hotel:
*           type: string
*           format: uuid
*         review:
*           type: string
*           format: uuid
*         roomType:
*           type: string
*         duration:
*           type: integer
*         pointEarned:
*           type: integer
*         createdAt:
*           type: string
*           format: date
*/

//Tag
/**
* @swagger
* tags:
*   name: Booking
*/

//Get All
/**
* @swagger
* /booking:
*   get:
*     summary: Returns the list of all the bookings
*     tags: [Booking]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: The list of the bookings
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Booking'
*/

//Get One
/**
* @swagger
* /booking/{id}:
*   get:
*     summary: Returns a booking
*     tags: [Booking]
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
*         description: A booking
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Booking'
*/

//Get Dashboard
/**
* @swagger
* /booking/dashboard:
*   get:
*     summary: Returns dashboard
*     tags: [Booking]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: Dashboardd
*/

//Create
/**
* @swagger
* /hotel/{hotel_id}/booking:
*   post:
*     summary: Create a booking
*     tags: [Booking]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: hotel_id
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               bookDate:
*                 type: string
*                 format: date
*                 example: 2024-05-13
*               roomType:
*                 type: string
*                 example: Suite
*               duration:
*                 type: integer
*                 example: 2
*     responses:
*       200:
*         description: Created booking successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Booking'
*/

//Update
/**
* @swagger
* /booking/{id}:
*   put:
*     summary: Update a booking
*     tags: [Booking]
*     security:
*       - BearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               bookDate:
*                 type: string
*                 format: date
*                 example: 2024-05-13
*               roomType:
*                 type: string
*                 example: Suite
*               duration:
*                 type: integer
*                 example: 2
*     responses:
*       200:
*         description: Updated booking successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Booking'
*/

//Delete
/**
* @swagger
* /booking/{id}:
*   delete:
*     summary: Delete a booking
*     tags: [Booking]
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
*         description: The booking was deleted
*/

router.route('/')
    .get(protect, getBookings)
    .post(protect, authorize('admin', 'user'), createBooking);
router.route('/dashboard')
    .get(protect, authorize('admin'), getDashboard);
router.route('/:id')
    .get(protect, getBooking)
    .put(protect, authorize('admin', 'user'), updateBooking)
    .delete(protect, authorize('admin', 'user'), deleteBooking);
    
module.exports=router;