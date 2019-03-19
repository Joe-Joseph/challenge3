import express from 'express'
import signupCtrl from '../controller/signup'
// import authenticate from '../middleware/auth'
import loginCtrl from '../controller/login'
// import receivedEmailCtrl from '../controllers/receivedEmail'
// import unreadCtrl from '../controllers/unreadEmails'
// import sentEmailCtrl from '../controllers/sentEmails'
// import draftCtrl from '../controllers/draft'
// import sendEmailCtrl from '../controllers/sendEmail'

const router = express.Router()

router.post('/auth/signup', signupCtrl.createAccount)
router.post('/auth/login', loginCtrl.signin)
// router.get('/messages', receivedEmailCtrl)
// router.get('/messages/unread', unreadCtrl)
// router.get('/messages/sent', sentEmailCtrl)
// router.get('/messages/draft', draftCtrl)
// router.post('/messages', sendEmailCtrl)

export default router