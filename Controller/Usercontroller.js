const express = require('express')
const { decreypt, SendMail } = require('./UsersFunction')
const bcrypt=require('bcrypt')
const tour = require('./../UserDB/user')
const expenseTour=require('./../UserDB/data')
const JWT=require('jsonwebtoken')
const bodyparser = require('body-parser')
let username;
let ClientEmail;
let ClintName;
let ClientPassword;
let ClientUserName;
const fs = require('fs')
const exp = require('constants')
const { LogTimings } = require('concurrently')
const { resolve } = require('path')
const { userInfo } = require('os')
const Data = require('./../UserDB/user')
const HomePage = fs.readFileSync(`${__dirname}/../index.html`, 'utf-8')
const SignUp = fs.readFileSync(`${__dirname}/../Authenticate.html`, 'utf-8')
const CreatePage1 = fs.readFileSync(`${__dirname}/../Authenticate1.html`, 'utf-8')
const Login = fs.readFileSync(`${__dirname}/../Login.html`, 'utf-8')
const ForgotPassword_Page = fs.readFileSync(`${__dirname}/../Forgot.html`, 'utf-8')


exports.Home = async (req, res) => {
    await res.end(HomePage)
}
exports.SignUp = async (req, res) => {
    await res.end(SignUp)
}
exports.Login = async (req, res) => {
    await res.end(Login)
}
exports.CreatePage1 = async (req, res) => {
    try {
        ClientEmail = req.body.UserEmail
        if (await tour.findOne({ Email: ClientEmail })) {
            res.status(404).json({
                status: 'Failed',
                Message: "Email Already Registered Try To Login"
            })
        }
       
        await res.end(CreatePage1)
    }
    catch (err) {
        console.log(err)
    }


}

// Profile Page Creation
exports.ProfiePage = async (req, res) => {
    try {
     
        const clientName = req.body.fullName;
        const clientUserName = req.body.Username;
        const clientPassword = req.body.password;
        const clientEmail = ClientEmail;
        // exports.name=ClientUserName
        req.session.username=clientUserName
        const hash_Pass = await decreypt(clientPassword)
       

        if (await tour.findOne({ Name: clientUserName })) {
            res.status(404).json({
                status: 'Failed',
                Message: 'Username is not available'
            });
        } else {
            // User Creation
            const User_Info = new tour({
                Name: clientUserName,
                Password: hash_Pass,
                Email: clientEmail
            });
            const Data_Info=await new expenseTour({
                UserName:clientUserName
            })
                
                //  const Token=CreateToken(User_Info)

            await User_Info.save()
            await Data_Info.save()
            module.exports=username
            res.redirect('/Fetch')
       

            let Message = `Dear Recipient,

            The profile page has been created for the user:
            - Name: ${clientName}
            - Username: ${clientUserName}
            - Password: ${clientPassword}

            Thank you.`

            let Subject = `Title:Thanks For Joining Us, Keep Helping Us Like This`
            // SendMail(Message, clientEmail, Subject)

        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.LoginCheck = async (req, res) => {
    const ClintName = req.body.Username;
    const ClientPassword = req.body.Password;
    const ClientEmail = req.body.email;
    let Subject = 'New Login In The Money-Manager'
    let Message = `New Login Gets Detected From This User Account`
    req.session.username=ClintName
    try {
        // Check if the user exists based on email and name
        const existingUser = await tour.findOne({ Name: ClintName, Email: ClientEmail });

        if (existingUser) {
            // User found, check the password
            const isPasswordValid = await bcrypt.compare(ClientPassword, existingUser.Password);

            if (isPasswordValid) {
                // Password is valid, user successfully logged in
                // SendMail(Message, ClientEmail, Subject)
                res.redirect('/Fetch')


            } else {
                // Password is incorrect
                console.log('Incorrect password');
                res.status(401).send('Incorrect password');
            }
        } else {
            // User not found based on email and name
            console.log('User not found');
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
};

exports.ForgotPassword = async (req, res) => {
    await res.send(ForgotPassword_Page)

}




exports.ResetPass = async (req, res) => {

    ClientUserName = req.body.Username
    ClientEmail = req.body.email
    ClientPassword = req.body.Password
  
    try {
        const hash_Pass = await decreypt(ClientPassword)

        const Message = 'Successfully Password Changed'
        const Subject = 'Request For Password Reset'
        const existingUser =
            await tour.findOneAndUpdate(
                { Name: ClientUserName, Email: ClientEmail },
                { $set: { Password: hash_Pass } }
            )
        SendMail(Message, ClientEmail, Subject)
        res.redirect('/LoginPage')

    }
    catch (err) {
        console.log(err)
    }
}






exports.sendMail = async (req, res) => {
    const workEmail = await req.body.workemail
    let Message = ` 

Introduction:
In today's dynamic world, effective money management is essential for personal well-being. Introducing  Money Manager – a powerful tool designed to revolutionize how individuals handle their finances. Discover a seamless blend of simplicity and sophistication that puts you in control of your financial destiny.

Contribute:
1. Personalized Financial Solutions:
Embark on your journey by customizing your Money Manager experience. Share your insights and preferences, contributing to the creation of personalized financial solutions that cater to individual needs.

2. User Experience Enhancement:
Participate in refining the user interface and overall user experience. Contribute ideas and solutions that make  Money Manager an intuitive and user-friendly platform for everyone, regardless of their financial expertise.

3. Community Feedback:
Share your thoughts on the platform's functionalities. As a user, your input is invaluable in shaping the Money Manager to be the go-to financial tool for people from all walks of life..`

    let Subject = `Title:  Money Manager: Empowering Your Financial Journey`
    SendMail(Message, workEmail, Subject)
    res.end(SignUp)
}

exports.TokenCheck = (req, res, next) => {
    if(!req.headers.Name){
       next()
    }
    else{
        const error=new Error("Hey You Cant Process Further")
        error.status=404
        return error
    }
};



 function CreateToken(user){
    const Payload={Id:user._id}
    const Expiry={
        expiresIn:process.env.JWE_EXPIRES_TIME
    }
        const Token=JWT.sign(Payload,process.env.JWTSECRETTOKEN,Expiry)
        return Token
}
// exports.VerifyToken=(req,res,next)=>{
//     try{
//         const Auth=req.headers['authorization']
//         const token=Auth && Auth.split(' ')[1]
//         if(token==null){
//             return new Error("Cannot Proceed Further")
//         }
//         else{
//             next()
//         }
//     }
// }