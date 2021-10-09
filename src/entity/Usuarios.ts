import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['correo'])
export class Usuarios{
    //atributos   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    nombre: string;

    @Column()
    @IsNotEmpty()
    apellido1:string;

    @Column()
    @IsNotEmpty()
    apellido2: string;

    @Column()
    @IsNotEmpty()
    //@IsDate()
    fechaNac: Date;

    @Column()
    @IsNotEmpty()
    @IsEmail()    
    correo: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    estado: boolean;

    hashPassword():void{
        const salt= bcrypt.genSaltSync(10);
        this.password= bcrypt.hashSync(this.password, salt);
    }




}