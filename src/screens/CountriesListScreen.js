import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  View,
  SectionList,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCountriesRequest,
  setSearch,
  filterBySegment,
} from '../features/countriesSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNav from '../component/BottomNav';
import AlphabetSegmentBar from '../component/AlphabetSegmentBar'; // ✅ imported

const { width, height } = Dimensions.get('window');
const SEGMENTS = ['A...C', 'D...J', 'K...Q', 'R...Z'];

// --- Memoized Country Item for performance ---
const RenderCountryItem = memo(({ item, index, navigation }) => {
  const getFlagUrl = flagCode => {
    if (!flagCode) return null;
    return { uri: `https://flagcdn.com/w40/${flagCode.toLowerCase()}.png` };
  };

  return (
    <TouchableOpacity
      style={[styles.item, index % 2 === 0 ? styles.itemEven : styles.itemOdd]}
      onPress={() =>
        navigation.navigate('CountryProfile', { countryCode: item.iso })
      }
    >
      <View style={styles.itemLeft}>
        <Image source={getFlagUrl(item.flag)} style={styles.flag} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );
});

export default function CountriesListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { groupedCountries, loading, search, error } = useSelector(
    state => state.countries,
  );
  const [selectedSegment, setSelectedSegment] = useState('R...Z');

  useEffect(() => {
    dispatch(fetchCountriesRequest());
  }, [dispatch]);

  // --- Memoized callbacks ---
  const onSearch = useCallback(
    text => {
      if (text.trim()) setSelectedSegment(null);
      dispatch(setSearch(text));
    },
    [dispatch],
  );

  const onSegmentPress = useCallback(
    label => {
      setSelectedSegment(label);
      dispatch(filterBySegment(label));
    },
    [dispatch],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    ),
    [],
  );

  const keyExtractor = useCallback(item => item.iso, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  return (
    <ImageBackground
      source={require('../../assets/home_bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require('../../assets/goBack.png')}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Countries</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          value={search}
          onChangeText={onSearch}
          placeholder="Search"
          style={[styles.searchInput, { color: '#fff' }]}
          placeholderTextColor="#eee"
        />
      </View>

      {/* Country List */}
      <View style={styles.listContainer}>
        <SectionList
          sections={groupedCountries || []}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => (
            <RenderCountryItem
              item={item}
              index={index}
              navigation={navigation}
            />
          )}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled
          initialNumToRender={20} // performance
          maxToRenderPerBatch={20} // performance
          windowSize={21} // performance
          removeClippedSubviews={true} // performance
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </View>

      {/* Alphabet Segment Bar */}
      <AlphabetSegmentBar
        segments={SEGMENTS}
        selectedSegment={selectedSegment}
        onSegmentPress={onSegmentPress}
      />

      <BottomNav />
    </ImageBackground>
  );
}

// --- styles remain unchanged ---
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0077b6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 10 },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 28,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#ffffff51',
  },
  searchIcon: { width: 18, height: 18, marginRight: 6, tintColor: '#fff' },
  searchInput: { flex: 1, fontSize: 16 },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f0f4f8',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemEven: { backgroundColor: '#fff' },
  itemOdd: { backgroundColor: '#f8fcff' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  flag: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  name: { fontSize: 16, color: '#333' },
  alphaSegmentBar: {
    position: 'absolute',
    bottom: 82,
    left: 16,
    right: 16,
    height: 46,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  firstSegment: { borderTopLeftRadius: 30, borderBottomLeftRadius: 30 },
  lastSegment: { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
  segmentSelected: { backgroundColor: '#206f8aff' },
  segmentText: { fontSize: 14, color: '#333', fontWeight: '500' },
  segmentTextSelected: { color: '#fff', fontWeight: '700' },
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 54,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#dceeff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
