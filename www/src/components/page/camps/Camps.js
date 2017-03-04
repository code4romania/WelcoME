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
        ? <FloatingActionButton onClick={() => handlers.addEmptyCamp()} mini style={style} title='Add camp'>
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
            }}
            hasRemove={!!owner} {...camp} />)}
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
