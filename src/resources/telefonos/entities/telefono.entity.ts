
import { Persona } from "src/resources/personas/entities/persona.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
@Entity()
export class Telefono {

    @PrimaryGeneratedColumn("uuid")
    id:string; 

    @Column("text")
    tipo: string;

    @Column("text")
    numero: string;

    @ManyToOne(
        ()=>Persona,
        (persona)=>persona.telefonos
    )
    @JoinColumn()
    persona: Persona;
}
