export enum InviteType {
  DO_NOT_INVITE = 0,
  CLIENT_ADMIN = 1,
  REGULAR_USER = 2,
  ON_SITE_REPRESENTATIVE = 4,
}

export enum PreferredContactMethod {
  EMAIL = 0,
  PHONE = 1,
}

export enum Role {
  FCA_ADMIN = 'FCA_ADMIN',
  CLIENT_ADMIN = 'CLIENT_ADMIN',
  REGULAR_USER = 'REGULAR_USER',
}

export const RoleMap = {
  [Role.FCA_ADMIN]: 'FCA Admin',
  [Role.CLIENT_ADMIN]: 'Client Admin',
  [Role.REGULAR_USER]: 'Regular User',
};

export enum InvitationStatus {
  ACCEPTED = 0,
  PENDING = 1,
  EXPIRED = 2,
  NOT_INVITED = 3,
}

export enum UserFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  TITLE = 'title',
  MOBILE_PHONE_NUMBER = 'mobilePhoneNumber',
  OFFICE_PHONE_NUMBER = 'officePhoneNumber',
  OFFICE_PHONE_EXTERNAL = 'officePhoneExtension',
  PREFERRED_CONTACT_METHOD = 'preferredContactMethod',
  INVITATION_TYPE = 'invitationType',
}

export interface IUser {
  id?: string;
  [UserFields.FIRST_NAME]: string;
  [UserFields.LAST_NAME]: string;
  [UserFields.EMAIL]: string;
  [UserFields.TITLE]: string;
  [UserFields.MOBILE_PHONE_NUMBER]: string;
  [UserFields.OFFICE_PHONE_NUMBER]: string;
  [UserFields.OFFICE_PHONE_EXTERNAL]: string;
  [UserFields.PREFERRED_CONTACT_METHOD]: number;
  [UserFields.INVITATION_TYPE]: InviteType;
  companyId: string;
  company?: {
    id: string;
    name: string;
  };
  invitationStatus?: InvitationStatus;
  roleName?: string;
}

export interface IUserProject extends IUser {}

export interface IAccount {
  firstName: string;
  lastName: string;
  pictureUrl?: string;
  email?: string;
  mobilePhoneNumber?: string;
  officePhoneNumber?: string;
  officePhoneExtension?: string;
  preferredContactMethod?: PreferredContactMethod;
}

export interface IProcoreClientSecrets {
  clientID: string;
  clientSecret: string;
}

export const getFallbackUser = (): IUser => ({
  id: undefined,
  firstName: null,
  lastName: null,
  title: null,
  mobilePhoneNumber: null,
  officePhoneNumber: null,
  officePhoneExtension: null,
  email: null,
  preferredContactMethod: PreferredContactMethod.EMAIL,
  invitationType: InviteType.DO_NOT_INVITE,
  companyId: null,
});

export const userInviteMap = {
  [InviteType.DO_NOT_INVITE]: 'Do not invite',
};

export const userInviteList = [
  {
    label: userInviteMap[InviteType.DO_NOT_INVITE],
    value: InviteType.DO_NOT_INVITE,
  },
];
