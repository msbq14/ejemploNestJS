import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateTelefonoDto } from "./dto/create-telefono.dto";
import { UpdateTelefonoDto } from "./dto/update-telefono.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Telefono } from "./entities/telefono.entity";
import { Repository } from "typeorm";
import { Persona } from "../personas/entities/persona.entity";
import { PaginationDto } from "src/common/dto/pagination.dto";
@Injectable()
export class TelefonosService {
  private logger = new Logger("TelefonosService");

  constructor(
    @InjectRepository(Telefono)
    private readonly telefonoRepository: Repository<Telefono>,
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>
  ) {

  }
  async create(createTelefonoDto: CreateTelefonoDto) {
    const { id_persona, ...rest } = createTelefonoDto;
    try {

      const registro_Persona = await this.personaRepository.findOne({
        where: { id: id_persona }
      });

      if (!registro_Persona) {
        return {
          statusCode: 404,
          response: {
            title: "No encontrado",
            message: "Persona con id no encontrada"
          }
        }
      }
      const telefono = this.telefonoRepository.create({
        ...rest,
        persona: registro_Persona
      });

      const telefonoDB = await this.telefonoRepository.save(telefono);
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Telefono creado exitosamente",
        },
        telefonoDB
      }
    } catch (error) {

      this.logger.error(error);
    }
  }

  async findAll(paginationDto?: PaginationDto) {

    const { itemsPage = 10, page = 1 } = paginationDto;
    try {
      const telefonos = await this.telefonoRepository.find({
        take: itemsPage,
        skip: (page - 1) * itemsPage,
        relations: ["persona"]
      });

      
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Telefonos recuperados exitosamente",
        },
        pagination: {
          page,
          itemsPage
        },
        telefonos

      }
    } catch (error) {
      this.logger.error(error);
      return {
        statusCode: 500,
        response: {
          title: "Error",
          message: "Error del servidor",
          error: error
        },
      }
    }
  }

  async update(id: string, body: Partial<Telefono>) {
    try {
      const registroTelefono = await this.telefonoRepository.findOne({ where: { id } });
      if (!registroTelefono) {
        return {
          statusCode: 404,
          response: {
            title: "Error",
            message: `Telefono con id ${id} no encontrado`,

          },
        }
      }
      const updated = this.telefonoRepository.merge(registroTelefono, body);
      await this.telefonoRepository.save(updated);

      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Telefono actualizado correctamente"
        },
        persona: updated
      }
    } catch (error) {
      this.logger.error(error);
      return {
        statusCode: 500,
        response: {
          title: "Error",
          message: "Error del servidor",
          error: error
        },
      }
    }

  }


  findOne(id: number) {
    return `This action returns a #${id} telefono`;
  }



  async remove(id: string) {
    try {
      const registroTelefono = await this.telefonoRepository.findOne({ where: { id } });
      if (!registroTelefono) {
        return {
          statusCode: 404,
          response: {
            title: "Error",
            message: `Teléfono con id ${id} no encontrado`,

          },
        }
      }
      const deletedTelefono = await this.telefonoRepository.delete(registroTelefono);
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Teléfono eliminado exitosamente"
        },

      }

    } catch (error) {
      this.logger.error(error);
      return {
        statusCode: 500,
        response: {
          title: "Error",
          message: "Error del servidor",
          error: error
        },
      }
    }

  }
}
