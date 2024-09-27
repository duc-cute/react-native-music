import React from 'react';
import PropTypes from 'prop-types';

// context
import Context from './index';
import dataLibrary from '../mockdata/data/library.json';

class AppState extends React.Component {
  constructor() {
    super();

    this.state = {
      currentSongData: {
        album: 'Swimming',
        url: 'https://audio.jukehost.co.uk/vTRYaTEbpaYRCxiWGgL2S91mnOuMKfLw',
        title: "Guess I'll Never Know",
        artist: 'TrackTribe',
        image: 'https://f4.bcbits.com/img/a3736661212_65',
        rating: 1,
        length: 312
      },
      isLoading: true,
      showMusicBar: true,
      listFavorites: dataLibrary,
      dataLibrary: dataLibrary
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const { children } = this.props;

    // app state
    const {
      currentSongData,
      isLoading,
      showMusicBar,
      listFavorites,
      dataLibrary
    } = this.state;

    return (
      <Context.Provider
        value={{
          currentSongData,
          isLoading,
          showMusicBar,
          listFavorites,
          dataLibrary,
          updateState: this.updateState
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

AppState.propTypes = {
  // required
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AppState;
