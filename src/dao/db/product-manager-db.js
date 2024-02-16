const ProductModel = require("../models/product.model.js");


class ProductManager {

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            const existeProducto = await ProductModel.findOne({ code: code });

            if (existeProducto) {
                console.log("El código debe ser único");
                return;
            }

            const newProduct = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    
    async getProducts({ limit, page, sort, query }) {
        try {
            const productos = await ProductModel.find(query)
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);
            return productos;
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }
    

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);

            if (!producto) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto encontrado!");
            return producto;
        } catch (error) {
            console.log("Error al traer un producto por id");
        }
    }

    async updateProduct(id, productoActualizado) {
        try {

            const updateado = await ProductModel.findByIdAndUpdate(id, productoActualizado);

            if (!updateado) {
                console.log("No se encuentra che el producto");
                return null;
            }

            console.log("Producto actualizado con éxito");
            return updateado;
        } catch (error) {
            console.log("Error al actualizar el producto", error);

        }
    }

    async deleteProduct(id) {
        try {

            const deleteado = await ProductModel.findByIdAndDelete(id);

            if (!deleteado) {
                console.log("Producto no encontrado");
                return null;
            }

            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }
}

module.exports = ProductManager; 