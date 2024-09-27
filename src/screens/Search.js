import * as React from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle } from '../constants';
import { useNavigation } from '@react-navigation/native';

// components
import PlaylistItem from '../components/PlaylistItem';
import TouchIcon from '../components/TouchIcon';

// icons
import SvgSearch from '../icons/Svg.Search';

// mock data
import browseAll from '../mockdata/searchBrowseAll.json';
import topGenres from '../mockdata/searchTopGenres.json';
import Context from '../context';

function Search() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);
  const navigation = useNavigation();

  const {
    currentSongData,
    showMusicBar,
    updateState,
    listFavorites,
    dataLibrary
  } = React.useContext(Context);

  const handleSearch = (query) => {
    if (query?.length == 0) {
      setFilteredData([]);
    }
    setSearchQuery(query);
    const filtered = dataLibrary
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.artist.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => b.rating - a.rating);
    setFilteredData(filtered);
  };

  // search start (24 horizontal padding )
  const searchStart = device.width - 48;
  const searchEnd = device.width - 88;

  const opacity = scrollY.interpolate({
    inputRange: [0, 48],
    outputRange: [searchStart, searchEnd],
    extrapolate: 'clamp'
  });

  return (
    <React.Fragment>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        style={gStyle.container}
      >
        <View style={gStyle.spacer11} />
        <View style={styles.containerSearchBar}>
          <Animated.View style={{ width: opacity }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => null}
              style={styles.searchPlaceholder}
            >
              <View style={gStyle.mR1}>
                <SvgSearch />
              </View>
              {/* <Text style={styles.searchPlaceholderText}>
                Artists, songs or podcasts
              </Text> */}
              <TextInput
                style={styles.searchPlaceholderText}
                placeholder="Artists, songs or podcasts"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </TouchableOpacity>
            {searchQuery.length > 0 &&
              filteredData &&
              filteredData?.length > 0 &&
              filteredData.map((item) => (
                <View key={item.id} style={styles.itemSearch}>
                  <TouchableOpacity
                    activeOpacity={gStyle.activeOpacity}
                    style={gStyle.flex5}
                    onPress={() => {
                      updateState('currentSongData', {
                        album: item?.album,
                        artist: item?.artist,
                        image: item?.image,
                        length: 312,
                        title: item?.title,
                        url: item?.url,
                        rating: item?.rating
                      });
                      updateState(
                        'dataLibrary',
                        dataLibrary?.map((el) => {
                          if (el?.title === item?.title) {
                            return { ...el, rating: el?.rating + 1 };
                          }
                          return el;
                        })
                      );
                      navigation.navigate('ModalMusicPlayer');
                    }}
                  >
                    <Text style={[styles.titleSearch, { color: colors.white }]}>
                      {item.title}
                    </Text>
                    <View style={gStyle.flexRow}>
                      <Text style={styles.artist}>{item.artist}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </Animated.View>
        </View>

        <Text style={styles.sectionHeading}>Your top genres</Text>
        <View style={styles.containerRow}>
          {Object.keys(topGenres).map((index) => {
            const item = topGenres[index];

            return (
              <View key={item.id} style={styles.containerColumn}>
                <PlaylistItem
                  bgColor={item.color}
                  onPress={() => null}
                  title={item.title}
                />
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionHeading}>Browse all</Text>
        <View style={styles.containerRow}>
          {Object.keys(browseAll).map((index) => {
            const item = browseAll[index];

            return (
              <View key={item.id} style={styles.containerColumn}>
                <PlaylistItem
                  bgColor={item.color}
                  onPress={() => null}
                  title={item.title}
                />
              </View>
            );
          })}
        </View>
      </Animated.ScrollView>

      <View style={styles.iconRight}>
        <TouchIcon
          icon={<FontAwesome color={colors.white} name="microphone" />}
          onPress={() => null}
        />
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  containerSearchBar: {
    ...gStyle.pH3,
    backgroundColor: colors.blackBg,
    paddingBottom: 16,
    paddingTop: device.iPhoneNotch ? 64 : 24
  },
  searchPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 16
  },
  searchPlaceholderText: {
    ...gStyle.textSpotify16,
    color: colors.blackBg
  },
  sectionHeading: {
    ...gStyle.textSpotifyBold18,
    color: colors.white,
    marginBottom: 24,
    marginLeft: 24,
    marginTop: 16
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 24
  },
  containerColumn: {
    width: '50%'
  },
  iconRight: {
    alignItems: 'center',
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: device.web ? 40 : 78,
    width: 28
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  resultItem: {
    padding: 10
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc'
  },
  resultText: {
    fontSize: 16,
    color: '#fff'
  },
  itemSearch: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  },
  titleSearch: {
    ...gStyle.textSpotify16,
    color: colors.white,
    marginBottom: 4
  },
  artist: {
    ...gStyle.textSpotify12,
    color: colors.greyInactive
  }
});

export default Search;
