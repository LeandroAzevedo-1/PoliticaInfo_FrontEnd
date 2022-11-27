
const ENDERECO_API = 'http://localhost:8080/usuarios';

const loginForm = document.forms['login'];

function autenticar(credential) {
    try {
        const requisicao = await fetch(ENDERECO_API, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential)
        });

        const resposta = await requisicao.json();
        
        return resposta;
    }
    catch {
      alert('Erro: Tivemos problema com a comunicação com o servidor. Tente novamente em alguns minutos.');
      throw 'Servidor fora do ar!';
  } 
}

function guardarTokenComInfoDoUsuarioNoLocalStorage(tokenComInfoDoUsuario) {
    if(tokenComInfoDoUsuario) {
        localStorage.setItem('Autorização', JSON.stringify(tokenComInfoDoUsuario));
    }
}

function redirecionarPara(URLdeDestino) {
    window.location.replace(URLdeDestino);
}
 
loginForm.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const inputs = evento.target.elements;

    const nome = inputs.nome.value;
    const email = inputs.email.value;

    const credencial = { nome: nome, email: email }

    autenticar(credencial)
        .then(tokenComInfoDoUsuario => {
            if(tokenComInfoDoUsuario) {
                guardarTokenComInfoDoUsuarioNoLocalStorage(tokenComInfoDoUsuario);
                redirecionarPara('/');
            }
            else {
                alert(`Usuário ou senha incorretos!`);
            }
        })
        .catch(error => {
            console.log(error);
            alert(`Problemas de comunicação com o servidor. Tente novamente em alguns minutos.`);
        });

});
