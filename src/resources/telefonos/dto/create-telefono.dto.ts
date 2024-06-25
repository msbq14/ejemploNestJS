import { IsNumberString, IsString } from "@nestjs/class-validator";

export class CreateTelefonoDto {
    @IsString()
    tipo: string;

    @IsNumberString()
    numero: string;

    @IsString()
    id_persona: string;
}
