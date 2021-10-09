import { validate } from "class-validator";
import { ESRCH } from "constants";
import { json, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuarios } from "../entity/Usuarios";

export class UsuariosController{

    static getAll = async (req:Request, res: Response)=>{
       const usuarioRepo = getRepository(Usuarios); 

       let lista;

       try {
            lista = await usuarioRepo.find({select:['id','nombre','apellido1','apellido2','fechaNac','correo'],where:{estado:1}});
       } 
       catch (error) {
           res.status(404).json({mensaje:'Algo fue mal!'});
       }
    
       if(lista.length > 0){
            res.send(lista);
       }else{
            res.status(404).json({mensaje:'No hay resultados!'});
       }
    }


    static getById = async (req:Request, res: Response)=>{
        const usuarioRepo = getRepository(Usuarios);

        const { id } = req.params;

        try {
             const usuario = await usuarioRepo.findOneOrFail(id, 
                {select:['id','nombre','apellido1','apellido2','fechaNac','correo'], 
                where:{estado:1}});

             res.send(usuario);
        } 
        catch (error) {
            res.status(404).json({mensaje:'No se encontro el usuario!'});
        }
     
    }

    static new = async (req:Request, res: Response)=>{

        const usuarioRepo = getRepository(Usuarios);
        const { nombre, apellido1, apellido2, fechaNac, correo, password }  = req.body;

        let usuario = new Usuarios();

        if(!nombre){
            res.status(404).json({mensaje:'Falta el nombre!'});
        }
        if(!apellido1){
            res.status(404).json({mensaje:'Falta el apellido 1!'});
        }
        if(!apellido2){
            res.status(404).json({mensaje:'Falta el apellido 2!'});
        }
        if(!fechaNac){
            res.status(404).json({mensaje:'Falta Fecha Nacimiento!'});
        }
        if(!correo){
            res.status(404).json({mensaje:'Falta correo electronico!'});
        }
        if(!password){
            res.status(404).json({mensaje:'Falta password!'});
        }

        usuario.nombre= nombre;
        usuario.apellido1= apellido1;
        usuario.apellido2= apellido2;
        usuario.fechaNac= fechaNac;
        usuario.correo= correo;
        usuario.password= password;
        usuario.estado = true ;

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target:false, value:false} };
        const errores = await validate(usuario, validateOpt);
       //valiado si hay errores
        if(errores.length>0){
            return res.status(400).json(errores);
        }

        //incripto el password
        usuario.hashPassword();


        //guardo
        try {
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'El usuario ya existe!'})
        }       
  
        res.status(201).send("Usuario creado");          
    }

    static modify = async (req:Request, res: Response)=>{
        const usuarioRepo = getRepository(Usuarios);
        const {id}= req.params;
        const { nombre, apellido1, apellido2, fechaNac, correo, password }  = req.body;
        let usuario;

        try {
            usuario= await usuarioRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({mensaje:'No se encontro el usuario!'});
        }

        if(!nombre){
            res.status(404).json({mensaje:'Falta el nombre!'});
        }
        if(!apellido1){
            res.status(404).json({mensaje:'Falta el apellido 1!'});
        }
        if(!apellido2){
            res.status(404).json({mensaje:'Falta el apellido 2!'});
        }
        if(!fechaNac){
            res.status(404).json({mensaje:'Falta Fecha Nacimiento!'});
        }
        if(!correo){
            res.status(404).json({mensaje:'Falta correo electronico!'});
        }
        if(!password){
            res.status(404).json({mensaje:'Falta password!'});
        }

        usuario.nombre= nombre;
        usuario.apellido1= apellido1;
        usuario.apellido2= apellido2;
        usuario.fechaNac= fechaNac;
        usuario.correo= correo;
        usuario.password= password;   
        usuario.estado = true;     

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target:false, value:false}};
        const errores = await validate(usuario, validateOpt);
        //valiado si hay errores
        if(errores.length>0){
            return res.status(400).json(errores);
        }

        //incripto el password
        usuario.hashPassword();

        try {
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'El correo ya existe!'})
        }

        res.status(201).send("Usuario modificado!");  
    }

    static delete = async (req:Request, res: Response)=>{
        const usuarioRepo = getRepository(Usuarios);
        const {id}= req.params;        
        let usuario;

        try {
            usuario= await usuarioRepo.findOneOrFail(id);
        } catch (error) {
            res.status(404).json({mensaje:'No se encontro el usuario!'});
        }

        usuario.estado = false;

        try {
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'Error al eliminar!'});
        }
   
        res.status(201).send("Usuario eliminado!");         
    }





}