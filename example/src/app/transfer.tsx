/* eslint-disable no-console */
import * as React from 'react';

import {
  EbtTransferEnvironment, EbtTransferFlow,
} from '@bennyapi/react-native-sdk';
import { router } from 'expo-router';
import uuid from 'react-native-uuid';

import BaseSheetView from 'example/src/components/BaseSheetView';

export default function Page() {
  return (
    <BaseSheetView>
      <EbtTransferFlow
        environment={EbtTransferEnvironment.Sandbox}
        organizationId="sandboxorg_p0do4gfvhbvjvz6o2vygbybq"
        transferToken="transfer_pbvckvg2ry35715os5q376rw"
        onExit={() => router.replace('/')}
        amount={100}
        idempotencyKey={uuid.v4().toString()}
        onResult={(error?: string) => {
          if (error) {
            console.log(error);
          } else {
            console.log('success');
            router.replace('/');
          }
        }}
      />
    </BaseSheetView>
  );
}
