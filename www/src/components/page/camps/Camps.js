import React, { PropTypes} from 'react'
import {List} from 'material-ui/List'
import {Card, CardActions, CardText} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import CampForm from '../../forms/campforms/CampForm'
import Camp from './Camp'
import User from './User'
import Divider from 'material-ui/Divider'

import './Camps.css'

const Camps = (props, {store, handlers}) => {

  const { selectedCamp } = store.camps;

  const camps = Object
    .keys(store.camps.camps)
    .map(cid => ({ cid, ...store.camps.camps[cid] }));

  const users = Object
    .keys(store.camps.userList)
    .map(uid => ({ uid, ...store.camps.users[uid] }));

  const renderAddCamp = () => {
    return (
      <FloatingActionButton
        title='Add camp'
        className="floatingActionButton"
        onClick={() => handlers.addEmptyCamp()}
        mini>
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  const renderCampList = (camps) => {
    return camps.map(
      camp =>
        <Camp
          key={camp.cid}
          activeCamp={selectedCamp === camp.cid}
          onDeleteCamp={() => handlers.removeCamp(camp.cid)}
          onSelectCamp={() => {
            handlers.changeFields({
              cid: camp.cid,
              name: camp.name
            });
            handlers.selectCamp(camp.cid);
          }}
          onDeselectCamp={() => {
            handlers.clearFields();
            handlers.selectCamp();
          }}
          hasRemove={camp.cid !== 'default'}
          {...camp} />
    );
  }

  const renderCampMembers = () => {
    if (!selectedCamp || !users.length) {
      return null;
    }

    return (
      <div>
        <Divider />
        <List>
          {users.map(user => <User key={user.uid} {...user}
            onAdmin={() => handlers.makeAdmin(user.uid, selectedCamp)}
            offAdmin={() => handlers.removeAdmin(user.uid, selectedCamp)}
          />)}
        </List>
      </div>
    );
  }

  const renderCampEditForm = () => {
    return selectedCamp
      ? <div>
          <Divider />
          <CampForm />
        </div>
      : null;
  }

  return (
    <Card>
      <CardActions>
        {renderAddCamp()}
      </CardActions>
      <CardText>
        <List>
          {renderCampList(camps)}
        </List>
        {renderCampMembers()}
        {renderCampEditForm()}
      </CardText>
    </Card>
  )
}

Camps.contextTypes = {
  store: PropTypes.object.isRequired,
  handlers: PropTypes.object.isRequired
}

export default Camps
