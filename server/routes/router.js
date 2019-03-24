import express from 'express'
import signupCtrl from '../controller/signup'
import loginCtrl from '../controller/login'
import receivedEmailCtrl from '../controller/emails'
import unreadCtrl from '../controller/unread'
import sentEmailCtrl from '../controller/sent'
import readCtrl from '../controller/read-email'
import sendEmailCtrl from '../controller/send-email'
import authencation from '../middleware/auth'
//import deleteEmailctrl from '../controller/delete-email'
import createGroupCrtl from '../controller/create-group'
import getGroupCrtl from '../controller/get-groups'
import updateGroupCrtl from '../controller/update-group'
import deleteGroupCtrl from '../controller/delete-group'
import addMemberCtrl from '../controller/add-member'
import deleteMemberctrl from '../controller/delete-member'

const router = express.Router()

router.post('/auth/signup', signupCtrl.createAccount)
router.post('/auth/login', loginCtrl.signin)
router.get('/messages', authencation, receivedEmailCtrl.getEmails)
router.get('/messages/unread', authencation, unreadCtrl.unreadEmails)
router.get('/messages/sent', authencation, sentEmailCtrl.sentEmail)
router.get('/messages/:messageId', authencation, readCtrl.readEmail )
router.post('/messages', authencation, sendEmailCtrl.sendEmail)
//router.delete('/messages/:messageId', authencation, deleteEmailctrl.deleteEmail)
router.post('/groups', authencation, createGroupCrtl.createGroup)
router.get('/groups', authencation, getGroupCrtl.getGroups)
router.patch('/groups/:groupId', authencation, updateGroupCrtl.updateGroup)
router.delete('/groups/:groupId', authencation, deleteGroupCtrl.deleteGroup)
router.post('/groups/:groupId/users', authencation, addMemberCtrl.addMember)
router.delete('/groups/:groupId/users/:userId', authencation, deleteMemberctrl.deleteMember)

export default router