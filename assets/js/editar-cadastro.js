const ENDERECO_API = 'http://localhost:8080/usuario';

const editarForm = document.forms['editarCadastro'];

async function editar(cadastroEditado) {
    const { id } = cadastroEditado;
    try {
        const requisicao = await fetch(`${ENDERECO_API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastroEditado)
        });
        
        const resposta = requisicao.json();

        return resposta;
    }
    catch {
        alert('Erro: Tivemos problema com a comunicação com o servidor. Tente novamente em alguns minutos.');
        throw 'Servidor fora do ar!';
    }
}

function pegarDadosDoUsuarioNoLocalStorage() {
    const autorizacao = JSON.parse(localStorage.getItem('Autorização'));
    
    if(autorizacao) {
        const { usuario } = autorizacao;

        return usuario;
    }
}

function atualizarDadosDoUsuarioNoLocalStorage(autorizacaoAtualizada) {
    const autorizacao = JSON.parse(localStorage.getItem('Autorização'));

    if(autorizacao && autorizacaoAtualizada) {

        autorizacao.usuario.nome = autorizacaoAtualizada.nome;
        autorizacao.usuario.email = autorizacaoAtualizada.email; 

        localStorage.removeItem('Autorização');
        localStorage.setItem('Autorização', JSON.stringify(autorizacao));
    }
}

function redirecionarPara(URLdeDestino) {
    window.location.replace(URLdeDestino);
}

window.addEventListener('load', () => {
    const usuarioAtual = pegarDadosDoUsuarioNoLocalStorage();

    if(usuarioAtual) {
        const nomeCompleto = document.querySelector('#nomeCompletoModal');
        const email = document.querySelector('#emailModal');
    
        nomeCompleto.value = usuarioAtual.nome;
        email.value = usuarioAtual.email;
    }
})

editarForm.addEventListener('submit', (evento) => {
   
    evento.preventDefault();
    
    const inputs = evento.target.elements;
    
    const nome = inputs.nomeCompletoModal.value;
    const email = inputs.emailModal.value;

    const id = pegarDadosDoUsuarioNoLocalStorage().id;

    const cadastroEditado = { id, nome, email }

    editar(cadastroEditado)
        .then(() => {
            atualizarDadosDoUsuarioNoLocalStorage(cadastroEditado);
            redirecionarPara('/');
        })
        .catch(error => {
            console.log(error);
            alert(`Problemas de comunicação com o servidor. Tente novamente em alguns minutos.`);
        });
});