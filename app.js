const fs = require('fs')

class Contenedor {

    constructor( path ){
        this.path = path
    }

    async save( title, price, thumbnail ){

        try {
            let id
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)
            if (products.length == 0) {
                id = 1
            } else {
                id = products[products.length - 1].id + 1
            }

            products.push({id:id, title: title, price: price, thumbnail: thumbnail})

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto guardado exitosamente', id);

            return id
            
        } catch (error) {
            console.log(`Error metodo "save": ${error}`);
        }
    }

    async getById( id ){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)
    
            let product = products.find(prod => prod.id == id)

            console.log(product)
            return product
        } catch (error) {
            console.log(`Error metodo "getById": ${error}`);
        }
    }

    async getAll(){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)

            console.log(products)
            return products
        } catch (error) {
            console.log(`Error metodo "getAll": ${error}`);
        }
    }

    async deleteById(id){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)    
            products = products.filter(prod => prod.id !== id)

            await fs.promises.writeFile( this.path, JSON.stringify(products) )

            console.log('Producto eliminado correctamente', products)
            return products
        } catch (error) {
            console.log(`Error metodo "deleteById": ${error}`);
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile( this.path, '[]' )
            console.log('Base de datos eliminada correctamente');
        } catch (error) {
            console.log(`Error metodo "deleteAll": ${error}`);
        }
    }

    async prodRnd(){
        try {
            let products = await fs.promises.readFile( this.path, 'utf-8' )
            products = JSON.parse(products)

            const rnd = parseInt(Math.random() * (products.length));

            return products[rnd]
        } catch (error) {
            console.log(`Error metodo "getAll": ${error}`);
        }
    }

}

const products = new Contenedor('products.json')

module.exports = products

// products.save( 'Remera', 2500, 'img1' )
// products.save( 'pantalon', 2500, 'img2' )
// products.save( 'GORRA', 2500, 'img3' )
// products.save( 'jean', 2500, 'img4' )

// products.getById( 2 )
// products.getAll()
// products.deleteById( 2 )
// products.deleteAll()