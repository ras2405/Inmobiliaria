export class PropertyDto {
    id: number;
    name: string;
    adults: number;
    kids: number;
    beds: number;
    singleBeds: number;
    ac: boolean;
    wifi: boolean;
    garage: boolean;
    type: number;
    beachDistance: number;
    state: string;
    balneario: string;
    neighborhood: string;
    pictures: string;

    constructor(property: any){
        this.id = property.id;
        this.name = property.name;
        this.adults = property.adults;
        this.kids = property.kids;
        this.beds = property.beds;
        this.singleBeds = property.singleBeds;
        this.ac = property.ac;
        this.wifi = property.wifi;
        this.garage = property.garage;
        this.type = property.type;
        this.beachDistance = property.beachDistance;
        this.state = property.state;
        this.balneario = property.balneario;
        this.neighborhood = property.neighborhood;
        this.pictures = property.pictures;
    }
}
