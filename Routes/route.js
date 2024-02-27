const express=require('express')
const router=express.Router()
const {Home,SignUp,CreatePage1,sendMail,ProfiePage,Login,LoginCheck,ForgotPassword,ResetPass,TokenCheck}=require('./../Controller/Usercontroller')
const {Tracker,SavedData}=require('./../Controller/TrackerController')
router.route('/Home').get(Home)
router.route('/SignUp').get(SignUp)
router.route('/Create').post(CreatePage1)
router.route('/submitform').post(sendMail)
router.route('/Profile').post(ProfiePage)
router.route('/LoginPage').get(Login)
router.route('/LoginValidation').post(LoginCheck)
router.route('/Forgot').get(ForgotPassword)
router.route('/Reset').post(ResetPass)
router.route('/Fetch').get(Tracker).post(Tracker)
router.route('/ExitTracker').post(SavedData).get(SavedData)
module.exports=router
