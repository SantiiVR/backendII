import CartRepository from "../repository/cart.repository.js"

class CartService {
    cartRepository = new CartRepository()

createEmptyCart = async () => {
    
    return await this.cartRepository.createEmptyCart({products:[]})
}

    getCartById = async (id) => {
        return await this.cartRepository.getCartById(id)
    }

    addProductToCart = async (cid, pid, quantity=1) => {
            // Verificar la existencia del carrito
            const cart= await this.cartRepository.getCartById(cid)
            if (!cart) throw new Error("El carrito no existe");
            // Verificar si el producto ya existe en el carrito
            const productExist = cart.products.filter((p) => p.productId===pid)
            
            TODO:
            if (productExist)
                {
                // Si existe, incrementar la cantidad
                productExist.quantity+=quantity 
                const updatedcart= cart.products.filter((p) => p.productId!=pid)
                console.log("cart", productExist)
                updatedcart.products.push(productExist)
                return await this.cartRepository.updateCart(cid, updatedcart)
                
            } else {
                // Si no existe, agregar el producto con la cantidad especificada

                cart.products.push({productId:pid, quantity})
                return await this.cartRepository.updateCart(cid, cart)
            }
            
        };
        
        // crear funcion que permita eliminar el producto de el carrito
        deleteProductFromCart = async (cid,pid) => {
            const cart = await this.cartRepository.getCartById(cid)
            if (!cart) throw new Error("no se encontro el carrito")
            const updatedcart= cart.products.filter((p) => p.productId!=pid)
            return await this.cartRepository.updateCart(cid, updatedcart)
            
        }
        
    }

export default CartService