const teste = document.querySelector(".slide-content");
function deputados() {
  fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados`)
    .then(async (resultDeputados) => {
      if (!resultDeputados.ok) {
        throw new Error(resultDeputados.status);
      }

      var deputadoInfo = await resultDeputados.json();
      var deputadosDados = deputadoInfo.dados

      // console.log(deputadosDados)

      deputadosDados.map(({urlFoto, nome, siglaPartido, siglaUf, email}) => {
        let divCol = document.querySelector(".card-wrapper");

        divCol.innerHTML += 
        `
            <div class="card swiper-slide">
              <div class="image-content">
                  <span class="overlay"></span>

                  <div class="card-image">
                      <img src="${urlFoto}" alt="Foto Deputado" class="card-img">
                  </div>
              </div>

              <div class="card-content">
                  <h2 class="name">${nome}</h2>
                  <p>${email}</p>
                  <p class="descricao">
                      ${siglaPartido} | ${siglaUf}
                  </p>

                  <a href="https://www.camara.leg.br/" target="_blank"class="button">Saiba Mais</a>
              </div>
            </div>
            `;
        teste.appendChild(divCol);
      });
    }).carch((e) => console.log(e));
}
deputados(); 



