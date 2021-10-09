import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Persona } from "./Persona";


@Entity()
@Unique(['email'])
export class Cliente {

    @PrimaryGeneratedColumn()
    id:number;




    @Column()
    @IsNotEmpty()
    tipoCliente:string;


    @Column()
    @IsNotEmpty()
    aplicaDesc:boolean;


    @Column()
    descuentoMax:number;

    
    @Column()
    @IsNotEmpty()
    @IsEmail()
    email:String;

    @Column()
    @IsNotEmpty()
    estado:boolean;

    @OneToOne(type => Persona)
    @JoinColumn({name:"IdPersona"})
    persona: Persona;

}