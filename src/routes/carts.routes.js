import { Router } from "express";
import CartController from "../controller/carts.controller.js";

const router=Router()
const cartController = new CartController()

router.post("/", cartController.createEmptyCart)

router.get("/:id", cartController.getCartById)

router.post("/:cid/products/:pid", cartController.addProductToCart)

router.delete("/:cid/products/:pid", cartController.deleteProductFromCart)



export default router