type CopyToClipboardMessage = {
  type: 'CopyToClipboard';
  label: string;
  text: string;
};
type ExitMessage = { type: 'Exit' };
type LinkSuccessMessage = { type: 'LinkSuccess'; linkToken: string };
type OpenUrlExternallyMessage = { type: 'OpenUrlExternally', url: string };

export type EbtBalanceWebAppMessage =
  | ExitMessage
  | CopyToClipboardMessage
  | LinkSuccessMessage
  | OpenUrlExternallyMessage;
