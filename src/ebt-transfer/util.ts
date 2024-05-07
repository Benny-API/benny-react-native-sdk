import { type EbtTransferApiError, EbtTransferApiErrorCode } from './types';

// eslint-disable-next-line max-len
export const isEbtTransferApiError = (error: any): error is EbtTransferApiError => error?.code in EbtTransferApiErrorCode;

// This should be returned server side
export const isIrreconcilableError = (error: EbtTransferApiError): boolean => {
  switch (error?.code) {
    case EbtTransferApiErrorCode.INVALID_CARD_INFO:
      return false;
    default:
      return true;
  }
};
