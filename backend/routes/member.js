const express = require('express');

const {getMembers, getMember, createMember, updateMember, deleteMember}
    = require('../controllers/member');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, authorize('admin'), getMembers)
    .post(protect, createMember);

router.route('/:id')
    .get(protect, getMember)
    .put(protect, updateMember)
    .delete(protect, deleteMember);
    
module.exports=router;