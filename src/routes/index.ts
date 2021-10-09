import { Router } from "express";
import clientes from "./Clientes";
// import personas from "./personas";
import usuarios from "./usuarios";


const router= Router();

router.use('/usuario', usuarios)
router.use('/Cliente', clientes)
// router.use('/persona', personas)




export default router;