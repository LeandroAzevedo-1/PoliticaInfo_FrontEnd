
function deslogar() {
  localStorage.removeItem('Autorização');
  window.location.reload();
}

function estouAutenticado() {
  
  const autorizacao = JSON.parse(localStorage.getItem('Autorização'));
  const elementoNav = document.querySelector('#navbar');

  if(autorizacao) {
      
      const usuario = autorizacao.usuario;

      elementoNav.innerHTML += `
          <li class="nav-item">
              <span class="nav-link">${usuario.nome}</span>
          </li>
          <li class="nav-item">
              <span class="nav-link" data-bs-toggle="modal" data-bs-target="#modalEdicao">Editar</span>
          </li>
          <li class="nav-item">
              <span class="nav-link" onclick="deslogar()">Sair</span>
          </li>
      `;
  }
  else {
      
      elementoNav.innerHTML += `
          <li class="nav-item">
              <a class="nav-link logado" href="login/">Login</a>
          </li>
      `;
  }
}

window.addEventListener('load', () => estouAutenticado());