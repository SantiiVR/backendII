import ProductsService from "../service/products.service.js"
import { socketServer } from "../index.js";

class ProductsController {
productsService=new ProductsService

getAllProducts= async (req, res) => {
    try {
        const {query, pages, limit, sort}=req.query
        const products=await this.productsService.getProducts(query, pages, limit, sort)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"ocurrio un error"})
    }
    }
    
    getProductById = async (req, res) => {
        try {
            const id=req.params.id
            const product=await this.productsService.getProductById(id)
            if (product) {
                res.status(200).json(product)
            }
            res.status(404).json({message:"producto no encontrado :c"})
        } catch (error) {
            res.status(500).json({message:"ocurrio un error"})
        }
        }
    
        createProducts = async (req, res) => {
            try {
                const {title,description,price,stock,category,thumbnail}=req.body
                if (!title||!description||!price||!stock||!category||!thumbnail) {
                    res.status(400).json([{message:"faltan campos obligatorios"},
                        {
                            title: "campo obligatorio",
                            description: "campo obligatorio",
                            price: "campo obligatorio",
                            stock:"campo obligatorio",
                            category: "campo obligatorio",
                            thumbnail:"campo obligatorio"
                        }]
                    )
                }
                
                const newProduct=await this.productsService.addProduct({
                    title,description,price,stock,category,thumbnail
                })
                const newProductList= await this.productsService.getProducts()
                socketServer.emit("products", newProductList)
                res.status(201).json(newProduct)
            } catch (error) {
                console.log(error)
                res.status(500).json({message:"ocurrio un error"})
            }
            }
    
            updateProduct = async (req, res) => {
                try {
                    const id=req.params.id
                    const {title,description,price,stock,category,thumbnail}=req.body
                    
                    
                    const updateProduct=await this.productsService.updateProduct(id,{
                        title,description,price,stock,category,thumbnail
                    })
                    const newProductList= await this.productsService.getProducts()
                    socketServer.emit("products", newProductList)
                    res.status(201).json(updateProduct)
                } catch (error) {
                    console.log(error)
                    res.status(500).json({message:"ocurrio un error"})
                }
                }
    
    
                deleteProduct = async (req, res) => {
                    try {
                        const id=req.params.id
                        
                        const deleteProduct=await this.productsService.deleteProductById(id)
                        if (deleteProduct) {
                            res.status(200).json({message:"producto eliminado"})
                        }
                        const newProductList= await this.productsService.getProducts()
                        socketServer.emit("products", newProductList)
                        res.status(404).json({message:"producto no encontrado :c"})
                    } catch (error) {
                        console.log(error)
                        res.status(500).json({message:"ocurrio un error"}) 
                    }
                    }
}

export default ProductsController