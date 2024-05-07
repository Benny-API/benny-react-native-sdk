import React from 'react';

import { EbtTransferEnvironment } from './types';

/*
 * LinkEbtContext is a context that provides the temporary link
 * and callbacks for the LinkEbtCardFlow component.
 */
export interface LinkEbtContext {
  appContext: AppContext
  temporaryLink: string
  exitCallback?: () => void
  onLinkResult: (error?: string) => void
}

/*
 * EbtBalanceContext is a context that provides the transferToken
 * and callbacks for the EbtBalanceFlow component.
 */
export interface EbtBalanceContext {
  appContext: AppContext
  transferToken: string
  exitCallback?: () => void
  onResult: (balance?: string, error?: string) => void
}

/*
 * EbtTransferContext is a context that provides the transferToken
 * and callbacks for the EbtTransferFlow component.
 */
export interface EbtTransferContext {
  appContext: AppContext
  transferToken: string
  idempotencyKey: string
  amount: number
  exitCallback?: () => void
  onResult: (error?: string) => void
}

/**
 * AppContext is a context that provides the organizationId
 * and environment for the application.
 */
export interface AppContext {
  organizationId: string
  env: EbtTransferEnvironment
}

export const RealLinkEbtContext = React.createContext({
  appContext: {
    organizationId: '',
    env: EbtTransferEnvironment.Sandbox,
  },
  temporaryLink: '',
  exitCallback: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLinkResult: (_transferToken?: string, _expiration?: string, _error?: string) => {},
});

export const RealEbtTransferContext = React.createContext({
  appContext: {
    organizationId: '',
    env: EbtTransferEnvironment.Sandbox,
  },
  idempotencyKey: '',
  amount: 0,
  transferToken: '',
  exitCallback: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResult: (_error?: string) => {},
});

export const RealEbtBalanceContext = React.createContext({
  appContext: {
    organizationId: '',
    env: EbtTransferEnvironment.Sandbox,
  },
  transferToken: '',
  exitCallback: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResult: (_balance?: string, _error?: string) => {},
});
