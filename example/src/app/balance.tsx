import * as React from 'react';

import { EbtBalanceLinkFlow, EbtBalanceLinkFlowEnvironment } from '@bennyapi/react-native-sdk';
import { router } from 'expo-router';
import { Alert } from 'react-native';

import BaseView from 'example/src/components/BaseView';

export default function Page() {
  return (
    <BaseView>
      <EbtBalanceLinkFlow
        organizationId="sandboxorg_p0do4gfvhbvjvz6o2vygbybq"
        temporaryLink="temp_clr0vujq9000108l66odc7fxv"
        onExit={() => {
          Alert.alert('onExit called');
          router.replace('/');
        }}
        onLinkResult={(result) => Alert.alert(`onLinkResult called ${JSON.stringify(result)}`)}
        environment={EbtBalanceLinkFlowEnvironment.Sandbox}
      />
    </BaseView>
  );
}
