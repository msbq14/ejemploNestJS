import { Module } from "@nestjs/common";
import { TelefonosService } from "./telefonos.service";
import { TelefonosController } from "./telefonos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Telefono } from "./entities/telefono.entity";
import { Persona } from "../personas/entities/persona.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Telefono, Persona])
  ],
  controllers: [TelefonosController],
  providers: [TelefonosService],
})
export class TelefonosModule {}
