window.addEventListener('load', () => {
  const Name = $('Name');
  const OBJName = $('OBJName');
  const Scale = $('Scale');
  const form = $('formCreate');
  const submit = $('submit-create');

  // validaciones front

  Name.addEventListener('keyup', (e) => {
    if (Name.value === '') {
      $('nameError').innerHTML = 'El nombre es obligatorio';
      Name.classList.add('is-invalid');
      submit.setAttribute('disabled', null);
    } else {
      $('nameError').innerHTML = null;
      Name.classList.remove('is-invalid');
      submit.removeAttribute('disabled', null);
    }
  });

  OBJName.addEventListener('keyup', (e) => {
    if (OBJName.value === '') {
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
    if (Scale.value === '') {
      $('scaleError').innerHTML = 'La escala es obligatoria';
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
    if (Name.value === '') {
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
    }

    if (!error) {
      form.submit();
    }
  });
});
