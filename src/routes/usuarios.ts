import { Router } from "express";
import { UsuariosController } from "../controller/UsuariosController";

const router= Router();

//obtiene todos
router.get('/', UsuariosController.getAll);
//obtiene 1 especifico mediante id
router.get('/:id', UsuariosController.getById);
//crear
router.post('/', UsuariosController.new);
//modifica
router.patch('/:id', UsuariosController.modify);
//elimina
router.delete('/:id', UsuariosController.delete);

export default router;