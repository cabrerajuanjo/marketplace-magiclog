export const USER_ROLES_VALUES = {
    USER: 'user',
    ADMIN: 'admin',
};

export const CREATE_USER_ROLE = [USER_ROLES_VALUES.USER] as const;

export const USER_ROLE = [
    USER_ROLES_VALUES.ADMIN,
    ...CREATE_USER_ROLE,
] as const;
