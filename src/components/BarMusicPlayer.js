import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';
import Context from '../context';

function BarMusicPlayer({ song }) {
  const { currentSongData, showMusicBar, updateState, listFavorites } =
    React.useContext(Context);

  const navigation = useNavigation();

  // local state
  const [paused, setPaused] = React.useState(true);

  const favoriteColor =
    listFavorites?.length > 0 &&
    listFavorites?.some((el) => el?.title === song?.title)
      ? colors.brandPrimary
      : colors.white;
  const favoriteIcon =
    listFavorites?.length > 0 &&
    listFavorites?.some((el) => el?.title === song?.title)
      ? 'heart'
      : 'heart-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('ModalMusicPlayer')}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        onPress={() => {
          if (listFavorites?.some((el) => el?.title === song?.title)) {
            updateState(
              'listFavorites',
              listFavorites?.filter((el) => el?.title !== song?.title)
            );
          } else {
            updateState('listFavorites', [
              ...listFavorites,
              { title: song?.title, length: song?.length }
            ]);
          }
        }}
        style={styles.containerIcon}
      >
        <FontAwesome color={favoriteColor} name={favoriteIcon} size={20} />
      </TouchableOpacity>

      {song && (
        <View>
          <View style={styles.containerSong}>
            <Text style={styles.title}>{`${song?.title} · `}</Text>
            <Text style={styles.artist}>{song?.artist}</Text>
          </View>
          <View style={[gStyle.flexRowCenter, gStyle.mTHalf]}>
            <FontAwesome
              color={colors.brandPrimary}
              name="bluetooth-b"
              size={14}
            />
            <Text style={styles.device}>Caleb&apos;s Beatsx</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        activeOpacity={gStyle.activeOpacity}
        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
        onPress={() => setPaused(!paused)}
        style={styles.containerIcon}
      >
        <FontAwesome color={colors.white} name={iconPlay} size={28} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

BarMusicPlayer.defaultProps = {
  song: null
};

BarMusicPlayer.propTypes = {
  // optional
  song: PropTypes.shape({
    artist: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    artist: PropTypes.string,
    image: PropTypes.string,
    album: PropTypes.string,
    rating: PropTypes.number
    // id: PropTypes.number,
  })
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: colors.grey,
    borderBottomColor: colors.blackBg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    width: '100%'
  },
  containerIcon: {
    ...gStyle.flexCenter,
    width: 50
  },
  containerSong: {
    ...gStyle.flexRowCenter,
    overflow: 'hidden',
    width: device.width - 100
  },
  title: {
    ...gStyle.textSpotify12,
    color: colors.white
  },
  artist: {
    ...gStyle.textSpotify12,
    color: colors.greyLight
  },
  device: {
    ...gStyle.textSpotify10,
    color: colors.brandPrimary,
    marginLeft: 4,
    textTransform: 'uppercase'
  }
});

export default BarMusicPlayer;
