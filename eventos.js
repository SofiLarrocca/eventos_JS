let contadorCarrito = document.getElementById('contador-cart')
let contenedorProductos = document.getElementById('container-productos')
let contenedorCarrito = document.getElementById ('container-cart')
let cartIcon = document.getElementById ('bi-cart')


let carrito = []

// Evento para mostrar productos en carrito
cartIcon.addEventListener ('click', () => { 
   contenedorCarrito.classList.toggle ('block')
   if(carrito.length == 0) { 
    // Si el carrito esta vacío aparece el siguiente mensaje:
    contenedorCarrito.innerHTML = ''
    const div = document.createElement('div')
    div.style.display = 'flex'
    div.style.alignItems = 'center'
    div.innerHTML = `
    <p>El carrito está vacío</p>
    <a href=#footer class='btn'>Comprar</a>`

    contenedorCarrito.append(div)
}
})

// Mostrar detalles del array productos en HTML
function mostrarProductosHTML () { 
    productos.forEach ((e) => { 
        // Creamos la card de cada producto
        let card = document.createElement ('div')
        card.className = 'card'
        // Completamos la card con descripcion del producto
        let img = document.createElement ('img')
        img.src = e.img
        img.className = 'img-card'
        let marcaCard = document.createElement ('h3')
        marcaCard.innerText = e.marca
        let variedadCard = document.createElement ('h4')
        variedadCard.innerText = e.variedad
        let precioCard = document.createElement ('h3')
        precioCard.innerText = '$ ' + e.precio

        btnCard = document.createElement('button')
        btnCard.innerText = 'Agregar al carrito'
        btnCard.className = 'btn'

        contenedorProductos.append(card)
        card.append(img, marcaCard, variedadCard, precioCard, btnCard)

        // Evento click "añadir al carrito"
        btnCard.addEventListener('click', ()=> { 
            contenedorCarrito.innerHTML = '' 
            agregarCarrito(e)
        })
    })
}

mostrarProductosHTML ()

// MANIPULAR CARRITO COMPRAS
function agregarCarrito (prod) {
    // Agregar producto al carrito
    carrito.push(prod)

    // Actualizamos el contador de productos
    contadorCarrito.innerText = carrito.length
    actualizarCarrito()

    // Eliminar producto del carrito
    function eliminarProducto(prod) { 
        const item = carrito.find ((e)=> e.id === prod.id)
        const indice = carrito.indexOf(item)
        carrito.splice (indice, 1) 

        contadorCarrito.innerText = carrito.length
        actualizarCarrito()
    } 


    // Agregamos HTML por cada producto agregado
    function actualizarCarrito () {
    carrito.forEach ((prod) => {
        const div = document.createElement('div')
        div.className = 'div-cart'

        // Creamos elementos a dibujar en div
        div.innerHTML = `
        <img class='img-cart' src=${prod.img}>
        <h3>${prod.marca}</h3>
        <h4>${prod.variedad}</h4>
        <p class='text-right'><span>${prod.precio}</span></p>`

        contenedorCarrito.append(div)
        
        let botonEliminar = document.createElement ('i')
        botonEliminar.className= "bi bi-x-lg"
        botonEliminar.style.padding = '0 1rem'

        contenedorCarrito.append(div)
        div.append(botonEliminar)

        // Evento botón eliminar carrito
        botonEliminar.addEventListener ('click', () => { 
            contenedorCarrito.innerHTML = ''            
            eliminarProducto(prod)
        })
    })}

    // Funcion calcular precio total
    function precioTotal () {
    const precioTotal = document.createElement('div')
    precioTotal.innerHTML = `
    <p>PRECIO TOTAL $ ${carrito.reduce((acc , prod)=> acc + prod.precio*prod.cantidad ,0)}</p>`
    // Estilos texto precio total
    precioTotal.style.fontWeight = 800
    precioTotal.style.marginTop = '2rem'
    precioTotal.style.textAlign = 'right'
    
    contenedorCarrito.append(precioTotal)
    }

    precioTotal ()
}



