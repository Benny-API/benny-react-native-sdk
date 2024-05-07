import React, { type ReactNode } from 'react';

import { RealLinkEbtContext } from 'src/ebt-transfer/context';
import { type StackNavigation } from 'src/ebt-transfer/types';

import BaseEntry from './BaseEntry';
import Button from './Button';

interface Props {
  navigation: StackNavigation
}

function PanEntry(props: Props): ReactNode {
  const { navigation } = props;
  const [cardNumber, setCardNumber] = React.useState('');
  const ctx = React.useContext(RealLinkEbtContext);
  const formatCardNumber = (text: string): string => {
    let newText = text;
    if (newText.length > 19) {
      return newText.replace(/\D/g, '');
    }
    // Remove all non-digits and then add space after every 4 digits
    if (newText.length <= 16) {
      newText = text.replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }
    // Remove the trailing space if any
    if (newText.endsWith(' ')) {
      newText = newText.slice(0, -1);
    }
    // Trim the string to a max length of 19, including spaces
    if (newText.length > 19) {
      newText = newText.slice(0, 19);
      // Ensure we don't end with a space after trimming
      if (newText.endsWith(' ')) {
        newText = newText.slice(0, -1);
      }
    }
    return newText;
  };

  const handleCardNumberChange = (text: string): void => {
    setCardNumber(formatCardNumber(text));
  };

  return (
    <BaseEntry
      header="Enter card number"
      subHeader="Enter your EBT card number"
      textInput={cardNumber}
      setTextInput={handleCardNumberChange}
      buttonProp={(
        <Button
          title="Next"
          isDisabled={cardNumber.replace(/\D/g, '').length < 16}
          onPress={async () => {
            navigation.navigate('PinEntry', { cardNumber });
          }}
        />
      )}
      onExit={ctx.exitCallback}
    />
  );
}

export default PanEntry;
