import * as React from 'react';
import type { ReactNode } from 'react';

import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';

import ExitButton from './ExitButton';

const styles = StyleSheet.create({
  pinInput: {
    backgroundColor: '#EEE',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    display: 'flex',
    padding: 10,
    fontSize: 18,
    marginTop: 22,
    textAlign: 'center',
    width: 181,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  panEntry: {
    backgroundColor: '#EEE',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 22,
    textAlign: 'center',
    width: 240,
  },
});

interface Props {
  header: string
  subHeader?: string
  buttonProp?: React.ReactNode
  textInput: string
  setTextInput: (text: string) => void
  isPin?: boolean
  isInvalid?: boolean
  invalidMessage?: string
  onExit?: () => void
}

function BaseEntry(props: Props): ReactNode {
  const {
    header,
    subHeader,
    buttonProp,
    textInput,
    setTextInput,
    isPin,
    isInvalid,
    invalidMessage,
    onExit,
  } = props;
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <ExitButton onExit={onExit} />
      <Text
        style={{
          fontFamily: 'Roboto',
          fontWeight: '600',
          fontSize: 22,
          textAlign: 'center',
        }}
      >
        {header}
      </Text>
      <Text
        style={{
          color: '#6C6C71',
          fontFamily: 'Roboto',
          fontSize: 16,
          fontWeight: '400',
          marginTop: 10,
          textAlign: 'center',
        }}
      >
        {subHeader}
      </Text>
      <TextInput
        style={[
          (isPin === true) ? styles.pinInput : styles.panEntry,
          (isInvalid === true) ? { borderColor: '#DA0069' } : {},
        ]}
        selectionColor="gray"
        keyboardType="number-pad"
        value={textInput}
        onChangeText={setTextInput}
        maxLength={(isPin === true) ? 4 : 20}
        secureTextEntry={isPin === true}
        placeholder={(isPin === false) ? '1234 1234 1234 1234' : ''}
      />
      {(isInvalid === true) && (
        <Text
          style={{
            marginTop: 13,
            color: '#DA0069',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '400',
          }}
        >
          {invalidMessage}
        </Text>
      )}
      {buttonProp}
    </View>
  );
}

export default BaseEntry;
