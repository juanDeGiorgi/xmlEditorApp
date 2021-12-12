window.addEventListener('load', () => {
  const user = $('username');
  const pass = $('password');
  const eyePass = $('eye-pass');
  const form = $('formLogin');
  const submit = $('submit-login');

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

  // validaciones front

  user.addEventListener('keyup', (e) => {
    if (user.value === '') {
      $('errorUser').innerHTML = 'El usuario es obligatorio';
      user.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else {
      $('errorUser').innerHTML = null;
      user.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  pass.addEventListener('keyup', (e) => {
    if (pass.value === '') {
      $('errorPass').innerHTML = 'La contraseña es obligatoria';
      pass.classList.add('is-invalid');
      eyePass.style.display = 'none';
      submit.setAttribute('disabled', null);
    } else {
      $('errorPass').innerHTML = null;
      eyePass.style.display = 'initial';
      pass.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  form.addEventListener('submit', (e) => {
    let error = false;
    e.preventDefault();

    // input username
    if (user.value === '') {
      $('errorUser').innerHTML = 'El usuario es obligatorio';
      user.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
      error = true;
    }
    if (pass.value.trim() === '') {
      $('errorPass').innerHTML = 'La contraseña es obligatoria';
      pass.classList.add('is-invalid');
      eyePass.style.display = 'none';
      submit.setAttribute('disabled', null);

      error = true;
    }

    if (!error) {
      form.submit();
    }
  });
});
