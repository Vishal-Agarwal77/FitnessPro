import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { VerifyUser, completedWorkout, createWorkout, currentWorkout, getAllWorkouts, getRecord, getUserProfile, loginUser, registerUser } from '../controllers/user.controllers.js';
import accessControl from '../middlewares/AccessControl.middleware.js';

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route('/verify').post(accessControl,VerifyUser)

router.route('/login').post(accessControl,loginUser)

router.route('/getWorkouts').get(accessControl,getAllWorkouts)

router.route('/create').post(accessControl,createWorkout)

router.route('/getCurrentWorkout').post(accessControl,currentWorkout)

router.route('/doneWorkout').post(accessControl,completedWorkout)

router.route('/getUser').post(accessControl,getUserProfile)

router.route('/PastRecord').post(accessControl,getRecord)

export default router;