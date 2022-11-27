const ENDERECO_API_DELETE = 'http://localhost:8080/usuario';

const deleteForm = document.querySelector('#deletarCadastro');

function redirecionarPara(URLdeDestino) {
    window.location.replace(URLdeDestino);
}

deleteForm.addEventListener('click', (event) => {
    event.preventDefault();
    
    const id = pegarDadosDoUsuarioNoLocalStorage().id;
    
    fetch(`${ENDERECO_API_DELETE}/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            localStorage.removeItem('Autorização');
            redirecionarPara('/');
        });

});