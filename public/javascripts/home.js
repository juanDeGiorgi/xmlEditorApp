
window.addEventListener('load',() => {
    const deleteForms = document.getElementsByTagName('form');

    for (let i = 0; i < deleteForms.length; i++) {
      deleteForms[i].addEventListener('submit',(e) => {
          e.preventDefault();
      
          Swal.fire({
              title: 'Estas seguro que quieres Eliminar este nodo ?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#0d6efd',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si estoy seguro',
              cancelButtonText: 'cancelar'
            }).then((result) => {
              if (result.isConfirmed) {
                deleteForms[i].submit();
              }
          })
        })
    }

})
