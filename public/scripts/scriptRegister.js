document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!data.username || !data.email || !data.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor completa todos los campos.",
      });
      return;
    }
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 201) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Cuenta creada exitosamente.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "/users/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Hubo un problema al crear tu cuenta.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema con el servidor.",
        });
      });
  });
