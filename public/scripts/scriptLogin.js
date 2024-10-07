document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const formData = new FormData(this); 
  const data = {
    username: formData.get('username'), 
    password: formData.get('password')
  }; 

  if (!data.username || !data.password) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor ingresa un nombre de usuario y contraseña.'
    });
    return;
  }

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    // Verificar el código de estado de la respuesta
    if (!response.ok) {
      // Si la respuesta no es correcta, devolver un mensaje de error
      return response.json().then(result => {
        throw new Error(result.message || 'Usuario o contraseña incorrectos.');
      });
    }
    return response.json();
  })
  .then(result => {
    // Si la respuesta es exitosa
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Inicio de sesión exitoso.',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = "/products";
    });
  })
  .catch(error => {
    // Manejo de errores
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Hubo un problema con el servidor.'
    });
  });
});
