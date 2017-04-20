'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const rs = require('randomstring')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const root = functions.config().gmail.root
const crypto = require('crypto')

const getHash = text => {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return hash.digest('base64')
}

const mailTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: gmailEmail,
    clientId: '578400874611-h8lfd7t3g8prfjrvba36m5srabcjqffi.apps.googleusercontent.com',
    clientSecret: gmailPassword,
    refreshToken: '1/U3veQsdoGsq0-1YTAij6eEhCG2PQwlrLObYGAna3nDg'
  }
}, {
  from: gmailEmail
})

exports.sendVerificationEmail = ({email, lang, uid}) => new Promise((resolve, reject) => {
  console.log('Sending verification email', email, lang)
  const mailOptions = {
    to: email
  }
  const code = rs.generate(20)
  const hashedEmail = getHash(email)
  mailOptions.subject = 'Verify email for WelcoME!'
  mailOptions.text = `   Hello ${email},
        Follow this link to verify your email address.
       
        ${root}/actions?mode=verifyEmail&oobCode=${code}&email=${hashedEmail}
        
        If you didn’t ask to verify this address, you can ignore this email.
        Thanks,
        Your Welcome team
  `
  admin.database().ref(`/codes/${hashedEmail}/verifyEmail`).set({code, uid})
  .then(() => mailTransport.sendMail(mailOptions))
  .then(() => {
    console.log('Email verify sent to:', email)
    mailTransport.close()
    resolve()
  }).catch(err => reject(err))
})
