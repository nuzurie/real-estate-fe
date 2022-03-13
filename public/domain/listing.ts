export interface House {
    rooms: number;
    bathrooms: number;
    civicAddress: string;
    area: string;
    city: string;
    province: string;
    postalCode: string;
}

export interface Summary {
    title: string;
    builtYear: number;
    storeys: number;
    neighbourhoodName: string;
    propertyType: string;
    buildingType: string;
}

export interface Listing {
    id: string;
    house: House;
    price: number;
    listingType: string;
    summary: Summary;
    description: string;
}