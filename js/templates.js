const carrito = JSON.parse(localStorage.getItem("carritoBebidas")) || []


const retornoError = () => {
    return `<div class="card" style="width: 20rem;">
                <div class="card-body alert-danger">
                    <h5 class="card-title">Apa, nos mandamos un moco!</h5>
                    <p class="card-text">No se pudieron cargar las bebidas</p>
                </div>
            </div>`
}

const armarTablaCarrito = (bebida) =>{
    return `<tr>
                <td><img src="${bebida.imagen}" style="height:120px" id="imagen"></img></td>
                <td style="font-size: 23px;">${bebida.tipo}</td>
                <td style="font-size: 23px;">${bebida.precio}</td>
                <td><button class="button" id="${bebida.tipo}" title="Quitar del carrito" style="font-size: 22px;">🗑</button></td>
            </tr>`
}

