const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const btnEntrar = document.querySelector(".btn");

const msgError = document.querySelector("#msgError");
const msgSucces = document.querySelector("#msgSucces");

import {cadastrarUsuario} from './cadastro'

let cadastroUser = new cadastrarUsuario
console.log(cadastroUser)

btnEntrar.addEventListener("click", (e) => {
  e.preventDefault();
  
  getUser()
    

});

function getUser(){
    let url = fetch("http://localhost:8080/usuarios")
    .then((res) => res.json())
    .then((data) => {

        // console.log(data)

      data.filter((item) => {

        const {nome, email } = item
        // console.log(nome, email)
        
        if(nameInput.value === nome && emailInput.value === email){

            console.log(nameInput.value)
            // console.log(nameInput.value)
            nameInput.value = ""
            emailInput.value = "" 

            window.location.href = 'http://127.0.0.1:5503/index.html'


        }
        
      });
    });
}
