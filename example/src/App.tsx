import * as React from 'react';

import { EbtBalanceLinkFlow, EbtBalanceLinkFlowEnvironment } from '@bennyapi/react-native-sdk';
import {
  Alert, KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export function EbtBalanceLinkFlowContainer() {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, paddingTop: insets.top }}>
      <EbtBalanceLinkFlow
        organizationId="org_wup29bz683g8habsxvazvyz1"
        temporaryLink="temp_clr0vujq9000108l66odc7fxv"
        onExit={() => Alert.alert('onExit called')}
        onLinkSuccess={(linkToken) => Alert.alert(`onLinkSuccess called ${linkToken}`)}
        environment={EbtBalanceLinkFlowEnvironment.Sandbox}
      />
    </KeyboardAvoidingView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <EbtBalanceLinkFlowContainer />
    </SafeAreaProvider>
  );
}
