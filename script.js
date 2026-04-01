const supabaseUrl = "https://lvxyphkarplslzwapmgq.supabase.co";
const supabaseKey = "sb_publishable_TN-L5hSlTa-ZsRL55z-2KQ_q5ZVwErB";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("formularioDatos");
const agregarBtn = document.getElementById("agregarCodigo");
const contenedorCodigos = document.getElementById("codigos");
const loader = document.getElementById("loader");
const mensaje = document.getElementById("mensaje");

agregarBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.name = "codigo[]";
  input.placeholder = "Codigo de Barras del Producto";
  input.required = true;
  contenedorCodigos.appendChild(input);
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  loader.style.display = "block";
  mensaje.innerText = "";

  const cedula = form.cedula.value.trim();
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const factura = form.factura.value.trim();

  const codigos = Array.from(
    document.querySelectorAll("input[name='codigo[]']")
  )
    .map((input) => input.value.trim())
    .filter(Boolean);

  const registros = codigos.map((codigo) => ({
    cedula,
    nombre,
    telefono,
    factura,
    codigo
  }));

  const { error } = await supabase.from("participantes").insert(registros);

  loader.style.display = "none";

  if (error) {
    mensaje.innerText = "Error al guardar los datos";
    console.error(error);
    return;
  }

  form.reset();
  contenedorCodigos.innerHTML =
    '<input type="text" name="codigo[]" placeholder="Codigo de Barras del Producto" required>';

  mensaje.innerText = "Datos enviados correctamente";
});

const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("activo");
});
