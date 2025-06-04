const form = document.querySelector("form");
const scriptURL = 'https://script.google.com/macros/s/AKfycbxEs2i5yQuRMCjZCMDeUDcy0Zg5KfpnTT6jvLJA1FmY6YOlgVLmafdfRkGi5oxIM__bSw/exec';


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInput = document.querySelector("#evidencia");
  const file = fileInput.files[0];

  let fileBase64 = "";
  if (file) {
    fileBase64 = await toBase64(file);
  }

  const data = {
    nombre: formData.get("nombre"),
    documento: formData.get("documento"),
    fecha: formData.get("fecha"),
    hora: formData.get("hora"),
    lugar: formData.get("lugar"),
    descripcion: formData.get("descripcion"),
    file: fileBase64,
    mimeType: file?.type || "",
    filename: file?.name || ""
  };

  fetch(scriptURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  })
  .then(response => {
    alert("✅ Formulario enviado correctamente");
    form.reset();
  })
  .catch(error => {
    alert("❌ Error al enviar el formulario");
    console.error("Error:", error);
  });
});

// Función para convertir archivo a base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]); // quitamos 'data:...base64,'
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
