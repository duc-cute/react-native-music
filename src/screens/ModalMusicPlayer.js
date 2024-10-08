import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, device, func, gStyle, images } from '../constants';

// components
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';

// context
import Context from '../context';

function ModalMusicPlayer(props) {
  // get main app state
  const { currentSongData, listFavorites, updateState } =
    React.useContext(Context);

  // local state
  const [paused, setPaused] = React.useState(true);

  const { navigation } = props;

  // ui state
  const favoriteColor = listFavorites?.some(
    (el) => el?.title === currentSongData?.title
  )
    ? colors.brandPrimary
    : colors.white;
  const favoriteIcon = listFavorites?.some(
    (el) => el?.title === currentSongData?.title
  )
    ? 'heart'
    : 'heart-o';
  const iconPlay = paused ? 'play-circle' : 'pause-circle';
  const timePast = func.formatTime(0);
  const timeLeft = func.formatTime(currentSongData.length);
  // console.log('currentSongData', currentSongData);
  return (
    <View style={gStyle.container}>
      <ModalHeader
        left={<Feather color={colors.greyLight} name="chevron-down" />}
        leftPress={() => navigation.goBack(null)}
        right={<Feather color={colors.greyLight} name="more-horizontal" />}
        text={currentSongData?.album}
      />

      <View style={gStyle.p3}>
        <Image
          source={
            currentSongData?.rating
              ? { uri: currentSongData?.image }
              : images[currentSongData?.image]
          }
          style={styles.image}
        />

        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
              {currentSongData?.title}
            </Text>
            <Text style={styles.artist}>{currentSongData?.artist}</Text>
          </View>
          <View style={styles.containerFavorite}>
            <TouchIcon
              icon={<FontAwesome color={favoriteColor} name={favoriteIcon} />}
              onPress={() => {
                if (
                  listFavorites?.some(
                    (el) => el?.title === currentSongData?.title
                  )
                ) {
                  updateState(
                    'listFavorites',
                    listFavorites?.filter(
                      (el) => el?.title !== currentSongData?.title
                    )
                  );
                } else {
                  updateState('listFavorites', [
                    ...listFavorites,
                    ...currentSongData
                    // {
                    //   title: currentSongData?.title,
                    //   length: currentSongData?.length
                    // }
                  ]);
                }
              }}
            />
          </View>
        </View>

        <View style={styles.containerVolume}>
          <Slider
            minimumValue={0}
            maximumValue={currentSongData?.length}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.grey3}
          />
          <View style={styles.containerTime}>
            <Text style={styles.time}>{timePast}</Text>
            <Text style={styles.time}>{`-${timeLeft}`}</Text>
          </View>
        </View>

        <View style={styles.containerControls}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="shuffle" />}
            onPress={() => null}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-backward" />}
              iconSize={32}
              onPress={() => {
                const currentIndex = listFavorites.findIndex(
                  (song) => song.title === currentSongData?.title
                );

                const prevSong =
                  currentIndex !== -1 && currentIndex > 0
                    ? listFavorites[currentIndex - 1]
                    : listFavorites[listFavorites?.length - 1]; // Nếu là bài hát cuối cùng, nextSong sẽ là null
                updateState('currentSongData', { ...prevSong, length: 312 });
              }}
            />
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<FontAwesome color={colors.white} name={iconPlay} />}
                iconSize={64}
                onPress={() => setPaused(!paused)}
              />
            </View>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-forward" />}
              iconSize={32}
              onPress={() => {
                const currentIndex = listFavorites.findIndex(
                  (song) => song.title === currentSongData?.title
                );

                const nextSong =
                  currentIndex !== -1 &&
                  currentIndex + 1 < listFavorites?.length
                    ? listFavorites[currentIndex + 1]
                    : listFavorites[0]; // Nếu là bài hát cuối cùng, nextSong sẽ là null
                updateState('currentSongData', { ...nextSong, length: 312 });
              }}
            />
          </View>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="repeat" />}
            onPress={() => null}
          />
        </View>

        <View style={styles.containerBottom}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="speaker" />}
            onPress={() => null}
          />
          <TouchIcon
            icon={
              <MaterialIcons color={colors.greyLight} name="playlist-play" />
            }
            onPress={() => null}
          />
        </View>
      </View>
    </View>
  );
}

ModalMusicPlayer.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  image: {
    height: device.width - 48,
    marginVertical: device.iPhoneNotch ? 36 : 8,
    width: device.width - 48
  },
  containerDetails: {
    marginBottom: 16
  },
  containerSong: {
    flex: 6
  },
  song: {
    ...gStyle.textSpotifyBold24,
    color: colors.white
  },
  artist: {
    ...gStyle.textSpotify18,
    color: colors.greyInactive
  },
  containerFavorite: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace
  },
  time: {
    ...gStyle.textSpotify10,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : 8
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : 8
  }
});

export default ModalMusicPlayer;
