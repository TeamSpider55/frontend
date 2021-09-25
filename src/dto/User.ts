export interface User {
  userId: string;
  email: string;
  nickName?: string;
  familyName: string;
  middleName?: string;
  givenName: string;
  phone: string;
  address: string;
  status: 'PENDING' | 'ACTIVE';
  confirmationCode: string;
  contacts: [string];
  tags: [string];
  salt: string;
  hash: string;
  blacklistTokens: [string];
}
