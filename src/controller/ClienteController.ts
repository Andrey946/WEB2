import { validate } from "class-validator";
import { Request, Response } from "express";
import { xssFilter } from "helmet";
import { getRepository } from "typeorm";
import { Cliente } from "../entity/Cliente";
import { Persona } from "../entity/Persona";


export class ClienteController{

    static getAll = async (req:Request, res:Response)=>{
        const ClienteRepository = getRepository(Cliente);
       
        let lista;

        try {
            lista = await ClienteRepository.find({relations:["persona"],where:{estado:1}});
        } catch (error) {
         res.status(404).json({mensaje:'Hubo un Error!'})   
        }

        if(lista.length > 0){
            res.send(lista);

        }else{
            res.status(404).json({mensaje:'No hay datos.Por favor, ingreselos!!!'})  
        }
        


    }





    static getById = async (req:Request, res:Response)=>{
        const clienteRepository = getRepository(Cliente);

        const {id}= req.params;

        try {
            const clienteObtenido = await clienteRepository.findOneOrFail(id,{relations:["persona"],where:{estado:1}});
            res.send(clienteObtenido)

        } catch (error) {
            res.status(404).json({mensaje:'No se encontro el cliente!'});

        }

    }   

    static new = async (req:Request, res:Response)=>{
        const clienteRepo = getRepository(Cliente);
        const personaRepo = getRepository(Persona);
        const { aplicaDesc,tipoCliente,descuentoMax,email,persona }  = req.body;

        let usuario = new Cliente();    
        let personaNew = new Persona();

   
    
        // if(!aplicaDesc){
        //     res.status(404).json({mensaje:'Falta el Aplica Descuento'});
        // }
        // if(!tipoCliente){
        //     res.status(404).json({mensaje:'Falta el Tipo de Cliente!'});
        // }
        // if(!descuentoMax){
        //     res.status(404).json({mensaje:'Falta el descuento maximo!'});
        // }
       
        
        personaNew.nombre = persona.nombre;
        personaNew.apellido1 = persona.apellido1;
        personaNew.apellido2 = persona.apellido2;
        personaNew.fechaNacimiento = persona.fechaNacimiento;
        personaNew.estado = true;
        usuario.email = email;
        usuario.tipoCliente= tipoCliente;
        usuario.aplicaDesc= aplicaDesc;
        usuario.descuentoMax= descuentoMax;
        usuario.persona = personaNew;
        usuario.estado= true;
        
        console.log(persona.nombre);
        console.log(usuario)    

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target:false, value:false} };
        const errores = await validate(usuario, validateOpt);
       //valiado si hay errores
        if(errores.length>0){
            return res.status(400).json(errores);
        }

        
        //guardo
        try {
            await personaRepo.save(personaNew);
            await clienteRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'El cliente ya existe!'})
        }       
  
        res.status(201).send("Cliente creado"); 



    }

    static modify = async (req:Request, res:Response)=>{

        const usuarioRepo = getRepository(Cliente);
        const personaRepo = getRepository(Persona);
       
        const {aplicaDesc,tipoCliente,descuentoMax,email,persona }  = req.body;
        const {id}= req.params;
        let usuario;
        let personaEdit;

        
        try {
            usuario= await usuarioRepo.findOneOrFail(id);
            personaEdit= await personaRepo.findOneOrFail(usuario.IdPersona);
        } catch (error) {
            res.status(404).json({mensaje:'No se encontro el usuario!'});
        }

    
        if(!aplicaDesc){
            res.status(404).json({mensaje:'Falta el Aplica Descuento'});
        }
        if(!tipoCliente){
            res.status(404).json({mensaje:'Falta el Tipo de Cliente!'});
        }
        if(!descuentoMax){
            res.status(404).json({mensaje:'Falta el descuento maximo!'});
        }
        if(!persona.nombre){
            res.status(404).json({mensaje:'Falta el nombre!'});
        }
        if(!email){
            res.status(404).json({mensaje:'Falta el Email!'});
        }
        if(!persona.apellido1){
            res.status(404).json({mensaje:'Falta el Apellido1!'});
        }
        if(!persona.apellido2){
            res.status(404).json({mensaje:'Falta el Apellido 2!'});
        }
        if(!persona.fechaNacimiento){
            res.status(404).json({mensaje:'Falta la Fecha de Nacimiento!'});
        }   

        
        console.log(persona.nombre) 
        console.log(tipoCliente)  
        
        usuario.persona = personaEdit;
        personaEdit.nombre = persona.nombre;
         personaEdit.apellido1 = persona.apellido1;
         personaEdit.apellido2 = persona.apellido2;
         personaEdit.fechaNacimiento = persona.fechaNacimiento;
        personaEdit.estado = true;     
        usuario.email = email;
        usuario.tipoCliente= tipoCliente;
        usuario.aplicaDesc= aplicaDesc;
        usuario.descuentoMax= descuentoMax;       
        usuario.estado= true;
        

        // usuario.aplicaDesc = aplicaDesc;
        // usuario.tipoCliente = tipoCliente;
        // usuario.descuentoMax = descuentoMax;
        // usuario.email = email;
        // persona.nombre=

        //validacion de decoredares de class validator
        const validateOpt = { validationError: { target:false, value:false} };
        const errores = await validate(usuario, validateOpt);
       //validado si hay errores
        if(errores.length>0){
            return res.status(400).json(errores);
        }

        
        //Guardar
        try {
            await personaRepo.save(personaEdit);
            await usuarioRepo.save(usuario);
        } catch (error) {
            return res.status(409).json({mensaje:'La persona ya existe!'})
        }       
  
        res.status(201).send("Persona modificada"); 
        
    }

    static delete = async (req:Request, res:Response)=>{

        const usuarioRepo = getRepository(Cliente);
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