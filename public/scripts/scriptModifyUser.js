document.addEventListener("DOMContentLoaded", () => {
  const editProfileForm = document.getElementById("editProfileForm");

  // Obtiene el userId desde el atributo data-user-id del formulario
  const userId = editProfileForm.getAttribute("data-user-id");

  editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtiene los valores de los campos
    const name = editProfileForm.elements["name"].value.trim();
    const email = editProfileForm.elements["email"].value.trim();
    const password = editProfileForm.elements["password"].value.trim();

    // Verifica que todos los campos estén llenos
    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos obligatorios.",
      });
      return; // Detiene la ejecución si hay campos vacíos
    }

    const formData = new FormData(editProfileForm);

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: password || null, // Envía null si no se cambió
      }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.logout) {
        Swal.fire("Perfil actualizado", "Por favor, vuelve a iniciar sesión", "info").then(() => {
          window.location.href = "/logout"; // Ruta de logout que destruye la sesión
        });
      } else {
        Swal.fire("Perfil actualizado!", "Los cambios se han guardado.", "success");
      }
    } else {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  });
});
