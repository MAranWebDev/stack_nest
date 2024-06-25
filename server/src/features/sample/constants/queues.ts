export type SAMPLE_QUEUE = (typeof SAMPLE_QUEUE)[keyof typeof SAMPLE_QUEUE];

export const SAMPLE_QUEUE = {
  NAME: 'sample',
  TYPE_CREATE: 'create',
  TYPE_UPDATE: 'update',
  TYPE_REMOVE: 'remove',
} as const;
