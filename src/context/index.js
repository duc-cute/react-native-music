import React from 'react';

export default React.createContext({
  currentSongData: {
    album: 'Swimming',
    artist: 'Mac Miller',
    image: 'swimming',
    length: 312,
    title: 'So It Goes'
  },
  isLoading: true,
  showMusicBar: true,
  listFavorites:[
    { "title": "The End", "seconds": 161 },
    { "title": "Radioactive", "seconds": 245 },
    { "title": "Pyro", "seconds": 288 },
    { "title": "Mary", "seconds": 215 },
    { "title": "The Face", "seconds": 345 },
    { "title": "The Immortals", "seconds": 250 },

]

});
