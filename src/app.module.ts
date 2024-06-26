import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonasModule } from "./resources/personas/personas.module";
import { TelefonosModule } from "./resources/telefonos/telefonos.module";

@Module({
  imports: [
    PersonasModule,
    TelefonosModule,
    
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "ejemplo.db",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }




