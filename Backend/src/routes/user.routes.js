import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { VerifyUser, completedWorkout, createWorkout, currentWorkout, getAllWorkouts, getRecord, getUserProfile, loginUser, registerUser } from '../controllers/user.controllers.js';
// import accessControl from '../middlewares/AccessControl.middleware.js';

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

router.route('/verify').post(VerifyUser)

router.route('/login').post(loginUser)

router.route('/getWorkouts').get(getAllWorkouts)

router.route('/create').post(createWorkout)

router.route('/getCurrentWorkout').post(currentWorkout)

router.route('/doneWorkout').post(completedWorkout)

router.route('/getUser').post(getUserProfile)

router.route('/PastRecord').post(getRecord)

export default router;