import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from "@nestjs/common";
import { PersonasService } from "./personas.service";
import { CreatePersonaDto } from "./dto/create-persona.dto";
import { UpdatePersonaDto } from "./dto/update-persona.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller("personas")
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  @UsePipes( ValidationPipe )
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personasService.create(createPersonaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.personasService.findAll(paginationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.personasService.findOne(+id);
  }

  @Patch(":id")
  @UsePipes( ValidationPipe )
  update(@Param("id") id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return this.personasService.update(id, updatePersonaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.personasService.remove(id);
  }
}
