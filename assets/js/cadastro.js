const cadastroForm = document.forms['cadastro'];

async function cadastrar(cadastro) {
    try {
        const requisicao = await fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            body: JSON.stringify(cadastro)
        });
        
        const resposta = requisicao.json();

        return resposta;
    }
    catch {
        alert('Erro: Tivemos problema com a comunicação com o servidor. Tente novamente em alguns minutos.');
        throw 'Servidor fora do ar!';
    }
}

function redirecionarPara(URLdeDestino) {
    window.location.replace(URLdeDestino);
}

cadastroForm.addEventListener('submit', (evento) => {
   
    evento.preventDefault();

    const inputs = evento.target.elements;
    
    
    const nomeCompleto = inputs.nomeCompleto.value;
    const email = inputs.email.value;
    
    const cadastro = { nomeCompleto, email }

    cadastrar(cadastro)
        .then(() => {
            redirecionarPara('/login');
        })
        .catch(error => {
            console.log(error);
            alert(`Problemas de comunicação com o servidor. Tente novamente em alguns minutos.`);
        });
});