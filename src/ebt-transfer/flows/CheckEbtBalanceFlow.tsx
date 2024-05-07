import React, { type ReactNode, useMemo } from 'react';

import BalanceCheck from 'src/ebt-transfer/components/BalanceCheck';
import { RealEbtBalanceContext } from 'src/ebt-transfer/context';
import { EbtTransferEnvironment } from 'src/ebt-transfer/types';

interface Props {
  environment: EbtTransferEnvironment
  organizationId: string
  transferToken: string
  onExit: () => void
  onResult: (balance?: string, error?: string) => void
}

function CheckEbtBalanceFlow(props: Props): ReactNode {
  const {
    environment, organizationId, transferToken, onExit, onResult,
  } = props;
  const context = useMemo(() => ({
    appContext: {
      organizationId,
      env: environment === EbtTransferEnvironment.Production
        ? EbtTransferEnvironment.Production
        : EbtTransferEnvironment.Sandbox,
    },
    transferToken: transferToken ?? '',
    exitCallback: onExit,
    onResult,
  }), [organizationId, environment, transferToken, onExit, onResult]);

  return (
    <RealEbtBalanceContext.Provider value={context}>
      <BalanceCheck />
    </RealEbtBalanceContext.Provider>
  );
}

export default CheckEbtBalanceFlow;
