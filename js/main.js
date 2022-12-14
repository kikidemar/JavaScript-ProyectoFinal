const carrito = []
const section = document.querySelector("section")
const URL = 'bbdd/productos.json'
const main = document.querySelector("main")
const bebidas = []

fetch(URL)
    .then((response) => data = response.json())
    .then((data) => bebidas.push(...data))
    .then(() => cargarBebidas(bebidas))
    .then(() => botonAdd())
    .catch((error) => main.innerHTML = retornoError())

// Guardar y recuperar el carrito con LocalStorage + JSON

const guardarCarrito = ()=> {
    if (carrito.length > 0) {
        localStorage.setItem("carritoBebidas", JSON.stringify(carrito))
    }
}


const recuperarCarrito = ()=> {
    return JSON.parse(localStorage.getItem("carritoBebidas")) || []
}

carrito.push(...recuperarCarrito())


// Cargar y armar HTML con los productos

const armarHTML = (bebida) => {
    return `<div class="card m-5" style="width: 18rem;">
                <img src="${bebida.imagen}" class="card-img-top img-thumbnail" style="height:300px;">
                <div class="card-body">
                    <h5 class="card-title text-center">${bebida.tipo}</h5>
                    <p class="card-text text-center">$ ${bebida.precio}</p>
                    <div class= "row justify-content-center">
                        <button id= "${bebida.codigo}" class="btn btn-primary">Añadir al carrito</button>
                    </div>
                </div>
            </div>`
}


const cargarBebidas = (array)=> {
    let sectionHTML = ""
        if (array.length > 0) {
            array.forEach(bebida => {
                sectionHTML += armarHTML(bebida)
            })
            section.innerHTML = sectionHTML
        } else {
            sectionHTML = "<h2 class='error-bebidas'>Error al cargar productos.</h2>"
        }
        section.innerHTML = sectionHTML
}




// Botones y eventos clicks

const buscarBebida = (codigo)=> {
    let resultado = bebidas.find(bebida=> bebida.codigo === parseInt(codigo))
    return resultado
}

const botonAdd = () => {
    const botonesAdd = document.querySelectorAll("button.btn.btn-primary")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let resultado = buscarBebida(e.target.id)
            carrito.push(resultado)
            guardarCarrito()
            agregado()
        })
    })
}

// Filtrado de bebidas

const filtrarBebidas = () => {
    let resultado = bebidas.filter(bebida => bebida.tipo.toUpperCase().includes(inputSearch.value.toUpperCase().trim()))
        if (resultado.length > 0) {
            cargarBebidas(resultado)
            botonAdd()
        }
}

inputSearch.addEventListener("search", ()=> { 
    inputSearch.value.trim() !== "" ? filtrarBebidas() : cargarBebidas(bebidas)
})

// Libreria

const agregado = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Bebida agregada al carrito'
    })
}
