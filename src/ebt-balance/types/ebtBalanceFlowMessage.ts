import type { LinkResult } from '@ebt-balance/types/linkResult';

type CopyToClipboardMessage = {
  type: 'CopyToClipboard';
  label: string;
  text: string;
};
type ExitMessage = { type: 'Exit' };

type LinkResultMessage = { type: 'LinkResult'; result: LinkResult; };

/**
 * @deprecated - replaced by {@link LinkResultMessage}
 */
type LinkSuccessMessage = { type: 'LinkSuccess'; linkToken: string };
type OpenUrlExternallyMessage = { type: 'OpenUrlExternally', url: string };

export type EbtBalanceLinkWebAppMessage =
  | ExitMessage
  | CopyToClipboardMessage
  | LinkResultMessage
  | LinkSuccessMessage
  | OpenUrlExternallyMessage;
