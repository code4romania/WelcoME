import React, {Component, PropTypes} from 'react'
import LoginForm from '../../loginform/LoginForm'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
const style = {
  butt: {
    marginTop: 20,
    marginLeft: 30
  },
  circ1: {
    color: 'Red'
  }
}

const fields = [
  { name: 'firstName', label: 'First Name', type: 'input' },
  { name: 'lastName', label: 'Last Name', type: 'input' }
]

const validate = values => {
  const errors = {}
  return errors
}

class CampForm extends Component {
  componentDidMount () {
    const {handlers, store} = this.context
    const editFields = store.auth.profile && store.auth.profile.data
    handlers.changeFields(editFields)
  }

  render () {
    return <LoginForm
      fields={fields}
      submitText='Update'
      title='Edit profile'
      name='editprofile'
      validate={validate}
      submitHandler='requestEditProfile'
      />
  }
}
CampForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

const Camp = (props) => <ListItem primaryText={props.name}
  rightIconButton={props.hasRemove ? <FloatingActionButton mini secondary title='Remove camp'>
    <ContentRemove style={style.circ1} />
  </FloatingActionButton> : null} />

const User = () => <ListItem primaryText='User' rightIcon={<ActionInfo />} />

const Camps = (props, {store}) => {
  const owner = store.auth.profile && store.auth.profile.owner
  const camps = store.camps || []
  const users = []
  return (
    <Card >
      <CardActions>
        { owner
        ? <FloatingActionButton mini style={style.butt} title='Add camp'>
          <ContentAdd />
        </FloatingActionButton> : null}
      </CardActions>
      <CardText>
        <List>
          {camps.map(camp => <Camp key={camp.cid} hasRemove={!!owner} {...camp} />)}
        </List>
        <Divider />
        <List>
          {users.map(user => <User {...user} />)}
        </List>
        {owner
        ? <div><Divider />
          <CampForm />
        </div>
        : null}
      </CardText>
    </Card>
  )
}

export default Camps
