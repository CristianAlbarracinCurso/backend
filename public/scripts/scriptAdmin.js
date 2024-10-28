document.addEventListener("DOMContentLoaded", () => {
  const deleteLinks = document.querySelectorAll(".delete-product");

  deleteLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); 
      const productId = this.dataset.id; 

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
    
          fetch(`/api/products/${productId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire(
                  "Eliminado!",
                  "El producto ha sido eliminado.",
                  "success"
                ).then(() => {
                location.reload(); 
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
