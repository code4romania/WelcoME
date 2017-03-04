import React from 'react'
import { ListItem } from 'material-ui/List'
import './User.css'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import ContentAdd from 'material-ui/svg-icons/content/add'

const User = (props) => <ListItem className={props.owner ? 'user-owner' : props.admin ? 'user-admin' : props.volunteer ? 'user-volunteer' : ''} primaryText={
  <div><b>{props.firstName} {props.lastName}</b> <span>{props.email}</span></div>
  } rightIconButton={(!props.owner && props.volunteer)
     ? <FloatingActionButton onClick={props.admin ? props.offAdmin : props.onAdmin} mini secondary={props.admin} title={props.admin ? 'Remove admin' : 'Add admin'}>
       {props.admin ? <ContentRemove /> : <ContentAdd />}
     </FloatingActionButton> : null} />

export default User
