import { Telefono } from "src/resources/telefonos/entities/telefono.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 
"typeorm";
@Entity()
export class Persona {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "text",
        unique: true
    })
    cedula: string;

    @Column("text")
    nombre: string;

    @Column("text")
    direccion: string;

    @OneToMany(
        () => Telefono,
        (telefono) => telefono.persona
    )
    telefonos: Telefono[];
}
