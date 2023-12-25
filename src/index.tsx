import React, {
  useCallback, useEffect, useMemo, useRef,
} from 'react';

import {
  BackHandler, Linking, Platform, StyleSheet,
} from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';

type CopyToClipboardMessage = {
  type: 'OnCopyToClipboard';
  label: string;
  text: string;
};
type DataExchangeMessage = { type: 'OnDataExchange'; applicantDataId: string };
type ExitMessage = { type: 'OnExit' };
type OpenUrlExternally = { type: 'OpenUrlExternally', url: string };

type ReactNativeMessage =
  | ExitMessage
  | CopyToClipboardMessage
  | DataExchangeMessage
  | OpenUrlExternally;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BASE_URL = 'https://apply.bennyapi.com';

interface Props {
  /**
   * The organization ID. Prefixed with "org_".
   */
  organizationId: string;
  /**
   * Your organizations unique representation of a customer.
   */
  externalId: string;
  /**
   * Invoked when the applicant wants to exit the Benny Apply flow.
   */
  onExit: () => void;
  /**
   * Invoked when the applicant is ready for a data exchange between
   * your server and Benny API's.
   *
   * @param applicantDataId the data ID that your server should add
   * additional applicant data to.
   */
  onDataExchange?: (applicantDataId: string) => void;
}

function BennyApplyFlow(props: Props) {
  const {
    organizationId, externalId, onDataExchange, onExit,
  } = props;
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
      const message = JSON.parse(data) as unknown as ReactNativeMessage;
      switch (message.type) {
        case 'OnCopyToClipboard':
          break;
        case 'OnDataExchange':
          onDataExchange?.(message.applicantDataId);
          break;
        case 'OnExit':
          onExit();
          break;
        case 'OpenUrlExternally':
          void Linking.openURL(message.url);
          break;
        default:
          // Not yet handled.
      }
    },
    [onDataExchange, onExit],
  );

  const url = useMemo(
    () => `${BASE_URL}?$organizationId=${organizationId}&externalId=${externalId}&isWebView=true`,
    [organizationId, externalId],
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
    />
  );
}

export default BennyApplyFlow;
