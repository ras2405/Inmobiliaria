export class BookingDto {
    
    document:string;
    documentType:string;
    name:string;
    surname:string;
    mail:string;
    phone:string;
    country:string;
    state:string;
    adults:number;
    kids:number;
    propertyId: number;
    startDate:Date;
    endDate:Date;

    constructor(booking: any){
        this.document = booking.document;
        this.documentType = booking.documentType;
        this.name = booking.name;
        this.surname = booking.surname;
        this.mail = booking.mail;
        this.phone = booking.phone;
        this.country = booking.country;
        this.state = booking.state;
        this.adults = booking.adults;
        this.kids = booking.kids;
        this.propertyId = booking.propertyId;
        this.startDate = new Date(booking.startDate);
        this.endDate = new Date(booking.endDate);
    }
}
