import CartService from "../service/cart.service.js";
import { socketServer } from "../index.js";

class CartController {
cartService = new CartService()

createEmptyCart = async (req, res)  => {
    try {
        const cart= await this.cartService.createEmptyCart()
        if (!cart){
            res.status(500).json({message:"error al crear el carrito"})
        } res.status(201).json(cart)
    } catch (error) {
        
        res.status(500).json({message:"error del servidor"})
    }
}

getCartById = async (req, res)  => {
    try {
        const id=req.params.id
        const cart= await this.cartService.getCartById(id)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message:"error del servidor"})
    }
}

addProductToCart = async (req, res)  => {
    try {
        const {cid,pid}=req.params
        const {quantity}=req.body
        
        const cart= await this.cartService.addProductToCart(cid,pid,quantity)
        if (!cart){
            res.status(404).json({message:"carrito no encontrado"})
        } res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error del servidor"})
    }
}

deleteProductFromCart = async (req, res) => {
try {
    const {cid,pid}=req.params
    const deletedProduct= await this.cartService.deleteProductFromCart(cid, pid)
    res.status(200).json(deletedProduct)
} catch (error) {
    res.status(500).json({message:"error del servidor"})
}
}
}
export default CartController