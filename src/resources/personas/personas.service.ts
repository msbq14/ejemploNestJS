import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreatePersonaDto } from "./dto/create-persona.dto";
import { UpdatePersonaDto } from "./dto/update-persona.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Persona } from "./entities/persona.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class PersonasService {
  private logger = new Logger("PersonasService");
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>
  ) { }
  async create(createPersonaDto: CreatePersonaDto) {
    try {

      const persona = this.personaRepository.create(createPersonaDto);
      const personaDB = await this.personaRepository.save(persona);
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Persona creada exitosamente",
        },
        personaDB
      }
    } catch (error) {
      if(error.errno === 19){
        throw new BadRequestException(`Person with id alredy exists`);
      }
      this.logger.error(error);
    }
  }

  async findAll(paginationDto?: PaginationDto) {

    const { itemsPage = 10, page = 1 } = paginationDto;
    try {
      const personas = await this.personaRepository.find({
        take: itemsPage,
        skip: (page - 1) * itemsPage,
        relations: ["telefonos"]
      });

      
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Personas recuperadas exitosamente",
        },
        pagination: {
          page,
          itemsPage
        },
        personas

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
    return `This action returns a #${id} persona`;
  }

  async update(id: string, body: Partial<Persona>) {
    try {
      const registroPersona = await this.personaRepository.findOne({ where: { id } });
      if (!registroPersona) {
        return {
          statusCode: 404,
          response: {
            title: "Error",
            message: `Persona con id ${id} no encontrada`,

          },
        }
      }
      const updated = this.personaRepository.merge(registroPersona, body);
      await this.personaRepository.save(updated);

      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Persona actualizada correctamente"
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


  async remove(id: string) {
    try {
      const registroPersona = await this.personaRepository.findOne({ where: { id } });
      if (!registroPersona) {
        return {
          statusCode: 404,
          response: {
            title: "Error",
            message: `Persona con id ${id} no encontrada`,

          },
        }
      }
      const deletedPersona = await this.personaRepository.delete(registroPersona);
      return {
        statusCode: 200,
        response: {
          title: "Correcto",
          message: "Persona eliminada exitosamente"
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
