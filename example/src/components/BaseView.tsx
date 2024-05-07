import type { ReactNode } from 'react';
import * as React from 'react';

import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function BaseKeyboardAvoidingView({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      paddingTop: insets.top,
    }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

function BaseView({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <BaseKeyboardAvoidingView>{children}</BaseKeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

export default BaseView;
