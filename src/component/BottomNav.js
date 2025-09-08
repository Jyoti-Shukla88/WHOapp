import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BottomNav() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity>
        <Icon name="menu" size={29} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="grid" size={29} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="star" size={29} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="ellipsis-horizontal" size={29} color="#003566" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0, // 👈 sticks flush to bottom
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 24 : 16, // 👈 safe area space
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 86, 179, 0.2)',
    backgroundColor: 'rgba(0, 86, 179, 0.2)',
    paddingHorizontal: 10,
  },
});
