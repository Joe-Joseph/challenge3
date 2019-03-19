import express from 'express'
import signupCtrl from '../controller/signup'
import loginCtrl from '../controller/login'
import receivedEmailCtrl from '../controller/emails'
import unreadCtrl from '../controller/unread'
import sentEmailCtrl from '../controller/sent'
// import draftCtrl from '../controllers/draft'
import sendEmailCtrl from '../controller/send-email'
import authencation from '../middleware/auth'

const router = express.Router()

router.post('/auth/signup', signupCtrl.createAccount)
router.post('/auth/login', loginCtrl.signin)
router.get('/messages', authencation, receivedEmailCtrl.getEmails)
router.get('/messages/unread', authencation, unreadCtrl.unreadEmails)
router.get('/messages/sent', authencation, sentEmailCtrl.sentEmail)
// router.get('/messages/draft', draftCtrl)
router.post('/messages', authencation, sendEmailCtrl.sendEmail)

export default router