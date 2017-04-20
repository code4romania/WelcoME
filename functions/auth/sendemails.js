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
  return hash.digest('hex')
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

// TODO - email templating by name and language
const getEmailTemplate = ({email, code, hashedEmail, template}) => (({
  verifyEmail: `   Hello ${email},
        Follow this link to verify your email address.       
        ${root}/actions?mode=verifyEmail&oobCode=${code}&email=${hashedEmail}
        
        If you didn’t ask to verify this address, you can ignore this email.
        Thanks,
        Your Welcome team
  `,
  resetPassword: `   Hello ${email},
        Follow this link to reset your password.       
        ${root}/resetPassword/?oobCode=${code}&email=${hashedEmail}
        
        If you didn’t ask to reset this address, you can ignore this email.
        Thanks,
        Your Welcome team
  `
})[template])

module.exports = {
  sendResetEmail: ({ email, uid, lang }) => new Promise((resolve, reject) => {
    console.log('Sending reset email', email, lang)
    const mailOptions = {
      to: email
    }
    const code = rs.generate(20)
    const hashedEmail = getHash(email)
    mailOptions.subject = 'Reset password for WelcoME!'
    mailOptions.text = getEmailTemplate({ template: 'resetPassword', lang, email, code, hashedEmail })
    admin.database().ref(`/codes/${hashedEmail}/resetPassword`).set({code, uid, email})
      .then(() => mailTransport.sendMail(mailOptions))
      .then(() => {
        console.log('Email reset sent to:', email)
        return mailTransport.close()
      })
      .then(resolve)
      .catch(reject)
  }),

  sendVerificationEmail: ({ email, lang, uid }) => new Promise((resolve, reject) => {
    console.log('Sending verification email', email, lang)
    const mailOptions = {
      to: email
    }
    const code = rs.generate(20)
    const hashedEmail = getHash(email)
    mailOptions.subject = 'Verify email for WelcoME!'
    mailOptions.text = getEmailTemplate({ template: 'verifyEmail', lang, email, code, hashedEmail })
    admin.database().ref(`/codes/${hashedEmail}/verifyEmail`).set({code, uid, email})
      .then(() => mailTransport.sendMail(mailOptions))
      .then(() => {
        console.log('Email verify sent to:', email)
        return mailTransport.close()
      })
      .then(resolve)
      .catch(reject)
  })
}
