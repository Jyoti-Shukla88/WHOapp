import React, { memo } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const AlphabetSegmentBar = ({ segments, selectedSegment, onSegmentPress }) => {
  return (
    <View style={styles.alphaSegmentBar}>
      {segments.map((label, index) => (
        <TouchableOpacity
          key={label}
          style={[
            styles.segment,
            index === 0 && styles.firstSegment,
            index === segments.length - 1 && styles.lastSegment,
            selectedSegment === label && styles.segmentSelected,
          ]}
          onPress={() => onSegmentPress(label)}
        >
          <Text
            style={[
              styles.segmentText,
              selectedSegment === label && styles.segmentTextSelected,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(AlphabetSegmentBar);

const styles = StyleSheet.create({
  alphaSegmentBar: {
    position: "absolute",
    bottom: 82,
    left: 16,
    right: 16,
    height: 46,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  firstSegment: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  lastSegment: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  segmentSelected: { backgroundColor: "#206f8aff" },
  segmentText: { fontSize: 14, color: "#333", fontWeight: "500" },
  segmentTextSelected: { color: "#fff", fontWeight: "700" },
});
