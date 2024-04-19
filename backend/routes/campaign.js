const express = require('express');

const {getCampaigns, getCampaign, createCampaign, updateCampaign, deleteCampaign}
    = require('../controllers/campaign');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getCampaigns)
    .post(protect, authorize('admin'), createCampaign);

router.route('/:id')
    .get(protect, getCampaign)
    .put(protect, authorize('admin'), updateCampaign)
    .delete(protect, authorize('admin'), deleteCampaign);
    
module.exports=router;