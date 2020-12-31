const carrito = document.querySelector('#carrito'); /**porque no se reasigna*/
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); /** donde se agregar los objetos*/
const vaciarCarrito = document.querySelector('#vaciar-carrito'); /***boton que vacia */
const listaCursos = document.querySelector('#lista-cursos'); /**la lista de cursos es un div que ocupa todo el body*/
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    // cuando agregas  un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito

    vaciarCarrito.addEventListener('click', () => {

        articulosCarrito = [];
        limpiarHTML();
    })

}

function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id');
        //elimina del arreglo por data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        mostrarHTML(); // iterar sobre el carrito y mostrar el nuevo html

    }

}

function agregarCurso(e) {
    //  console.log(e.target); /****con esto se a que boton se le dio de la lista */
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { /**como es un div y no un boton hay que preguntar si el elemento presionado contiene la clase del boton */

        const cursosSelecionados = e.target.parentElement.parentElement; /****del boton me voy 2 frames para atras para tener todos los datos SEGUN ESTE HTML  */

        leerDatosCurso(cursosSelecionados);
    }


}
//lee contenido del html y extrae info
function leerDatosCurso(curso) {
    //console.log(curso);
    //crear objeto con el contenido del seleccionado

    const infoCurso = {
            imagen: curso.querySelector('img').src,
            /*** como ya tengo seleccionado el boton pulsado genero un obj con sus datos para despues cargarlos */
            titulo: curso.querySelector('h4').textContent,
            /***para leer el contenido de una etiqueta html */
            precio: curso.querySelector('.precio span').textContent,
            /***se puede seleccionar asi que es adentro la clase precio una etiqueta span o  directamente la clase u-pull-right */
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1

        }
        //revisa si un elemento ya exista
        //.some  itera sobre un array de objeto y verifica si un elemento existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }

        }) /***.map crea un nuevo array a partir de otro */
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo
        articulosCarrito = [...articulosCarrito, infoCurso]; ////hago una copia del obj articulos con ...art y despues le voy agregando infocurso tambien se puede hacer con push

    }

    mostrarHTML();
}

function mostrarHTML() {
    //limpiar html

    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {

        const row = document.createElement('tr'); /** mirar html como  esta hecho con tablas hay que crear filas en donde esas filas contengas las img precio y las demas caracteristicas de manera dinamica con js*/
        row.innerHTML = `
        <td>
       <img src=" ${curso.imagen}" width="100"> 
        </td>
        <td> 
        ${curso.titulo}  
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        ${curso.cantidad}
        </td>
       
        <td>
       <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
        `;
        /**** crear un enlace (boton) que sea para borrar el curso seleccionado por el id*/
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row); //agrega cada fila en cada iteracion

    });




}

function limpiarHTML() {
    //forma lenta
    contenedorCarrito.innerHTML = '';
    /*
    while (contenedorCarrito.firstChild) { 
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }*/
    /*** siempre que tenga un elemento se limpia */
}