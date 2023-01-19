export const HttpStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

export type HttpStatusType = keyof typeof HttpStatus;
