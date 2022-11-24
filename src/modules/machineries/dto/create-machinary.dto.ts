export class CreateStock {
    machinery: number;
    engine_number: string;
    chassis_number: string;
    status: string; 
}

export enum StatusStock {
    DISPONIBLE = 1,
    OCUPADA = 2,
    REPARACION = 3
}