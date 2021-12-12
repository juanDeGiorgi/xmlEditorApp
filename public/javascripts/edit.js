window.addEventListener('load', () => {
  const Name = $('Name');
  const OBJName = $('OBJName');
  const Scale = $('Scale');
  const form = $('form-edit');
  const submit = $('submit-edit');

  const regexp = /^\d+\.\d{0,2}$/;

  const check = (e) => {
    const tecla = document.all ? e.keyCode : e.which;

    // Tecla de retroceso para borrar, siempre la permite
    if (tecla === 8) {
      return true;
    }

    // Patron de entrada, en este caso solo acepta numeros y letras
    const patron = /[A-Za-z0-9]/;
    const teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  };

  // validaciones front

  Name.addEventListener('keyup', (e) => {
    if (Name.value.trim() === '') {
      $('nameError').innerHTML = 'El nombre es obligatorio';
      Name.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else if (!check(e)) {
      $('nameError').innerHTML =
        'El nombre no puede contener caracteres especiales';
      Name.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else {
      $('nameError').innerHTML = null;
      Name.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  OBJName.addEventListener('keyup', (e) => {
    if (OBJName.value.trim() === '') {
      $('OBJNameError').innerHTML = 'El nombre del archivo es obligatorio';
      OBJName.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else {
      $('OBJNameError').innerHTML = null;
      OBJName.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  Scale.addEventListener('keyup', (e) => {
    if (Scale.value.trim() === '') {
      $('scaleError').innerHTML = 'La escala es obligatoria';
      Scale.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else if (!regexp.test(Scale.value)) {
      $('scaleError').innerHTML = 'la escala tiene que ser decimal';
      Scale.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else {
      $('scaleError').innerHTML = null;
      Scale.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  form.addEventListener('submit', (e) => {
    let error = false;
    e.preventDefault();

    // input Namename
    if (Name.value.trim() === '') {
      $('nameError').innerHTML = 'El nombre es obligatorio';
      Name.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
      error = true;
    }

    if (OBJName.value.trim() === '') {
      $('OBJNameError').innerHTML = 'El nombre del archivo es obligatorio';
      OBJName.classList.add('is-invalid');
      submit.setAttribute('disabled', null);

      error = true;
    }

    if (Scale.value.trim() === '') {
      $('scaleError').innerHTML = 'La escala es obligatoria';
      Scale.classList.add('is-invalid');
      submit.setAttribute('disabled', null);

      error = true;
    } else if (!regexp.test(Scale.value)) {
      $('scaleError').innerHTML = 'la escala tiene que ser decimal';
      Scale.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
      error = true;
    }

    if (!error) {
      form.submit();
    }
  });
});
