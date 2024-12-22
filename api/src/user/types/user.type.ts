import {
  USER_ALREADY_EXISTS_CODE,
  USER_NOT_FOUND_CODE,
  USER_INCORRECT_PASSWORD_CODE,
} from '../constants/internal-response-codes.constant';
import { USER_ROLE } from '../entity/user-role.entity';

export type ExceptionCode =
  | typeof USER_ALREADY_EXISTS_CODE
  | typeof USER_NOT_FOUND_CODE
  | typeof USER_INCORRECT_PASSWORD_CODE;

export type UserRole = (typeof USER_ROLE)[number];
