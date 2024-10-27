document.addEventListener("DOMContentLoaded", () => {
  const deleteLinks = document.querySelectorAll(".delete-product");

  deleteLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Evita el comportamiento por defecto del enlace
      const productId = this.dataset.id; // Obtiene el ID del producto

      // Muestra SweetAlert para confirmar la eliminación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, realiza la eliminación
          console.log(`Eliminando el producto con ID: ${productId}`);
          console.log(`Eliminando el producto con ID: ../products/${productId}`);
          fetch(`/api/products/${productId}`, {
            method: "DELETE",
          })
            .then((response) => {
              console.log(response);
              if (response.ok) {
                Swal.fire(
                  "Eliminado!",
                  "El producto ha sido eliminado.",
                  "success"
                ).then(() => {
                  // Recargar la página o eliminar el producto del DOM
                  location.reload(); // O puedes eliminar el producto del DOM
                });
              } else {
                Swal.fire(
                  "Error!",
                  "No se pudo eliminar el producto.",
                  "error"
                );
              }
            })
            .catch((error) => {
              Swal.fire(
                "Error!",
                "Hubo un problema al intentar eliminar el producto.",
                "error"
              );
            });
        }
      });
    });
  });
});
