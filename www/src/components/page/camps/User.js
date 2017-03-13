import React from 'react'
import { ListItem } from 'material-ui/List'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import ContentAdd from 'material-ui/svg-icons/content/add'

import './User.css'

const User = (props) => {

  const getClassName = () => {
    return props.owner
      ? 'user-owner'
      : props.admin
        ? 'user-admin'
        : props.volunteer
          ? 'user-volunteer'
          : '';
  }

  const renderUserData = () => {
    return (
      <div>
        <b>
          {props.firstName} {props.lastName}
        </b>
        <span>
          {props.email}
        </span>
      </div>
    );
  }

  const renderRightIconButton = () => {
    const title = props.admin ? 'Remove admin' : 'Add admin';
    const addRemoveUser = props.admin ? <ContentRemove /> : <ContentAdd />;

    return !props.owner && props.volunteer
      ? <FloatingActionButton
          onClick={props.admin ? props.offAdmin : props.onAdmin}
          mini
          secondary={props.admin}
          title={title}>
          {addRemoveUser}
        </FloatingActionButton>
      : null;
  }

  return (
    <ListItem
      className={getClassName()}
      primaryText={renderUserData()}
      rightIconButton={renderRightIconButton()} />
  );
}

export default User
