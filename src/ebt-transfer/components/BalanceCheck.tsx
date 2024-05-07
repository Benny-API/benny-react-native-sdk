import React, { type ReactNode } from 'react';

import { RealEbtBalanceContext } from 'src/ebt-transfer/context';
import { checkBalance } from 'src/ebt-transfer/requests';
import { isEbtTransferApiError, isIrreconcilableError } from 'src/ebt-transfer/util';

import BaseEntry from './BaseEntry';
import Button from './Button';

function BalanceCheck(): ReactNode {
  const [pin, setPin] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [invalidMessage, setInvalidMessage] = React.useState('');

  const ctx = React.useContext(RealEbtBalanceContext);
  const handleCheckBalance = async (): Promise<void> => {
    try {
      const response = await checkBalance(ctx, pin);
      ctx.onResult(response.data.balance);
    } catch (error) {
      if (isEbtTransferApiError(error)) {
        if (isIrreconcilableError(error)) {
          ctx.onResult(undefined, error.code.toString());
          return;
        }
        setInvalidMessage(error.message);
        setIsInvalid(true);
      } else {
        ctx.onResult(undefined, 'An unknown error occurred');
      }
    }
  };

  return (
    <BaseEntry
      isPin
      isInvalid={isInvalid}
      invalidMessage={invalidMessage}
      header="Check balance"
      subHeader="Enter your EBT card PIN"
      textInput={pin}
      setTextInput={setPin}
      buttonProp={(
        <Button
          title="Check Balance"
          isDisabled={pin.length !== 4}
          onPress={async () => { await handleCheckBalance(); }}
        />
      )}
    />
  );
}

export default BalanceCheck;
