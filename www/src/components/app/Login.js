import React from 'react'
import Form from './Form'

const fields = [
  { key: 'email', name: 'email', label: 'Email', type: 'email' },
  { key: 'password', name: 'password', label: 'Password', type: 'password' }
]

const links = [
  { key: 'forgot', pathname: '/forgot', text: 'Forgot your password?' }
]

const Login = (props) => (
  <Form
    fields={fields}
    links={links}
    submitText='Sign Up'
    title='Sign up'
    submitHandler={props.auth.requestLogin}
    linkHandler={props.router.goToPath}
    changeFieldHandler={props.forms.changeField}
     />
)
export default Login
