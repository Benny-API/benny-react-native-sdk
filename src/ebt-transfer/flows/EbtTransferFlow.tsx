import React, { type ReactNode, useMemo } from 'react';

import ApproveTransfer from 'src/ebt-transfer/components/ApproveTransfer';
import { RealEbtTransferContext } from 'src/ebt-transfer/context';
import { EbtTransferEnvironment } from 'src/ebt-transfer/types';

interface Props {
  environment: EbtTransferEnvironment
  organizationId: string
  transferToken: string
  amount: number
  idempotencyKey: string
  onExit: () => void
  onResult: (error?: string) => void
}

function EbtTransferFlow(props: Props): ReactNode {
  const {
    environment,
    organizationId,
    transferToken,
    amount,
    idempotencyKey,
    onExit,
    onResult,
  } = props;
  const context = useMemo(() => ({
    appContext: {
      organizationId,
      env: environment === EbtTransferEnvironment.Production
        ? EbtTransferEnvironment.Production
        : EbtTransferEnvironment.Sandbox,
    },
    amount,
    idempotencyKey,
    transferToken: transferToken ?? '',
    exitCallback: onExit,
    onResult,
  }), [organizationId, environment, amount, idempotencyKey, transferToken, onExit, onResult]);
  return (
    <RealEbtTransferContext.Provider value={context}>
      <ApproveTransfer />
    </RealEbtTransferContext.Provider>
  );
}

export default EbtTransferFlow;
