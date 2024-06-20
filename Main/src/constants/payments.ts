export enum PaymentStatus {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
}

export enum BookingStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    CANCELLED_NON_PAYMENT = 'cancelled due to non-payment',
    CANCELLED_BY_TENANT = 'cancelled by tenant'
}
