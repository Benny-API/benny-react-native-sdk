import React, { type ReactNode } from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 56,
    marginRight: 15,
    marginLeft: 15,
    padding: 15,
    borderRadius: 10,
  },
  primary: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  secondary: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
  },
});

export enum ButtonType {
  primary,
  secondary,
}

interface Props {
  title: string
  isDisabled?: boolean
  onPress?: () => Promise<void>
  isSecondary?: boolean
}

export default function Button(props: Props): ReactNode {
  const {
    title, isDisabled, onPress, isSecondary,
  } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        (isDisabled === true) ? styles.buttonDisabled : null,
        (isSecondary === true) ? styles.secondary : null,
      ]}
    >
      <Text
        style={{
          color: (isSecondary === true) ? 'black' : 'white',
          fontSize: 16,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
