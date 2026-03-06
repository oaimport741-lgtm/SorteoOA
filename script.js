const form = document.getElementById("formularioDatos")
const agregarBtn = document.getElementById("agregarCodigo")
const contenedorCodigos = document.getElementById("codigos")
const loader = document.getElementById("loader")

agregarBtn.addEventListener("click", () => {

const input = document.createElement("input")

input.type = "text"
input.name = "codigo[]"
input.placeholder = "Código de Barras del Producto"
input.required = true

contenedorCodigos.appendChild(input)

})

form.addEventListener("submit", async function(e){

e.preventDefault()

loader.style.display = "block"

const cedula = form.cedula.value
const nombre = form.nombre.value
const telefono = form.telefono.value
const factura = form.factura.value

const codigos = document.querySelectorAll("input[name='codigo[]']")

for (let codigo of codigos){

const data = new FormData()

data.append("cedula", cedula)
data.append("nombre", nombre)
data.append("telefono", telefono)
data.append("factura", factura)
data.append("codigo", codigo.value)

await fetch("https://script.google.com/macros/s/AKfycbwox13VOVAKANtK1roxIyKtFKFDmP51udX6ZP6Zot_JnKll-p9UIWrwe8elgdDWvw-NWg/exec",{
method:"POST",
body:data
})

}

form.reset()

contenedorCodigos.innerHTML = '<input type="text" name="codigo[]" placeholder="Código de Barras del Producto" required>'

loader.style.display = "none"

document.getElementById("mensaje").innerText = "Datos enviados correctamente"

})

const toggle = document.getElementById("menuToggle")
const menu = document.getElementById("menu")

toggle.addEventListener("click", ()=>{
menu.classList.toggle("activo")
})