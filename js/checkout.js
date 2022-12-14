
function recuperarCarrito() {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const carrito = JSON.parse(localStorage.getItem("carritoBebidas")) || []

    if (carrito.length > 0) {
        carrito.forEach(bebida => tablaHTML += armarTablaCarrito(bebida))
        tbody.innerHTML = tablaHTML
    }
}
recuperarCarrito()

function btnComprar() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito)
        comprar()
    } else {
        vacio()
    }
}
const btnVerCarrito = document.querySelector("button#btnComprar")
btnVerCarrito.addEventListener("click", btnComprar)

function activarBotonesDelete() {
    const buttonsDelete = document.querySelectorAll("button.button")
    buttonsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            let pos = carrito.findIndex(bebida => bebida.tipo === btn.id)
            if (pos > -1) {
                carrito.splice(pos, 1)
                localStorage.setItem("carritoBebidas", JSON.stringify(carrito))
                recuperarCarrito()
                activarBotonesDelete()
            }
        })
    })
}
activarBotonesDelete()



// Libreria

const comprar = () => {
    const shopping = new Compra(carrito)
    Swal.fire({
        title: `"El costo total es de $ ${shopping.obtenerSubtotal()}"`,
        text: "Desea realizar esta compra?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Comprar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra Realizada.',
                'Gracias por su compra!',
                'success'
            )
            localStorage.clear()
            location. reload()
        }
    })
}

const vacio = () => {
    Swal.fire(
        'El carrito está vacio',
        'Por favor selecciona las bebidas que desea comprar',
        'error'
    )
}
