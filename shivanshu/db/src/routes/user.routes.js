import {Router} from 'express';
import { logoutUser,loginUser,registerUser, refreshAccessToken, changeCurrentPassword, 
    getCurrentUser, UpdateAccountDetails } from "../controllers/donorRegistration.controller.js";
import { logoutBloodBank,loginBloodBank,registerBloodBank, refreshAccessTokenBB, changeCurrentPasswordBB, 
    getCurrentUserBB } from "../controllers/bloodBankRegistration.controller.js";
    import { registerHospital,loginHospital,logoutHospital, refreshAccessTokenHs,getCurrentUserHs} from "../controllers/hospitalRegistration.controller.js";
    import {upload} from '../middlewares/multer.middleware.js';
    import { verifyJWT } from '../middlewares/auth.middleware.js';
    
const router = Router()

router.route("/donorRegistration").post(registerUser)

router.route("/donorLogin").post(loginUser)
router.route("/bloodBankRegistration").post(registerBloodBank)
router.route("/bloodBankLogin").post(loginBloodBank)
router.route("/hospitalRegistration").post(registerHospital)
router.route("/hospitalLogin").post(loginHospital)

//secure route
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("update-account").patch(verifyJWT, UpdateAccountDetails)



export default router;