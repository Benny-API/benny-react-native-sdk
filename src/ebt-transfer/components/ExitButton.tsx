import React, { type ReactNode } from 'react';

import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onExit?: () => void
}

export default function ExitButton(props: Props): ReactNode {
  const { onExit } = props;
  return (
    <TouchableOpacity
      style={{
        marginLeft: 'auto',
        marginRight: 21,
      }}
      onPress={onExit}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#EEE',
        }}
      >
        <Icon
          name="close"
          size={24}
          color="#000"
          style={{
            textAlign: 'center',
            lineHeight: 36,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
