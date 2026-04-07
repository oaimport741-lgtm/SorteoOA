const supabaseUrl = "https://lvxyphkarplslzwapmqg.supabase.co";
const supabaseKey = "sb_publishable_TN-L5hSlTa-ZsRL55z-2KQ_q5ZVwErB";
const form = document.getElementById("formularioDatos");
const agregarBtn = document.getElementById("agregarCodigo");
const contenedorCodigos = document.getElementById("codigos");
const loader = document.getElementById("loader");
const mensaje = document.getElementById("mensaje");
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

let supabaseClient = null;

try {
  const supabaseLib = window.supabase || globalThis.supabase;

  if (!supabaseLib || typeof supabaseLib.createClient !== "function") {
    throw new Error("No se cargó la librería de Supabase");
  }

  supabaseClient = supabaseLib.createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
} catch (error) {
  console.error("Error al iniciar Supabase:", error);
  if (mensaje) {
    mensaje.innerText =
      "Error al iniciar Supabase. Revisá la conexión a internet y la clave pública.";
  }
}

if (agregarBtn && contenedorCodigos) {
  agregarBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "codigo[]";
    input.placeholder = "Codigo de Barras del Producto";
    input.required = true;
    contenedorCodigos.appendChild(input);
  });
}

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!supabaseClient) {
      mensaje.innerText =
        "No se pudo conectar con Supabase. Revisá la clave pública y la librería.";
      return;
    }

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

    try {
      const { error } = await supabaseClient.from("participantes").insert(registros);

      if (error) {
        throw error;
      }

      form.reset();
      contenedorCodigos.innerHTML =
        '<input type="text" name="codigo[]" placeholder="Codigo de Barras del Producto" required>';

      mensaje.innerText = "Datos enviados correctamente";
    } catch (error) {
      const detalle = error && error.message ? error.message : "desconocido";
      mensaje.innerText = `Error al guardar: ${detalle}`;
      console.error("Error de Supabase:", error);
    } finally {
      loader.style.display = "none";
    }
  });
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });
}
