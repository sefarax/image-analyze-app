import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface AppButtonProps {
    onPress?: () => any;
    title?: string;
    disabled?: boolean;
    visible?: boolean;
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { onPress, title = 'Save', disabled = false, visible = true } = props;
  return (visible &&
    <Pressable style={[styles.button, disabled ? styles.disabledButton : {}]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 17,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: 'gray'
  },
  disabledText: {}
});

export default AppButton