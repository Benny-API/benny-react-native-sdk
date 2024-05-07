import { type NavigationProp, type ParamListBase, type RouteProp } from '@react-navigation/native';

import { EbtBalanceLinkFlowEnvironment } from '@ebt-balance/components/EbtBalanceLinkFlow/EbtBalanceLinkFlow';

export { EbtBalanceLinkFlowEnvironment as EbtTransferEnvironment };

export type ScreenNames = ['PanEntry', 'PinEntry'];
export interface RootStackParamList extends ParamListBase {
  PanEntry: undefined
  PinEntry: { 'cardNumber': string }
}

export type StackNavigation = NavigationProp<RootStackParamList>;
export type PinEntryRouteProp = RouteProp<RootStackParamList, 'PinEntry'>;

export interface ExchangeLinkTokenRequest {
  temporaryLink: string
  accountNumber: string
  pin: string
}

export interface ExchangeLinkTokenResponse {
  transferToken: string
  expiration: string
}

export interface CheckBalanceRequest {
  transferToken: string
  pin: string
}

export interface CheckBalanceResponse {
  balance: string
}

export interface EbtTransferRequest {
  organizationId: string
  idempotencyKey: string
  amount: number
  transferToken: string
  pin: string
}

export interface EbtTransferResponse {
  transactionId: string
  balance: string
}

export interface EbtTransferApiError {
  type: string
  code: EbtTransferApiErrorCode
  message: string
}

export enum EbtTransferApiErrorCode {
  EXISTING_IDEMPOTENCY_KEY = 'EXISTING_IDEMPOTENCY_KEY',
  EXPIRED_LINK_TOKEN = 'EXPIRED_LINK_TOKEN',
  EXPIRED_TRANSFER_TOKEN = 'EXPIRED_TRANSFER_TOKEN',
  FAILED_GETTING_RECONCILIATION_FILE = 'FAILED_GETTING_RECONCILIATION_FILE',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_ACCOUNT_SETUP = 'INVALID_ACCOUNT_SETUP',
  INVALID_CARD_INFO = 'INVALID_CARD_INFO',
  INVALID_LINK_TOKEN = 'INVALID_LINK_TOKEN',
  INVALID_ORGANIZATION = 'INVALID_ORGANIZATION',
  INVALID_RECONCILIATION_ID = 'INVALID_RECONCILIATION_ID',
  INVALID_TRANSFER_TOKEN = 'INVALID_TRANSFER_TOKEN',
  INVALID_USER_ID = 'INVALID_USER_ID',
  MAX_ATTEMPTS_EXCEEDED = 'MAX_ATTEMPTS_EXCEEDED',
  PIN_TIMEOUT = 'PIN_TIMEOUT',
  TRANSFER_FAILED = 'TRANSFER_FAILED',
  UNKNOWN = 'UNKNOWN',
}
