import { Router } from "express";
import { ClienteController } from "../controller/ClienteController";


const router= Router();

//obtiene todos
router.get('/', ClienteController.getAll);
//obtiene 1 especifico mediante id
router.get('/:id', ClienteController.getById);
//crear
router.post('/', ClienteController.new);
//modifica
router.patch('/:id', ClienteController.modify);
//elimina
router.delete('/:id', ClienteController.delete);

export default router;