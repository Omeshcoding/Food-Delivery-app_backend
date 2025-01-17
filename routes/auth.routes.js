import { Router } from 'express'
import {authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/user.controller.js'
import {protect} from '../middleware/authMiddleware.js'
const router = Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
export default router
