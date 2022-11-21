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

emailCadastro.addEventListener("keyup", () => {
    event.preventDefault()

    if(
        emailCadastro.value.length >= 4 &&
        emailCadastro.value.includes("@") &&
        emailCadastro.value.includes(".") && 
        emailCadastro.value.includes(".com") &&
        emailCadastro.checkValidity()
    )
    {
        emailLabel.innerHTML = "E-mail válido. "
        emailLabel.setAttribute("style", "color: green")
        emailCadastro.setAttribute('style', 'border-color: green')
        
    }else {
        emailLabel.setAttribute("style", "color: red")
        emailLabel.innerHTML = "E-mail *Insira um e-mail válido"
        emailCadastro.setAttribute('style', 'border-color: red')
    }

})

// const btnGetUser = document.querySelector(".btn")
// btnGetUser.addEventListener("click", async (e) => {
//     e.preventDefault()
//     let nome = nomeCadastro.value
//     let email = emailCadastro.value

//     // console.log(nome, email)

//     let urlGetUser = await fetch("http://localhost:8080/usuarios")
//     console.log(urlGetUser)
// })


function fazPost (url, body) {
    console.log("Body=", body)

    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.setRequestHeader("Access-Control-Allow-Origin", "*")
    request.send(JSON.stringify(body))

    request.onload = function () {
        console.log(this.responseText)
    }

    return request.responseText
}

// Deu certo, chamar a função cadastrar 
function cadastrarUsuario() {
    event.preventDefault()
    let url = "http://localhost:8080/usuarios"

    
    console.log(url)

    let nome = nomeCadastro.value
    let email = emailCadastro.value

    console.log(nome)
    console.log(email)

    body = {
        "nome": nome,
        "email": email
    }

    fazPost(url, body)
}