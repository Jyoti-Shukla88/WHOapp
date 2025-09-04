// components/BottomNav.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BottomNav() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity>
        <Icon name="menu" size={22} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="grid" size={22} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="star" size={22} color="#003566" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="ellipsis-horizontal" size={22} color="#003566" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 54,
    borderRadius: 30,
    borderWith:1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
});
