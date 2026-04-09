import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Dùng icon từ Expo

const IconButton = ({ title, iconName, bgColor, textColor, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
      <FontAwesome name={iconName} size={18} color={textColor} style={styles.icon} />
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  icon: { marginRight: 8 },
  text: { fontSize: 14, fontWeight: 'bold' },
});

export default IconButton;