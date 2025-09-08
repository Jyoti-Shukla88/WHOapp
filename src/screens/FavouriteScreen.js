import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Share,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavourite } from '../features/favouritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FavouriteScreen({ navigation }) {
  const { items: favourites } = useSelector(state => state.favourites);
  const dispatch = useDispatch();

  const handleShare = async country => {
    try {
      await Share.share({
        message: `Check out ${country.name} (${country.region})`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  // Build flag URL from alpha-2 code (like "AL", "AR")
  const getFlagUrl = alpha2 =>
    `https://flagcdn.com/w40/${alpha2.toLowerCase()}.png`;

  return (
    <ImageBackground
      source={require('../../assets/background.gif')}
      style={styles.bg}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image
            source={require('../../assets/goBack.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Favourites</Text>
      </View>

      {/* Empty state */}
      {!favourites.length ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No favourites yet</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.code} 
          contentContainerStyle={{ padding: 20, paddingTop: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('CountryProfile', {
                  countryCode: item.code,
                })
              }
            >
              {/* Flag + Name + Region */}
              <View style={styles.info}>
                {item.flag ? (
                  <Image
                    source={{ uri: getFlagUrl(item.flag) }}
                    style={styles.flag}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.flag, { backgroundColor: '#ccc' }]} /> 
                )}
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardRegion}>{item.region}</Text>
                </View>
              </View>

              {/* Action buttons */}
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleShare(item)}
                  style={styles.iconBtn}
                >
                  <Icon name="share-social-outline" size={22} color="#003566" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(removeFavourite(item.code))}
                  style={styles.iconBtn}
                >
                  <Icon name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, resizeMode: 'cover' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  backBtn: { marginRight: 10 },
  backIcon: { width: 28, height: 28 },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 38,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    marginBottom: 12,
  },
  info: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#444444ff' },
  cardRegion: { fontSize: 14, color: '#1d1d1dff' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { marginLeft: 12 },
});
