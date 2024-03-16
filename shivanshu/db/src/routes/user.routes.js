import {Router} from 'express';
import { logoutUser,loginUser,registerUser, refreshAccessToken, changeCurrentPassword, 
    getCurrentUser, UpdateAccountDetails } from "../controllers/donorRegistration.controller.js";
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router()

router.route("/donorRegistration").post(registerUser)

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("update-account").patch(verifyJWT, UpdateAccountDetails)



export default router;