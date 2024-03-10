import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';

import {
  BackHandler, Linking, Platform, StyleSheet,
} from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';

import type { EbtBalanceWebAppMessage } from '@ebt-balance/types/ebtBalanceFlowMessage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BASE_PRODUCTION_URL = 'https://ebtbalance.bennyapi.com';
const BASE_SANDBOX_URL = 'https://ebtbalance-sandbox.bennyapi.com';

export enum EbtBalanceFlowEnvironment {
  Production = 'PRODUCTION',
  Sandbox = 'SANDBOX',
}

interface EbtBalanceFlowProps {
  /**
   * Your organization ID. Prefixed with "org_".
   */
  organizationId: string;
  /**
   * The temporary link ID required to authenticate
   * the flow. This is obtained from your server.
   */
  temporaryLinkId: string;
  /**
   * Invoked when the applicant wants to exit the flow.
   */
  onExit: () => void;
  /**
   * Invoked when an EBT account was successfully linked.
   *
   * @param linkToken the long living link token that should
   * be stored by your server to later fetch balance and
   * transaction data.
   */
  onLinkSuccess: (linkToken: string) => void;

  /**
   * The environment of "Production", the default,
   * or "Sandbox" for developer usage.
   */
  environment?: EbtBalanceFlowEnvironment;
}

export function EbtBalanceFlow(props: EbtBalanceFlowProps) {
  const {
    organizationId,
    temporaryLinkId,
    onExit,
    onLinkSuccess,
    environment = EbtBalanceFlowEnvironment.Production,
  } = props;

  const url = useMemo(
    () => {
      const baseUrl = environment === EbtBalanceFlowEnvironment.Production
        ? BASE_PRODUCTION_URL : BASE_SANDBOX_URL;
      return `${baseUrl}?organizationId=${organizationId}&temporaryLinkId=${temporaryLinkId}`;
    },
    [organizationId, environment, temporaryLinkId],
  );

  const webViewRef = useRef<WebView>(null);
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
    return undefined;
  }, []);

  const handleOnMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const { data } = event.nativeEvent;
      const message = JSON.parse(data) as unknown as EbtBalanceWebAppMessage;
      switch (message.type) {
        case 'CopyToClipboard':
          break;
        case 'Exit':
          onExit();
          break;
        case 'LinkSuccess':
          onLinkSuccess?.(message.linkToken);
          break;
        case 'OpenUrlExternally':
          void Linking.openURL(message.url);
          break;
        default:
        // Not yet handled.
      }
    },
    [onLinkSuccess, onExit],
  );

  return (
    <WebView
      allowsBackForwardNavigationGestures={false}
      domStorageEnabled
      hideKeyboardAccessoryView
      javaScriptEnabled
      onMessage={handleOnMessage}
      ref={webViewRef}
      scrollEnabled={false}
      source={{ uri: url }}
      style={styles.container}
      setBuiltInZoomControls={false}
    />
  );
}
