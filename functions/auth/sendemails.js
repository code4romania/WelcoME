'use strict'
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const rs = require('randomstring')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const root = functions.config().gmail.root

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

exports.sendVerificationEmail = ({email, lang}) => {
  console.log('Send verification email', mailTransport, email, lang)
  const mailOptions = {
    to: email
  }
  const code = rs.generate(20)
  mailOptions.subject = 'Verify email for WelcoME!'
  mailOptions.text = `   Hello ${email},
        Follow this link to verify your email address.
        ${root}/actions?mode=verifyEmail&oobCode=${code}&email=${email}
        If you didn’t ask to verify this address, you can ignore this email.
        Thanks,
        Your Welcome team
  `
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New subscription confirmation email sent to:', email)
    mailTransport.close()
  }).catch(err => console.warn('Error sending mail', err))
}
