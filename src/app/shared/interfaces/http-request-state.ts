export const HttpRequestState = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

export type HttpRequestStateType = keyof typeof HttpRequestState;
