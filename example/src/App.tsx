import * as React from 'react';

import { EbtBalanceLinkFlow, EbtBalanceLinkFlowEnvironment } from '@bennyapi/react-native-sdk';
import {
  Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoiding}
      >
        <EbtBalanceLinkFlow
          organizationId="org_wup29bz683g8habsxvazvyz1"
          temporaryLink="temp_clr0vujq9000108l66odc7fxv"
          onExit={() => Alert.alert('onExit called')}
          onLinkSuccess={(linkToken) => Alert.alert(`onLinkSuccess called ${linkToken}`)}
          environment={EbtBalanceLinkFlowEnvironment.Sandbox}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
