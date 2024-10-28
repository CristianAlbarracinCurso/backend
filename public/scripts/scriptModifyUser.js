document.addEventListener("DOMContentLoaded", () => {
  const editProfileForm = document.getElementById("editProfileForm");


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
      return; 
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
        password: password || null, 
      }),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.logout) {
        Swal.fire("Perfil actualizado", "Por favor, vuelve a iniciar sesión", "info").then(() => {
          window.location.href = "/logout"; 
        });
      } else {
        Swal.fire("Perfil actualizado!", "Los cambios se han guardado.", "success");
      }
    } else {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  });
});
