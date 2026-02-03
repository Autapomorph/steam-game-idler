import mitt from 'mitt';

export type RefreshTokenFailedReason = 'unauthorized' | 'other';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Events = {
  signedIn: undefined;
  signedOut: undefined;
};

export const eventEmitter = mitt<Events>();

export type AuthBroadcastEvent = 'signedIn' | 'signedOut';
