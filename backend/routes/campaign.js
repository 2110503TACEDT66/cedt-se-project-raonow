const express = require('express');

const {getCampaigns, getCampaign, createCampaign, updateCampaign, deleteCampaign}
    = require('../controllers/campaign');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Campaign:
*       type: object
*       required:
*         - title
*         - description
*         - point
*         - onePerUser
*         - discountType
*         - discountAmount
*         - totalAmount
*         - amountLeft
*         - duration
*       properties:
*         id:
*           type: string
*           format: uuid
*         title:
*           type: string
*         description:
*           type: string
*         point:
*           type: integer
*         onePerUser:
*           type: boolean
*         discountType:
*           type: string
*         discountAmount:
*           type: integer
*         limitedArea:
*           type: string
*         totalAmount:
*           type: integer
*         amountLeft:
*           type: integer
*         createdAt:
*           type: string
*           format: date
*         duration:
*           type: integer
*     InputCampaign:
*       type: object
*       required:
*         - title
*         - description
*         - point
*         - onePerUser
*         - discountType
*         - discountAmount
*         - totalAmount
*         - amountLeft
*         - duration
*       properties:
*         title:
*           type: string
*         description:
*           type: string
*         point:
*           type: integer
*         onePerUser:
*           type: boolean
*         discountType:
*           type: string
*           example: percentage
*         discountAmount:
*           type: integer
*         totalAmount:
*           type: integer
*         amountLeft:
*           type: integer
*         duration:
*           type: integer
*/

//Tag
/**
* @swagger
* tags:
*   name: Campaign
*/

//Get All
/**
* @swagger
* /campaign:
*   get:
*     summary: Returns the list of all campaigns
*     tags: [Campaign]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: The list of all campaigns
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Campaign'
*/

//Get One
/**
* @swagger
* /campaign/{id}:
*   get:
*     summary: Returns a campaign
*     tags: [Campaign]
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
*         description: A campaign
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Campaign'
*/

//Create
/**
* @swagger
* /campaign:
*   post:
*     summary: Create a campaign
*     tags: [Campaign]
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/InputCampaign'
*     responses:
*       201:
*         description: Created campaign successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Campaign'
*/

//Update
/**
* @swagger
* /campaign/{id}:
*   put:
*     summary: Update a campaign
*     tags: [Campaign]
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
*             $ref: '#/components/schemas/InputCampaign'
*     responses:
*       200:
*         description: Updated campaign successfully
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Campaign'
*/

//Delete
/**
* @swagger
* /campaign/{id}:
*   delete:
*     summary: Delete a campaign
*     tags: [Campaign]
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
*         description: The Campaign was deleted
*/

router.route('/')
    .get(protect, getCampaigns)
    .post(protect, authorize('admin'), createCampaign);

router.route('/:id')
    .get(protect, getCampaign)
    .put(protect, authorize('admin'), updateCampaign)
    .delete(protect, authorize('admin'), deleteCampaign);
    
module.exports=router;