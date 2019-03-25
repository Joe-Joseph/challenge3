import express from 'express'
import signupCtrl from '../controller/signup'
import loginCtrl from '../controller/login'
import receivedEmailCtrl from '../controller/emails'
import unreadCtrl from '../controller/unread'
import sentEmailCtrl from '../controller/sent'
import readCtrl from '../controller/read-email'
import sendEmailCtrl from '../controller/send-email'
import authencation from '../middleware/auth'
import deleteEmailctrl from '../controller/delete-email'
import createGroupCrtl from '../controller/create-group'

const router = express.Router()

router.post('/auth/signup', signupCtrl.createAccount)
router.post('/auth/login', loginCtrl.signin)
router.get('/messages', authencation, receivedEmailCtrl.getEmails)
router.get('/messages/unread', authencation, unreadCtrl.unreadEmails)
router.get('/messages/sent', authencation, sentEmailCtrl.sentEmail)
router.get('/messages/:messageId', authencation, readCtrl.readEmail )
router.post('/messages', authencation, sendEmailCtrl.sendEmail)
router.delete('/messages/:messageId', authencation, deleteEmailctrl.deleteEmail)
router.post('/groups', authencation, createGroupCrtl.createGroup)

export default router