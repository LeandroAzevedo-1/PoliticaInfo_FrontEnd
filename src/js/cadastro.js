let nomeCadastro = document.querySelector("#nomeCadastro")
let nomeLabel = document.querySelector("#nomeLabel")

let emailCadastro = document.querySelector("#emailCadastro")
let emailLabel = document.querySelector("#emailLabel")


// Validação campo nome 
nomeCadastro.addEventListener("keyup", () => {
    if(nomeCadastro.value.length <= 2) {
        nomeLabel.setAttribute("style", "color: red")
        nomeLabel.innerHTML = "Nome * Insira no minímo 3 caracteres"
        nomeCadastro.setAttribute('style', 'border-color: red')
    }else {
        nomeLabel.setAttribute("style", "color: green")
        nomeLabel.innerHTML = "Nome"
        nomeCadastro.setAttribute('style', 'border-color: green')
    }
})

function cadastrar() {
    if ((emailCadastro.value.length >=1) &&
    (emailCadastro.value.length >=3) &&
    (emailCadastro.value.search("@")==-1) &&
    (emailCadastro.value.search("@")==-1) &&
    (emailCadastro.value.search(" ")==-1) &&
    (emailCadastro.value.search(" ")==-1) &&
    (emailCadastro.value.search(".")!=-1) &&
    (emailCadastro.value.indexOf(".") >=1)&&
    (emailCadastro.value.lastIndexOf(".") < emailCadastro.value.length - 1)) {
        emailLabel.innerHTML = "E-mail cadastrando..."
    }else {
        emailLabel.setAttribute("style", "color: red")
        emailLabel.innerHTML = "E-mail *Insira um e-mail válido"
        emailCadastro.setAttribute('style', 'border-color: red')
    }
}