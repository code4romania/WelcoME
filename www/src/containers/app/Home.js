import React from 'react';
import {connect} from '../../rxdux';

//import * as Actions from '../../actions';
import GifList from '../../components/app/gifs/GifList';
import GifModal from '../../components/app/gifs/GifModal';
import SearchBar from '../../components/app/search/SearchBar';
import '../../styles/app.css';

// TODO: remove the gifs and search from here
class Home extends React.Component {
  render() {
    return (
      <div>
        <SearchBar onTermChange={this.props.actions.requestGifs}/>

        <GifList
          gifs={this.props.gifs}
          onGifSelect={selectedGif => this
          .props
          .actions
          .openModal({selectedGif})}
          onFavoriteSelect={selectedGif => this
          .props
          .actions
          .favoriteGif({selectedGif})}
          onFavoriteDeselect={selectedGif => this
          .props
          .actions
          .unfavoriteGif({selectedGif})}
          isAuthenticated={this.props.authenticated}/>

        <GifModal
          modalIsOpen={this.props.modalIsOpen}
          selectedGif={this.props.selectedGif}
          onRequestClose={() => this.props.actions.closeModal()}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {authenticated: state.auth.authenticated, gifs: state.gifs.data, modalIsOpen: state.modal.modalIsOpen, selectedGif: state.modal.selectedGif};
};
/*
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
*/
export default connect(mapStateToProps)(Home);
