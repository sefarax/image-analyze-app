import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface AppLabelProps {
    text: string;
    bold?: boolean;
    style;
}

const AppLabel: React.FC<AppLabelProps> = (props) => {
  const { text, style, bold = false } = props;

  return (
    <Text style={[
      bold ? styles.bold : styles.font,
      style
    ]}>{ text }</Text>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'rubik-regular'
  },
  bold: {
    fontFamily: 'rubik-bold'
  }
});

export default AppLabel