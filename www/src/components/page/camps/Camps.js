import React, {Component, PropTypes} from 'react'
import LoginForm from '../../loginform/LoginForm'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import Divider from 'material-ui/Divider'
import ActionInfo from 'material-ui/svg-icons/action/info'
import './Camps.css'

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
  { name: 'name', label: 'Camp Name', type: 'input' },
  { name: 'somekey', label: 'Secret thing', type: 'input' }
]

const validate = values => {
  const errors = {}
  return errors
}

class CampForm extends Component {
  render () {
    return <LoginForm
      fields={fields}
      submitText='Update'
      title='Edit Camp'
      name='updatecamp'
      validate={validate}
      submitHandler='updateCamp'
      />
  }
}
CampForm.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

const Camp = (props) => <ListItem className={props.activeCamp} onClick={props.onSelectCamp} primaryText={`${props.cid} ${props.name} ${props.somekey ? props.somekey : ''}`}
  rightIconButton={props.hasRemove ? <FloatingActionButton onClick={props.onDeleteCamp} mini secondary title='Remove camp'>
    <ContentRemove style={style.circ1} />
  </FloatingActionButton> : null} />

const User = () => <ListItem primaryText='User' rightIcon={<ActionInfo />} />

const Camps = (props, {store, handlers}) => {
  const owner = store.auth.profile && store.auth.profile.owner
  const { selectedCamp } = store.camps
  const camps = Object.keys(store.camps.public).map(cid => ({
    cid, ...store.camps.public[cid], ...store.camps.private[cid]
  }))
  const users = []
  return (
    <Card >
      <CardActions>
        { owner
        ? <FloatingActionButton onClick={() => handlers.addEmptyCamp()} mini style={style.butt} title='Add camp'>
          <ContentAdd />
        </FloatingActionButton> : null}
      </CardActions>
      <CardText>
        <List>
          {camps.map(camp => <Camp key={camp.cid} activeCamp={selectedCamp === camp.cid ? 'activeCamp' : ''}
            onDeleteCamp={() => handlers.removeCamp(camp.cid)}
            onSelectCamp={() => {
              handlers.changeFields({
                cid: camp.cid,
                name: camp.name,
                somekey: camp.somekey
              })
              handlers.selectCamp(camp.cid)
            }}hasRemove={!!owner} {...camp} />)}
        </List>
        {selectedCamp ? <div>
          <Divider />
          <List>
            {users.map(user => <User {...user} />)}
          </List>
        </div> : null }
        {selectedCamp && owner
        ? <div><Divider />
          <CampForm />
        </div>
        : null}
      </CardText>
    </Card>
  )
}
Camps.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}
export default Camps
