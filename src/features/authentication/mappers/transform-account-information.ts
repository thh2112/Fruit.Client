import _get from 'lodash/get';
import { AccountInformation } from '../types/auth';

export function transformAccountInformation(data: unknown): AccountInformation | null {
  if (!data) {
    return null;
  }

  const accountInformation: AccountInformation = {
    id: Number(_get(data, 'id')),
    firstName: _get(data, 'firstName', ''),
    lastName: _get(data, 'lastName', ''),
    name: _get(data, 'fullName', ''),
    email: _get(data, 'email', ''),
    phoneNumber: _get(data, 'phoneNumber', ''),
    gender: _get(data, 'gender', 'N/A'),
    role: _get(data, 'role', null),
    avatar: _get(data, 'avatar', ''),
    isDeleted: _get(data, 'isDeleted', false),
    createdAt: _get(data, 'createdAt', ''),
    updatedAt: _get(data, 'updatedAt', ''),
    deletedAt: _get(data, 'deletedAt', ''),
  };

  return accountInformation;
}
