import * as React from 'react';

import { EbtBalanceFlow, EbtBalanceFlowEnvironment } from '@bennyapi/react-native-sdk';
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
        <EbtBalanceFlow
          organizationId="org_wup29bz683g8habsxvazvyz1"
          temporaryLinkId="temp_tbshemdbmwo7lmnqo4o2eziy"
          onExit={() => Alert.alert('onExit called')}
          onLinkSuccess={(linkToken) => Alert.alert(`onLinkSuccess called ${linkToken}`)}
          environment={EbtBalanceFlowEnvironment.Production}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
