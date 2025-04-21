import ProductsRepository from "../repository/products.repository.js"
import { nanoid } from "nanoid";

class ProductsService {
    productsRepository= new ProductsRepository()
     addProduct = async (createProductDTO) => {
        return await this.productsRepository.addProduct({...createProductDTO, code:nanoid()})
    };
    
    //  getProducts = async () => {
    //     return await this.productsRepository.getProducts()
    // };
    getProducts= async (
        query = "{}",
        page = 1,
        limit = 10,
        sort = "asc"
      ) => { 
        query = JSON.parse(query);
        const data = await this.productsRepository.getProducts(query, limit, page, sort)
        const baseUrl = `/products?query=${JSON.stringify(
          query
        )}&limit=${limit}&sort=${sort}&page=;`
        const res = {
          status: "success",
          payload: data.docs,
          totalPages: data.totalPages,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
          page: data.page,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevLink: data.hasPrevPage ? baseUrl + (data.page - 1) : baseUrl + 1,
          nextLink: data.hasNextPage ? baseUrl + (data.page + 1) : baseUrl + 1,
        };
        return res;
      }
    
     getProductById = async (id) => {
        return await this.productsRepository.getProductById(id)
    };
    
     deleteProductById = async (id) => {
        return await this.productsRepository.deleteProductById(id)
    };
    
     updateProduct = async (id, updateProductDTO) => {
        const prod= await this.getProductById(id)
        if (!prod) throw new Error("No se encontro el producto");
        return await this.productsRepository.updateProduct(id, updateProductDTO)
    };
    
}


export default ProductsService