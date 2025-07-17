const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Evento para abrir form de registro
signUpButton.addEventListener('click', () =>
  container.classList.add('right-panel-active')
);

// Evento para regresar al form de iniciar sesión
signInButton.addEventListener('click', () =>
  container.classList.remove('right-panel-active')
);

document.querySelector('.sign-up-container form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id_rol = 1;
  const name = form.nombre.value;
  const lastname = form.apellido.value;
  const phone = form.telefono.value;
  const email = form.email.value;
  const password = form.password.value;

  //window.location.href = '../dashboard/dashboard.html';

  try {
  const res = await fetch('https://c7bed46046a0.ngrok-free.app/api/users/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_rol, name, lastname, phone, email, password })
  });

  if (!res.ok) {
    const text = await res.text(); // captura error como texto si no es JSON válido
    throw new Error(`Error ${res.status}: ${text}`);
  }

  const data = await res.json();
  console.log(data);

  // Guardar sesión si tiene token (opcional si el registro no lo devuelve)
  if (data.success && data.data?.session_token) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }

  alert(data.message || 'Registro completado');
  
  window.location.href = '../dashboard/dashboard.html';
} catch (error) {
  console.error('Error al registrar:', error);
  alert('Error al registrar. Consulta la consola para más detalles.');
}

});


document.querySelector('.sign-in-container form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  //window.location.href = '../dashboard/dashboard.html';  http://192.168.1.5:3000/api/users/login
  const res = await fetch('https://c7bed46046a0.ngrok-free.app/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  console.log(data);
  if (data.success) {
    alert('Inicio de sesión exitoso');
    localStorage.setItem('user', JSON.stringify(data.data));
    window.location.href = '../dashboard/dashboard.html';
  } else {
    alert(data.message || 'Error al iniciar sesión');
  }
});
