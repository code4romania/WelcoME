import React, { PropTypes} from 'react'

import {List} from 'material-ui/List'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import CampForm from './CampForm'
import Camp from './Camp'
import User from './User'
import Divider from 'material-ui/Divider'

import './Camps.css'
const style = {
  marginTop: 20,
  marginLeft: 30
}

const Camps = (props, {store, handlers}) => {
  const { selectedCamp } = store.camps
  const camps = Object.keys(store.camps.camps).map(cid => ({ cid, ...store.camps.camps[cid] }))
  const users = Object.keys(store.camps.userList).map(uid => ({ uid, ...store.camps.users[uid] }))
  return (
    <Card >
      <CardActions>
        <FloatingActionButton onClick={() => handlers.addEmptyCamp()} mini style={style} title='Add camp'>
          <ContentAdd />
        </FloatingActionButton>
      </CardActions>
      <CardText>
        <List>
          {camps.map(camp => <Camp key={camp.cid} activeCamp={selectedCamp === camp.cid}
            onDeleteCamp={() => handlers.removeCamp(camp.cid)}
            onSelectCamp={() => {
              handlers.changeFields({
                cid: camp.cid,
                name: camp.name
              })
              handlers.selectCamp(camp.cid)
            }}
            onDeselectCamp={() => {
              handlers.clearFields()
              handlers.selectCamp()
            }}
            hasRemove={camp.cid !== 'default'} {...camp} />)}
        </List>
        {selectedCamp && users.length ? <div>
          <Divider />
          <List>
            {users.map(user => <User key={user.uid} {...user}
              onAdmin={() => handlers.makeAdmin(user.uid, selectedCamp)}
              offAdmin={() => handlers.removeAdmin(user.uid, selectedCamp)}
            />)}
          </List>
        </div> : null }
        {selectedCamp
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
