export enum PaymentStatus {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
}

export enum BookingStatus {
    PENDING = 'pending',
    CANCELLED = 'cancelled',
    ACTIVE = 'active',
    CANCELLED_LACK_PAYMENT = 'cancelled for lack of payment',
    CANCELLED_BY_TENANT = 'cancelled by tenant'
}
