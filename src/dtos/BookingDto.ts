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

    constructor(
        document: string,
        documentType: string,
        name: string,
        surname: string,
        mail: string,
        phone: string,
        country: string,
        state: string,
        adults: number,
        kids: number,
        propertyId: number,
        startDate: Date,
        endDate: Date
    ) {
        this.document = document;
        this.documentType = documentType;
        this.name = name;
        this.surname = surname;
        this.mail = mail;
        this.phone = phone;
        this.country = country;
        this.state = state;
        this.adults = adults;
        this.kids = kids;
        this.propertyId = propertyId;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
    }
}
