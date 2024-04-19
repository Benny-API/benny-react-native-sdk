import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';

import {
  BackHandler, Linking, Platform, StyleSheet,
} from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';

import type { EbtBalanceLinkWebAppMessage } from '@ebt-balance/types/ebtBalanceFlowMessage';
import type { LinkResult } from '@ebt-balance/types/linkResult';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BASE_PRODUCTION_URL = 'https://ebtbalance.bennyapi.com';
const BASE_SANDBOX_URL = 'https://ebtbalance-sandbox.bennyapi.com';

export enum EbtBalanceLinkFlowEnvironment {
  Production = 'PRODUCTION',
  Sandbox = 'SANDBOX',
}

interface EbtBalanceLinkFlowProps {
  /**
   * Your organization ID. Prefixed with "org_".
   */
  organizationId: string;
  /**
   * The temporary link required to authenticate
   * the flow. This is obtained from your server.
   */
  temporaryLink: string;
  /**
   * Invoked when the applicant wants to exit the flow.
   */
  onExit: () => void;

  /**
   * Invoked when an EBT account link completes.
   *
   * @param result - the {@link LinkResult} which
   * can include the long-living link token, balances,
   * and other account holder information.
   *
   */
  onLinkResult?: (result: LinkResult) => void;

  /**
   * Invoked when an EBT account was successfully linked.
   *
   * @param linkToken the long living link token that should
   * be stored by your server to later fetch balance and
   * transaction data.
   *
   * @deprecated - replaced by {@link onLinkResult} and
   * to be removed in a future release.
   */
  onLinkSuccess?: (linkToken: string) => void;

  /**
   * The environment of "Production", the default,
   * or "Sandbox" for developer usage.
   */
  environment?: EbtBalanceLinkFlowEnvironment;
}

export function EbtBalanceLinkFlow(props: EbtBalanceLinkFlowProps) {
  const {
    organizationId,
    temporaryLink,
    onExit,
    onLinkResult,
    onLinkSuccess,
    environment = EbtBalanceLinkFlowEnvironment.Production,
  } = props;

  const url = useMemo(
    () => {
      const baseUrl = environment === EbtBalanceLinkFlowEnvironment.Production
        ? BASE_PRODUCTION_URL : BASE_SANDBOX_URL;
      return `${baseUrl}?organizationId=${organizationId}&temporaryLink=${temporaryLink}`;
    },
    [organizationId, environment, temporaryLink],
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
      const message = JSON.parse(data) as unknown as EbtBalanceLinkWebAppMessage;
      switch (message.type) {
        case 'CopyToClipboard':
          break;
        case 'Exit':
          onExit();
          break;
        case 'LinkResult':
          onLinkResult?.(message.result);
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
    [onLinkSuccess, onLinkResult, onExit],
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
