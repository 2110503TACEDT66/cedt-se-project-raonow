const express = require('express');

const {getMembers, getMember, createMember, updateMember, deleteMember}
    = require('../controllers/member');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

//Model
/**
* @swagger
* components:
*   schemas:
*     Member:
*       type: object
*       required:
*         - user
*         - address
*         - province
*         - birthday
*       properties:
*         id:
*           type: string
*           format: uuid
*         user:
*           type: string
*           format: uuid
*         address:
*           type: string
*         province:
*           type: string
*         birthday:
*           type: string
*           format: date
*         point:
*           type: integer
*/

//Tag
/**
* @swagger
* tags:
*   name: Member
*/

//Create Member
/**
* @swagger
* /member:
*   post:
*     summary: Create membership
*     tags: [Member]
*     security:
*       - BearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Member'
*     responses:
*       201:
*         description: Create membership successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Member'
*/

//Get Members
/**
* @swagger
* /member:
*   get:
*     summary: Get all Members
*     tags: [Member]
*     security:
*       - BearerAuth: []
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Member'
*/

//Get a Member
/**
* @swagger
* /member/{id}:
*   get:
*     summary: Get a Member
*     tags: [Member]
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
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Member'
*/

router.route('/')
    .get(protect, authorize('admin'), getMembers)
    .post(protect, createMember);

router.route('/:id')
    .get(protect, getMember)
    .put(protect, updateMember)
    .delete(protect, deleteMember);
    
module.exports=router;