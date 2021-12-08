const pass = $('password');
const eyePass = $('eye-pass');

// mostrar contraseña
eyePass.addEventListener('click', (e) => {
  e.preventDefault();
  if (+eyePass.value === 0) {
    pass.type = 'text';
    eyePass.value = 1;
    eyePass.classList.remove('pass-off');
    eyePass.classList.add('pass-on');
  } else {
    pass.type = 'password';
    eyePass.value = 0;
    eyePass.classList.remove('pass-on');
    eyePass.classList.add('pass-off');
  }
});
