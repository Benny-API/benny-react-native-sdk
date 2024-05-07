import React, { type ReactNode } from 'react';

import { View } from 'react-native';

import { RealLinkEbtContext } from 'src/ebt-transfer/context';
import { exchangeLinkToken } from 'src/ebt-transfer/requests';
import type { PinEntryRouteProp, StackNavigation } from 'src/ebt-transfer/types';
import { isEbtTransferApiError, isIrreconcilableError } from 'src/ebt-transfer/util';

import BaseEntry from './BaseEntry';
import Button from './Button';

interface Props {
  route: PinEntryRouteProp
  navigation: StackNavigation
}

function PinEntry(props: Props): ReactNode {
  const { route, navigation } = props;
  const [pin, setPin] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [invalidMessage, setInvalidMessage] = React.useState('');

  const accountNumber = route.params.cardNumber;
  const ctx = React.useContext(RealLinkEbtContext);

  const handleConfirm = async (): Promise<void> => {
    try {
      const response = await exchangeLinkToken(ctx, accountNumber, pin);
      ctx.onLinkResult(response.data.transferToken, response.data.expiration);
    } catch (error) {
      if (isEbtTransferApiError(error)) {
        if (isIrreconcilableError(error)) {
          ctx.onLinkResult(undefined, undefined, error.code.toString());
          return;
        }
        setInvalidMessage(error.message);
        setIsInvalid(true);
      } else {
        ctx.onLinkResult(undefined, undefined, 'An unknown error occurred');
      }
    }
  };

  return (
    <BaseEntry
      isPin
      isInvalid={isInvalid}
      invalidMessage={invalidMessage}
      header="Confirm PIN"
      subHeader="Enter your EBT card PIN"
      textInput={pin}
      setTextInput={(text: string) => { setPin(text); }}
      onExit={ctx.exitCallback}
      buttonProp={(
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Button
              title="Edit Card"
              onPress={async () => {
                navigation.navigate('PanEntry');
              }}
              isSecondary
            />
            <View style={{ gap: 10 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Confirm"
              isDisabled={pin.length !== 4}
              onPress={async (): Promise<void> => { await handleConfirm(); }}
            />
          </View>
        </View>
      )}
    />
  );
}

export default PinEntry;
