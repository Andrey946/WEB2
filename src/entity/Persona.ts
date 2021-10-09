import { IsEmail, isEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()

export class Persona{
    //Atributos

    @PrimaryGeneratedColumn()   
    id:number;



    @Column()
    nombre:string;

    @Column()
    @IsNotEmpty()
    apellido1:String;

    @Column()
    @IsNotEmpty()
    apellido2:String;

    @Column()
    @IsNotEmpty()
    fechaNacimiento:Date;
    
    
    @Column()
    @IsNotEmpty()
    estado:boolean;



    

}
