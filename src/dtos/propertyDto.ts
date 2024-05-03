export class PropertyDto{
    id: number; //PREGUNTAR
    name: string;    
    adults: number;
    kids: number;
    beds: number;
    singleBeds: number;
    ac: boolean;
    wifi: boolean;
    garage: boolean;
    type: 1 | 2;
    beachDistance: number;
    state: string;
    balneario: string;
    neighborhood: string;
    pictures: string[];

    constructor(id: number, name: string, adults: number, 
        kids: number, beds: number, singleBeds: number, ac: boolean, 
        wifi: boolean, garage: boolean, type: 1 | 2, beachDistance: number, 
        state: string, balneario: string, neighborhood: string, pictures: string[]){
        this.id = id;
        this.name = name;    
        this.adults = adults;
        this.kids = kids; 
        this.beds = beds;
        this.singleBeds = singleBeds;
        this.ac = ac;
        this.wifi = wifi;
        this.garage = garage;
        this.type = type;  
        this.beachDistance = beachDistance;
        this.state = state;
        this.balneario = balneario;
        this.neighborhood = neighborhood;
        this.pictures = pictures;
    }
}