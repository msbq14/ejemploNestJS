import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query } from "@nestjs/common";
import { TelefonosService } from "./telefonos.service";
import { CreateTelefonoDto } from "./dto/create-telefono.dto";
import { UpdateTelefonoDto } from "./dto/update-telefono.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("telefonos")
export class TelefonosController {
  constructor(private readonly telefonosService: TelefonosService) {}

  @Post()
  @UsePipes( ValidationPipe )
  create(@Body() createTelefonoDto: CreateTelefonoDto) {
    return this.telefonosService.create(createTelefonoDto);
  }
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.telefonosService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.telefonosService.findOne(+id);
  }

  @Patch(":id")
  @UsePipes( ValidationPipe )
  update(@Param("id") id: string, @Body() updateTelefonoDto: UpdateTelefonoDto) {
    return this.telefonosService.update(id, updateTelefonoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.telefonosService.remove(id);
  }
  
}
