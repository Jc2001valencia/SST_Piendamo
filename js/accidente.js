
document.getElementById("reporteForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // URL del Web App de tu Apps Script
    const url = "https://script.google.com/macros/s/AKfycbxEs2i5yQuRMCjZCMDeUDcy0Zg5KfpnTT6jvLJA1FmY6YOlgVLmafdfRkGi5oxIM__bSw/exec";

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(data)
      });

      alert("¡Reporte enviado correctamente!");
      form.reset();
    } catch (err) {
      alert("Error al enviar el reporte: " + err.message);
    }
  });