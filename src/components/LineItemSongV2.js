import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, gStyle } from '../constants';
import Context from '../context';


function LineItemSongV2({ active, downloaded, onPress, songData ,index}) {
  const activeColor = active ? colors.brandPrimary : colors.white;
   // get main app state
   const { currentSongData, showMusicBar, updateState,listFavorites } =
   React.useContext(Context);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        onPress={() => onPress(songData)}
        style={gStyle.flex5}
      >
        <Text style={[styles.title, { color: activeColor }]}>
          {songData.title}
        </Text>
        <View style={gStyle.flexRow}>
          {downloaded && (
            <View style={styles.circleDownloaded}>
              <Ionicons color={colors.blackBg} name="arrow-down" size={14} />
            </View>
          )}
          <Text style={styles.artist}>{songData.artist}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.containerRight}>
        <Feather color={colors.greyLight} name="minus" size={20}  onPress={() => {
              updateState('listFavorites', listFavorites?.filter((el,ind) => ind !==index ));

        }}/>
      </View>
    </View>
  );
}

LineItemSongV2.defaultProps = {
  active: false,
  downloaded: false
};

LineItemSongV2.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  songData: PropTypes.shape({
    album: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,

  // optional
  active: PropTypes.bool,
  downloaded: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  },
  title: {
    ...gStyle.textSpotify16,
    color: colors.white,
    marginBottom: 4
  },
  circleDownloaded: {
    alignItems: 'center',
    backgroundColor: colors.brandPrimary,
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    marginRight: 8,
    width: 14
  },
  artist: {
    ...gStyle.textSpotify12,
    color: colors.greyInactive
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1
  }
});

export default LineItemSongV2;
