class Compra {
    constructor(carrito) {
        this.carrito = carrito
    }
    obtenerSubtotal() {
        if (carrito.length > 0) {
            return this.carrito.reduce((acc, bebida)=> acc + bebida.precio, 0).toFixed(2)
        } else {
            return 'Error inesperado'
        }
    }
}