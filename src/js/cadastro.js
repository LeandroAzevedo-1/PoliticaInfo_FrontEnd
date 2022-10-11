async function swaggerPoliticaInfo() {
    const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados`)
    return await response.json()
} 

console.log(swaggerPoliticaInfo())
// console.log(urlswagger)


// function valueInputsCadastro() {
//     const nameCadastro = document.querySelector('#name-cadastro').value
//     const emailCadastro = document.querySelector('#email-cadastro').value
    
//     console.log(nameCadastro)
//     console.log(emailCadastro)


    
// }
// // Evento clicar no botao e pegar os valores
// document.querySelector('#cadastrar').addEventListener('click', (e) => {
//     e.preventDefault()
    
//     valueInputsCadastro()
// })
