//Definicion de la clase Yerba

class Yerba {
    constructor(yerba, cantidad) {
      this.id = yerba.id;
      this.marca = yerba.marca;
      this.precio = yerba.precio;
      this.cantidad = cantidad;
      this.precioTotal = yerba.precio;
    }
//Metodo para agregar una unidad al carrito  
    agregarUnidad() {
      this.cantidad++;
    }
 //Metodo para quitar una unidad al carrito 
    quitarUnidad() {
      this.cantidad--;
    }
//Metodo para actualizar el precio total segun su cantidad  
    actualizarPrecioTotal() {
      this.precioTotal = this.precio * this.cantidad;
    }
  }
//Arrray de diferentes articulos de yerba  
  const productos = [
    {
      id: 0,
      marca: "Verdeflor",
      descripcion: "Hierbas serranas",
      precio: 850,
      img: "../Images/verdeflor.jpeg",
    },
    {
      id: 1,
      marca: "Playadito",
      descripcion: "Tradicional con palo",
      precio: 900,
      img: "../Images/playadito.jpeg",
    },
    {
      id: 2,
      marca: "Kalena",
      descripcion: "Tradicional despalada",
      precio: 950,
      img: "../Images/kalena.jpeg",
    },
    {
      id: 3,
      marca: "Amanda",
      descripcion: "Tradicional suave",
      precio: 870,
      img: "../Images/amanda.jpg",
    },
    {
      id: 4,
      marca: "Canarias",
      descripcion: "Tradicional sin palo",
      precio: 1990,
      img: "../Images/canarias.jpeg",
    },
    {
      id: 5,
      marca: "Roapipo",
      descripcion: "Tradicional Organica",
      precio: 1500,
      img: "../Images/roapipo.jpeg",
    },
  ];
  
  // ----- Declaración de funciones ----- //

  //Funcion para verificar si ay elementos en el carrito en el almacenanmiento local
  function chequearCarritoEnStorage() {
    let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));
  
    if (contenidoEnStorage) {
      let array = [];
      for (const objeto of contenidoEnStorage) {
        let yerba = new Yerba(objeto, objeto.cantidad);
        yerba.actualizarPrecioTotal();
        array.push(yerba);
      }
      imprimirTabla(array);
      return array;
    }
  
    return [];
  }

//Funcion para imprimir los articulos en HTML  

  imprimirproductosEnHTML(productos);
  
  function imprimirproductosEnHTML(array) {
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
  
    for (const yerba of array) {
      let card = document.createElement("div");
      card.innerHTML = `
          <div class="card text-center" style="width: 18rem;">
          <div class="card-body">
          <img src="${yerba.img}" id="" class="card-img-top img-fluid" alt="">
          <h2 class="card-title">${yerba.marca}</h2>
          <h5 class="card-subtitle mb-2 text-muted">${yerba.descripcion}</h5>
          <p class="card-text">$${yerba.precio}</p>
          
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button id="agregar${yerba.id}" type="button" class="btn btn-dark"> Agregar </button>
          </div>
          </div>
          </div>      
          `;
  
      contenedor.appendChild(card);
  
      let boton = document.getElementById(`agregar${yerba.id}`);
      boton.addEventListener("click", () => agregarAlCarrito(yerba.id));
    }
  }

//Funcion para agregar un producto al carrito  

  function agregarAlCarrito(idProducto) {
    let yerbaEnCarrito = carrito.find((yerba) => yerba.id === idProducto);
  
    if (yerbaEnCarrito) {
      let index = carrito.findIndex(
        (elemento) => elemento.id === yerbaEnCarrito.id
      );
      carrito[index].agregarUnidad();
      carrito[index].actualizarPrecioTotal();
    } else {
      let cantidad = 1;
      carrito.push(new Yerba(productos[idProducto], cantidad));
    }
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
  }
//Funcion para eliminar un producto del carrito

  function eliminarDelCarrito(id) {
    let yerba = carrito.find((yerba) => yerba.id === id);
    let index = carrito.findIndex((element) => element.id === yerba.id);
    if (yerba.cantidad > 1) {
      carrito[index].quitarUnidad();
      carrito[index].actualizarPrecioTotal();
    } else {
      carrito.splice(index, 1);
    }

    //Funcion para eliminar el articulo

    function EliminarArticulo() {
      Swal.fire({
        title: "¿Descargar eliminar este articulo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No por ahora",
      }).then((response) => {
        if (response.isConfirmed) {
          EliminarArticulo();
        }
      });
    }
  
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
    imprimirTabla(carrito);
  }

//Funcion para eliminar todos los productos del carrito

  function eliminarCarrito() {
    carrito.length = 0;
    localStorage.removeItem("carritoEnStorage");
  
    document.getElementById("carrito").innerHTML = "";
    document.getElementById("acciones-carrito").innerHTML = "";
  }

//funcion para obtener el precio total de los productos en carrito

  function obtenerPrecioTotal(array) {
    return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
  }

// funcion para impirmir la tabla de productos en el carrito

  function imprimirTabla(array) {
    let precioTotal = obtenerPrecioTotal(array);
    let contenedor = document.getElementById("carrito");
    contenedor.innerHTML = "";
  
    let tabla = document.createElement("div");
  
    tabla.innerHTML = `
          <table id="tablaCarrito" class="table table-striped">
              <thead>         
                  <tr>
                      <th>Item</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Accion</th>
                  </tr>
              </thead>
  
              <tbody id="bodyTabla">
              </tbody>
          </table>
      `;
  
    contenedor.appendChild(tabla);
  
    let bodyTabla = document.getElementById("bodyTabla");
  
    for (let yerba of array) {
      let datos = document.createElement("tr");
      datos.innerHTML = `
                  <td>${yerba.marca}</td>
                  <td>${yerba.cantidad}</td>
                  <td>$${yerba.precioTotal}</td>
                  <td><button id="eliminar${yerba.id}" class="btn btn-dark">Eliminar</button></td>
        `;
  
      bodyTabla.appendChild(datos);
  
      let botonEliminar = document.getElementById(`eliminar${yerba.id}`);
      botonEliminar.addEventListener("click", () => eliminarDelCarrito(yerba.id));
    }
  
    let accionesCarrito = document.getElementById("acciones-carrito");
    accionesCarrito.innerHTML = `
          <h5>PrecioTotal: $${precioTotal}</h5></br>
          <button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark">Vaciar Carrito</button>
      `;
  }

// funcion para filtrar la busqueda de productos

  function filtrarBusqueda(e) {
    e.preventDefault();
  
    let ingreso = document.getElementById("busqueda").value.toLowerCase();
    let arrayFiltrado = productos.filter((elemento) =>
      elemento.marca.toLowerCase().includes(ingreso)
    );
  
    imprimirproductosEnHTML(arrayFiltrado);
  }
  
  let btnFiltrar = document.getElementById("btnFiltrar");
  btnFiltrar.addEventListener("click", filtrarBusqueda);
  
  imprimirproductosEnHTML(productos);
  
  const carrito = chequearCarritoEnStorage();
  
  const btnCompletarCompra = document.getElementById('btn-completar-compra');

  btnCompletarCompra.addEventListener('click', completarCompra);

//funcion para completar una compra mediante confirmacion por libreria
  function completarCompra() {

      Swal.fire({
          title: 'Compra completada',
          text: '¡Gracias por tu compra!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
      });
      eliminarCarrito();
  }
