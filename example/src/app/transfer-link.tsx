/* eslint-disable no-console */
import * as React from 'react';

import {
  EbtTransferEnvironment, EbtTransferLinkCardFlow,
} from '@bennyapi/react-native-sdk';
import { router } from 'expo-router';

import BaseSheetView from 'example/src/components/BaseSheetView';

export default function Page() {
  return (
    <BaseSheetView>
      <EbtTransferLinkCardFlow
        environment={EbtTransferEnvironment.Sandbox}
        organizationId="sandboxorg_p0do4gfvhbvjvz6o2vygbybq"
        temporaryLink="link_e1r387bplrxjcnifokcns7u3"
        onExit={() => router.replace('/')}
        onLinkResult={(transferToken?: string, expiration?: string, error?: string) => {
          if (transferToken !== null) console.log(transferToken);
          if (expiration !== null) console.log(expiration);
          if (error !== null) console.log(error);
        }}
      />
    </BaseSheetView>
  );
}
