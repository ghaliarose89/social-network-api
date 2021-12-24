
const router = require('express').Router();
const {
    getAllThoughts,addThought,updateThoughById,getThoughById,deleteThought,addReaction,removeReaction
} 
= require('../../controllers/thought-contoller');


router.route('/').get(getAllThoughts).post(addThought)
router.route('/:id').put(updateThoughById).get(getThoughById).delete(deleteThought);
router.route('/:thoughtId/reactions/').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;