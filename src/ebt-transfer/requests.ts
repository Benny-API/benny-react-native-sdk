import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

import { EbtBalanceLinkFlowEnvironment as EbtTransferEnvironment } from '@ebt-balance/components/EbtBalanceLinkFlow/EbtBalanceLinkFlow';

import {
  type AppContext,
  type EbtBalanceContext,
  type EbtTransferContext,
  type LinkEbtContext,
} from './context';
import {
  type CheckBalanceRequest,
  type CheckBalanceResponse,
  type EbtTransferApiError,
  type EbtTransferRequest,
  type EbtTransferResponse,
  type ExchangeLinkTokenRequest,
  type ExchangeLinkTokenResponse,
} from './types';

const environmentUrls: Record<string, string> = {
  [EbtTransferEnvironment.Sandbox]: 'https://api-staging.bennyapi.com/v1/ebt/transfer',
  [EbtTransferEnvironment.Production]: 'https://api-production.bennyapi.com/v1/ebt/transfer',
};
const createAxiosInstance = (ctx: AppContext): AxiosInstance => axios.create({
  baseURL: environmentUrls[ctx.env],
  timeout: 1000,
  headers: {
    'benny-organization': ctx.organizationId,
  },
});

export const exchangeLinkToken = async (
  ctx: LinkEbtContext,
  accountNumber: string,
  pin: string,
): Promise<AxiosResponse<ExchangeLinkTokenResponse, EbtTransferApiError>> => {
  const instance = createAxiosInstance(ctx.appContext);
  const request: ExchangeLinkTokenRequest = {
    temporaryLink: ctx.temporaryLink,
    accountNumber,
    pin,
  };
  return instance.post<ExchangeLinkTokenResponse>(
    '/link/exchange',
    request,
  );
};

export const checkBalance = async (
  ctx: EbtBalanceContext,
  pin: string,
): Promise<AxiosResponse<CheckBalanceResponse, EbtTransferApiError>> => {
  const instance = createAxiosInstance(ctx.appContext);
  const request: CheckBalanceRequest = {
    transferToken: ctx.transferToken,
    pin,
  };
  return instance.post<CheckBalanceResponse>('/check-balance', request);
};

export const approveTransfer = async (
  ctx: EbtTransferContext,
  pin: string,
): Promise<AxiosResponse<EbtTransferResponse, EbtTransferApiError>> => {
  const instance = createAxiosInstance(ctx.appContext);
  const request: EbtTransferRequest = {
    organizationId: ctx.appContext.organizationId,
    idempotencyKey: ctx.idempotencyKey,
    amount: ctx.amount,
    transferToken: ctx.transferToken,
    pin,
  };
  return instance.post<EbtTransferResponse>('', request);
};
