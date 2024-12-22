export const USER_ROLES_VALUES = {
    SELLER: 'seller',
    CUSTOMER: 'customer',
    ADMIN: 'admin',
};

export const CREATE_USER_ROLE = [
    USER_ROLES_VALUES.CUSTOMER,
    USER_ROLES_VALUES.SELLER,
] as const;

export const USER_ROLE = [
    USER_ROLES_VALUES.ADMIN,
    ...CREATE_USER_ROLE,
] as const;
