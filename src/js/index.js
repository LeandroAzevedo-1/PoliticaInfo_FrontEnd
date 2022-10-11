const teste = document.querySelector(".slide-content");
function deputados() {
  fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados`) 
    .then(async (resultDeputados) => {
      if (!resultDeputados.ok) {
        throw new Error(resultDeputados.status);
      }

      var deputadoInfo = await resultDeputados.json();

      console.log(deputadoInfo.dados); //para usar a api do swagger, não precisa o ( dados )
      deputadoInfo.dados.map((item) => {

        let divCol = document.querySelector(".card-wrapper");

        divCol.innerHTML += `
              <div class="card swiper-slide">
              <div class="image-content">
                  <span class="overlay"></span>

                  <div class="card-image">
                      <img src="${item.urlFoto}" alt="Foto Deputado" class="card-img">
                  </div>
              </div>

              <div class="card-content">
                  <h2 class="name">${item.nome}</h2>
                  <p class="descricao">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione nihil tenetur fuga
                      atque
                      impedit reprehenderit
                  </p>

                  <button class="button">Saiba Mais</button>
              </div>
          </div>
            `;
        teste.appendChild(divCol);

        // console.log(
        //   `${item.nome} ${item.siglaPartido} ${item.siglaUf} ${item.urlFoto}`
        // );
      });
    })
    .carch((e) => console.log(e));
}
console.log(deputados());
