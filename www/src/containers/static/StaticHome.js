import React from 'react';
import { connect } from '../../rxdux';

//import * as Actions from '../../actions';

import '../../styles/app.css';

// TODO: remove the gifs and search from here
class StaticHome extends React.Component {
  render() {
    return (
      <div>
        Static App
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
    authenticated: state.auth.authenticated,
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif,
  };
};


export default connect(mapStateToProps)(StaticHome);
