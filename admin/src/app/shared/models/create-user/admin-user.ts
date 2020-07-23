export interface AdminUser {
  branchUser: boolean;
  contact: string,
  email: string,
  emailVerified: boolean;
  firstName: string,
  id: string,
  isLdapUser: boolean;
  enabled: boolean;
  lastName: string,
  password: string,
  processApproval: boolean;
  username: string,
  walletAlisCode: string
}
