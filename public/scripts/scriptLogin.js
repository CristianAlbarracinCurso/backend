document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((result) => {
            throw new Error(
              result.message || "Usuario o contraseña incorrectos."
            );
          });
        }
        return response.json();
      })
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Inicio de sesión exitoso.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "/products";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Hubo un problema con el servidor.",
        });
      });
  });
