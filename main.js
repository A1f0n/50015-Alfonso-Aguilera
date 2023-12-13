const fs = require('fs').promises;

//clase product manager 
class ProductManager {
    
    constructor(productPath) {
        this.productPath = productPath;
        
        // Creo archivo con ruta proporcionada
        fs.access(productPath)
            .then(() => {
                console.log('Existia un archivo asi');
            })
            .catch(() => {
                // El archivo no existe, así que intenta crearlo
                return fs.writeFile(productPath, '[]', 'utf-8');
            })
            .then(() => {
                console.log('Product Manager inicializado');
            })
            .catch((error) => {
                console.error('Error al inicializar el Product Manager:', error);
            });
        }

    getProducts = async() => {
        try{
    
        //leer archivo y devolver los productos en un array
        let jsonProducts = await fs.readFile(this.productPath, 'utf-8');
        let arrayProductos = JSON.parse(jsonProducts);
        return arrayProductos
        } catch(error) {
            console.error('Error al leer el archivo:', error); 
        }

    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            // Leer productos en archivo
            let arrayProductos = await this.getProducts();
    
            // Crear objeto producto
            const nuevoProducto = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
    
            // Agregar producto recibido al array
            arrayProductos.push(nuevoProducto);
    
            // Pasar a JSON
            let jsonDeProductos = JSON.stringify(arrayProductos, null, 2);
    
            // Escribir productos en archivo
            await fs.writeFile(this.productPath, jsonDeProductos, 'utf-8');
    
            console.log('Producto agregado correctamente.');
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    }
    


}



//const manager = new ProductManager("ruta_testing2.json");


//manager.addProduct("testing_titulo", "descrip", "234", "http:lalala", 123, 34);

//console.log("El contenido del json es: n/" + manager.getProducts());



//manager.addProduct("testing2", "description", "price", "thumbnail", "code", "sdsd");
//manager.addProduct("testing3", "description", "price", "thumbnail", "code", "sdsd");
//manager.addProduct("testing4", "description", "price", "thumbnail", "code", "sdsd");
//manager.addProduct("testing5", "description", "price", "thumbnail", "code", "sdsd");