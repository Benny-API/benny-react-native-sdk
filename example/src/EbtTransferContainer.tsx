/* eslint-disable no-console */
import * as React from 'react';
import type { ReactNode } from 'react';

import { EbtTransferEnvironment, LinkEbtCardFlow } from '@bennyapi/react-native-sdk';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'gray',
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default function EbtTransferContainer(): ReactNode {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  // Open the bottom sheet
  const openAtSnapPoint = (index: number): void => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#EEE', justifyContent: 'center' }}>
      <Button title="Open Benny SDK" onPress={() => { openAtSnapPoint(1); }} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['1%', '65%', '90%']}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoiding}
          >
            <LinkEbtCardFlow
              environment={EbtTransferEnvironment.Sandbox}
              organizationId="org_2bbnQ3ZTSLm86mwfkTQEmwKqr0A"
              temporaryLink="link_d28yi052ba8n53a4a9fzr3pz"
              onExit={() => { bottomSheetRef.current?.close(); }}
              onLinkResult={(transferToken?: string, expiration?: string, error?: string) => {
                if (transferToken !== null) console.log(transferToken);
                if (expiration !== null) console.log(expiration);
                if (error !== null) console.log(error);
              }}
            />
            {/* <EbtTransferFlow
          environment={EbtTransferEnvironment.Sandbox}
          organizationId="org_2bbnQ3ZTSLm86mwfkTQEmwKqr0A"
          transferToken="transfer_pbvckvg2ry35715os5q376rw"
          onExit={() => {}}
          amount={100}
          idempotencyKey="idempotency"
          onSuccess={() => {
            console.log('success');
          }}
        /> */}
            {/* <EbtBalanceFlow
          environment={EbtTransferEnvironment.Sandbox}
          organizationId="org_2bbnQ3ZTSLm86mwfkTQEmwKqr0A"
          transferToken="transfer_pbvckvg2ry35715os5q376rw"
          onExit={() => {}}
          onSuccess={(balance: string) => {
            console.log(balance);
          }} /> */}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
