/* eslint-disable no-console */
import * as React from 'react';

import {
  EbtTransferBalanceFlow, EbtTransferEnvironment,
} from '@bennyapi/react-native-sdk';
import { router } from 'expo-router';

import BaseSheetView from 'example/src/components/BaseSheetView';

export default function Page() {
  return (
    <BaseSheetView>
      <EbtTransferBalanceFlow
        environment={EbtTransferEnvironment.Sandbox}
        organizationId="org_2bbnQ3ZTSLm86mwfkTQEmwKqr0A"
        transferToken="transfer_pbvckvg2ry35715os5q376rw"
        onExit={() => router.replace('/')}
        onResult={(balance?: string, error?: string) => {
          if (balance) {
            console.log(balance);
          }
          if (error) {
            console.log('error');
          }
        }}
      />
    </BaseSheetView>
  );
}
