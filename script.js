/**
 * Array de productos.
 *
 * Cada elemento del array representa un producto y contiene las siguientes propiedades:
 * - `image`: El nombre de la imagen del producto.
 * - `name`: El nombre del producto.
 * - `inches`: El tamaño del producto en pulgadas.
 * - `brand`: La marca del producto.
 * - `price`: El precio del producto.
 * - `quantity`: La cantidad del producto en stock.
 * 
 */
let products = [
  {
    image: 'lg1',
    name: '27GS60QC-B',
    inches: 27,
    brand: 'LG',
    price: 169.99,
    quantity: 12,
  },
  {
    image: 'lg2',
    name: '24GQ50F-B',
    inches: 23.8,
    brand: 'LG',
    price: 176.99,
    quantity: 3,
  },
  {
    image: 'lg3',
    name: '24GS60F-B',
    inches: 23.8,
    brand: 'LG',
    price: 146.6,
    quantity: 13,
  },
  {
    image: 'lg4',
    name: '24GS75Q-B',
    inches: 27,
    brand: 'LG',
    price: 219,
    quantity: 20,
  },
  {
    image: 'asus1',
    name: 'VA24EHF',
    inches: 23.8,
    brand: 'Asus',
    price: 79,
    quantity: 1,
  },
  {
    image: 'asus2',
    name: 'VG249Q3A',
    inches: 23.8,
    brand: 'Asus',
    price: 129,
    quantity: 7,
  },
  {
    image: 'asus3',
    name: 'XG27AQDMG',
    inches: 26.5,
    brand: 'Asus',
    price: 599,
    quantity: 9,
  },
  {
    image: 'asus4',
    name: 'XG27ACS',
    inches: 27,
    brand: 'Asus',
    price: 448.89,
    quantity: 15,
  },
  {
    image: 'msi1',
    name: 'G24C4',
    inches: 23.6,
    brand: 'MSI',
    price: 139,
    quantity: 5,
  },
  {
    image: 'msi2',
    name: 'G274F',
    inches: 27,
    brand: 'MSI',
    price: 158.99,
    quantity: 11,
  },
  {
    image: 'msi3',
    name: 'G27C3F',
    inches: 27,
    brand: 'MSI',
    price: 158.99,
    quantity: 23,
  },
  {
    image: 'msi4',
    name: 'G255F',
    inches: 24.5,
    brand: 'MSI',
    price: 129,
    quantity: 15,
  },
]

/**
 * Obtiene referencias a los elementos del DOM que serán utilizados.

 * Estas constantes almacenan referencias a los elementos del DOM para facilitar su uso en el resto del código.

 * @constant {HTMLElement} productsTable - El elemento de la tabla donde se mostrarán los productos.
 * @constant {HTMLElement} userInput - El elemento input donde el usuario puede buscar productos.
 * @constant {HTMLElement} overlay - El elemento que se utilizará como capa de fondo para las modales.
 * @constant {HTMLElement} modal - El elemento de la modal que se mostrará para realizar acciones como agregar, editar o eliminar productos.
 * 
 */
const productsTable = document.getElementById('productsTable')
const userInput = document.getElementById('userInput')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')

// TABLA

/**
 * Renderizar la tabla completa.
 *
 * This function fetches an array of products and dynamically generates a table
 * to display their information, including image, name, inches, brand, price,
 * quantity, and action buttons for editing and deleting.
 *
 * @returns {void}
 */
const getTable = () => {
  try {
    // Reset de la tabla para evitar duplicados
    productsTable.innerHTML = ''

    // Iteración para renderizar cada producto en la tabla
    products.forEach((product, index) => {
      productsTable.innerHTML += `
    <tr>
      <td>
        <image src="assets/${product.image}.jpg" alt="Imagen del producto ${product.name}">
      </td>
      <td>${product.name}</td>
      <td>${product.inches}</td>
      <td>${product.brand}</td>
      <td>${product.price} €</td>
      <td>${product.quantity}</td>
      <td class='action'>
        <button class="update-btn" onclick="updateModal(${index})">Editar</button>
        <button class="delete-btn" onclick="deleteModal(${index})">Eliminar</button>
      </td>
    </tr>
  `
    })
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

getTable()

// MODALES

/**
 * Muestra la modal con contenido diferente dependiendo del valor de `modalValue`.
 *
 * @param {string} modalValue - El tipo de modal que se mostrará. 
 *                              Posibles valores:
 *                                - 'add': Formulario para agregar un producto.
 *                                - 'update': Formulario para editar un producto existente.
 *                                - 'delete': Diálogo de confirmación para eliminar un producto existente.
 * @param {number} index - (Opcional) El índice del producto a editar o eliminar, utilizado cuando `modalValue` es 'update' o 'delete'.
 */
const modalOn = (modalValue, index) => {
  try {
    // Muestra la modal y el overlay
    modal.style.display = 'flex'
    overlay.style.display = 'block'

    // Para la modal de añadir
    if (modalValue === 'add') {
      modal.innerHTML = `
      <label>
        Imagen:
        <input type="text" id="image">
      </label>
      <label>
        Nombre:
        <input type="text" id="name">
      </label>
      <label>
        Pulgadas:
        <input type="number" id="inches">
      </label>
      <label>
        Marca:
        <input type="text" id="brand">
      </label>
      <label>
        Precio:
        <input type="number" id="price">
      </label>
      <label>
        Cantidad:
        <input type="number" id="quantity">
      </label>
      <div>
        <button class="delete-btn" onclick="modalOff()">Salir</button>
        <button class="update-btn" onclick="addProduct()">Confirmar</button>
      </div>
      <h4 id="warning" style="color: var(--mainRed); display: none;">Todos los campos son obligatorios</h4>
    `
    }

    // Para la modal de editar
    if (modalValue === 'update') {
      modal.innerHTML = `
      <label>
        Imagen:
        <input type="text" id="image" value="${products[index].image}">
      </label>
      <label>
        Nombre:
        <input type="text" id="name" value="${products[index].name}">
      </label>
      <label>
        Pulgadas:
        <input type="number" id="inches" value="${products[index].inches}">
      </label>
      <label>
        Marca:
        <input type="text" id="brand" value="${products[index].brand}">
      </label>
      <label>
        Precio:
        <input type="number" id="price" value="${products[index].price}">
      </label>
      <label>
        Cantidad:
        <input type="number" id="quantity" value="${products[index].quantity}">
      </label>
      <div>
        <button class="delete-btn" onclick="modalOff()">Salir</button>
        <button class="update-btn" onclick="updateProduct(${index})">Confirmar</button>
      </div>
      <h4 id="warning" style="color: var(--mainRed); display: none;">Todos los campos son obligatorios</h4>
    `
    }

    // Para la modal de eliminar
    if (modalValue === 'delete') {
      modal.innerHTML = `
      <h2>¿Estás seguro que quieres eliminar este archivo?</h2>
      <table class="products">
        <tbody>
          <tr>
            <td>
              <image src="assets/${products[index].image}.jpg" alt="Imagen del producto ${products[index].name}">
            </td>
            <td>${products[index].name}</td>
            <td>${products[index].inches}</td>
            <td>${products[index].brand}</td>
            <td>${products[index].price} €</td>
            <td>${products[index].quantity}</td>
        </tbody>
      </table>
      <div>
        <button class="delete-btn" onclick="modalOff()">Salir</button>
        <button class="update-btn" onclick="deleteProduct(${index})">Confirmar</button>
      </div>
    `
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

/**
 * 
 * Ocutla la modal y el overlay
 * 
 */
const modalOff = () => {
  try {
    // Oculta la modal y el overlay
    modal.style.display = 'none'
    overlay.style.display = 'none'
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

// Tipo de Modales

/**
 * 
 * Muestra la modal para agregar un nuevo producto.
 * 
 */
const addModal = () => {
  try {
    modalValue = 'add'
    modalOn(modalValue)
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

/**
 * 
 * Muestra la modal para editar un producto existente.
 * 
 */
const updateModal = (index) => {
  try {
    modalValue = 'update'
    modalOn(modalValue, index)
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

/**
 * 
 * Muestra la modal para eliminar un producto existente.
 * 
 */
const deleteModal = (index) => {
  try {
    modalValue = 'delete'
    modalOn(modalValue, index)
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

// ACCIONES

/**
 * 
 * Agrega un EventListener a un elemento input que filtra las filas de una tabla 
 * en función del valor ingresado por el usuario.
 * 
 * @param {HTMLElement} userInput - El elemento input donde se escucharán los eventos de tecla pulsada.
 * @param {HTMLElement} productsTable - El elemento tabla que se filtrará.
 */
userInput.addEventListener('keyup', (event) => {
  try {
    const value = event.target.value.toLowerCase()
    const row = productsTable.getElementsByTagName('tr')

    for (i = 0; i < row.length; i++) {
      column = row[i].getElementsByTagName('td')[1]
      if (column) {
        txtValue = column.textContent || column.innerText
        if (txtValue.toLowerCase().indexOf(value) > -1) {
          row[i].style.display = ''
        } else {
          row[i].style.display = 'none'
        }
      }
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
})

/**
 * 
 * Agrega un nuevo producto a la lista de productos.
 * 
 * @param {string} image - El nombre de la imagen del producto.
 * @param {string} name - El nombre del producto.
 * @param {number} inches - El tamaño del producto en pulgadas.
 * @param {string} brand - La marca del producto.
 * @param {number} price - El precio del producto.
 * @param {number} quantity - La cantidad del producto en stock.
 * 
 */
const addProduct = (image, name, inches, brand, price, quantity) => {
  try {
    warning = document.getElementById('warning')
    image = document.getElementById('image').value
    name = document.getElementById('name').value
    inches = document.getElementById('inches').value
    brand = document.getElementById('brand').value
    price = document.getElementById('price').value
    quantity = document.getElementById('quantity').value

    // Validación de campos obligatorios
    if (image && name && inches && brand && price && quantity) {
      products.push({ image, name, inches, brand, price, quantity })

      getTable()
      modalOff()
    } else {
      warning.style.display = 'block'

      setTimeout(() => {
        warning.style.display = 'none'
      }, 2000)
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

/**
 * 
 * Edita un producto existente en la lista de productos.
 * 
 * @param {number} index - El índice del producto a actualizar.
 * @param {string} image - El nuevo nombre de la imagen del producto.
 * @param {string} name - El nuevo nombre del producto.
 * @param {number} inches - El nuevo tamaño del producto en pulgadas.
 * @param {string} brand - La nueva marca del producto.
 * @param {number} price - El nuevo precio del producto.
 * @param {number} quantity - La nueva cantidad del producto en stock.
 * 
 */
const updateProduct = (index, image, name, inches, brand, price, quantity) => {
  try {
    const warning = document.getElementById('warning')
    image = document.getElementById('image').value
    name = document.getElementById('name').value
    inches = document.getElementById('inches').value
    brand = document.getElementById('brand').value
    price = document.getElementById('price').value
    quantity = document.getElementById('quantity').value

    // Validación de campos obligatorios
    if ((image, name && inches && brand && price && quantity)) {
      products[index] = { image, name, inches, brand, price, quantity }

      getTable()
      modalOff()
    } else {
      warning.style.display = 'block'
      setTimeout(() => {
        warning.style.display = 'none'
      }, 2000)
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}

/**
 * 
 * Elimina un producto de la lista de productos.
 * 
 * @param {number} index - El índice del producto a eliminar.
 * 
 */
const deleteProduct = (index) => {
  try {
    products.splice(index, 1)

    getTable()
    modalOff()
  } catch (error) {
    console.error('Ocurrió un error: ', error)
  }
}
