import { IsNumberString, IsString } from "@nestjs/class-validator";
import { Length } from "class-validator";


export class CreatePersonaDto {
    @IsNumberString()
    @Length(10)
    cedula: string;

    @IsString()
    nombre: string;

    @IsString()
    direccion: string;
    
}
