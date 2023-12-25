import * as React from 'react';

import BennyApplyFlow from '@bennyapi/react-native-sdk';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BennyApplyFlow
        organizationId="org_ob6q03t0t8u9okccahyk5wsh"
        externalId="ext_123"
        onExit={() => Alert.alert('onExit called')}
        onDataExchange={() => Alert.alert('onDataExchange called')}
      />
    </SafeAreaView>
  );
}
