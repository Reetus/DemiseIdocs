interface ILocation {
    x: number;
    y: number;
    map: number;
}

interface IHouseEntry {
    owner: string;
    name: string;
    firstSeen: number;
    condition: string;
    location: ILocation;
}

export { ILocation, IHouseEntry }