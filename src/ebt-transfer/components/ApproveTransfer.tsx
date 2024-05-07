import React, { type ReactNode } from 'react';

import { RealEbtTransferContext } from 'src/ebt-transfer/context';
import { approveTransfer } from 'src/ebt-transfer/requests';
import { isEbtTransferApiError, isIrreconcilableError } from 'src/ebt-transfer/util';

import BaseEntry from './BaseEntry';
import Button from './Button';

function ApproveTransfer(): ReactNode {
  const [pin, setPin] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [invalidMessage, setInvalidMessage] = React.useState('');

  const ctx = React.useContext(RealEbtTransferContext);
  const handleApproveTransfer = async (): Promise<void> => {
    try {
      await approveTransfer(ctx, pin);
      ctx.onResult();
    } catch (error) {
      if (isEbtTransferApiError(error)) {
        if (isIrreconcilableError(error)) {
          ctx.onResult(error.code.toString());
          return;
        }
        setInvalidMessage(error.message);
        setIsInvalid(true);
        return;
      }
      ctx.onResult('An unknown error occurred');
    }
  };

  return (
    <BaseEntry
      isPin
      isInvalid={isInvalid}
      invalidMessage={invalidMessage}
      header="Approve transfer"
      subHeader="Enter your EBT card PIN"
      textInput={pin}
      setTextInput={setPin}
      buttonProp={(
        <Button
          title="Transfer"
          isDisabled={pin.length !== 4}
          onPress={async (): Promise<void> => { await handleApproveTransfer(); }}
        />
      )}
    />
  );
}

export default ApproveTransfer;
