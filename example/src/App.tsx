import * as React from 'react';

import { EbtBalanceLinkFlow, EbtBalanceLinkFlowEnvironment } from '@bennyapi/react-native-sdk';
import {
  Alert, KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import EbtTransferContainer from './EbtTransferContainer';

export function EbtBalanceLinkFlowContainer() {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, paddingTop: insets.top }}>
      <EbtBalanceLinkFlow
        organizationId="sandboxorg_p0do4gfvhbvjvz6o2vygbybq"
        temporaryLink="link_e1r387bplrxjcnifokcns7u3"
        onExit={() => Alert.alert('onExit called')}
        onLinkResult={(result) => Alert.alert(`onLinkResult called ${JSON.stringify(result)}`)}
        environment={EbtBalanceLinkFlowEnvironment.Sandbox}
      />
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <EbtTransferContainer />
    </SafeAreaProvider>
  );
}
