import * as React from 'react';
import { type ReactNode, useMemo } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PanEntry from 'src/ebt-transfer/components/PanEntry';
import PinEntry from 'src/ebt-transfer/components/PinEntry';
import { RealLinkEbtContext } from 'src/ebt-transfer/context';
import { type RootStackParamList } from 'src/ebt-transfer/types';
import { EbtTransferEnvironment } from 'src/ebt-transfer/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  environment: EbtTransferEnvironment
  organizationId: string
  temporaryLink: string
  onExit: () => void
  onLinkResult: (transferToken?: string, expiration?: string, error?: string) => void
}

function EbtTransferLinkCardFlow(props: Props): ReactNode {
  const {
    environment, organizationId, temporaryLink, onExit, onLinkResult,
  } = props;
  const context = useMemo(() => ({
    appContext: {
      organizationId,
      env: environment === EbtTransferEnvironment.Production
        ? EbtTransferEnvironment.Production
        : EbtTransferEnvironment.Sandbox,
    },
    temporaryLink: temporaryLink ?? '',
    exitCallback: onExit,
    onLinkResult,
  }), [organizationId, environment, temporaryLink, onExit, onLinkResult]);
  return (
    <RealLinkEbtContext.Provider
      value={context}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="PanEntry"
        >
          <Stack.Screen name="PanEntry" component={PanEntry} />
          <Stack.Screen
            name="PinEntry"
            component={PinEntry}
            initialParams={{ cardNumber: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealLinkEbtContext.Provider>
  );
}

export default EbtTransferLinkCardFlow;
