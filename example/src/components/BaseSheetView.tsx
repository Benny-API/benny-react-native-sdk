import type { ReactNode } from 'react';
import * as React from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BaseView from './BaseView';

function BaseSheetView({ children }: { children: ReactNode }) {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  // Open the bottom sheet
  const openAtSnapPoint = (index: number): void => {
    bottomSheetRef.current?.snapToIndex(index);
  };

  return (
    <GestureHandlerRootView style={{
      flex: 1,
      backgroundColor: '#EEEEEE',
      justifyContent: 'center',
    }}
    >
      <Button
        title="Open flow"
        onPress={() => {
          openAtSnapPoint(1);
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['1%', '65%', '90%']}
      >
        <BaseView>{children}</BaseView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export default BaseSheetView;
