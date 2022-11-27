var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor:'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
  });

  const teste = document.querySelector(".slide-content");
  const inputBusca = document.querySelector("#input-busca")
  const btnBuscar = document.querySelector(".btn-buscar")
  const msgSucess = document.querySelector("#Sucess")
  const deputadoBuscado = document.querySelector(".DeputadoBuscado")

  const urlLink = `https://dadosabertos.camara.leg.br/api/v2/deputados`

  const BuscarDeputado = async () => {
    let url = await fetch(urlLink)
    let jsonLink = await url.json()
    let jsonLinkDados = jsonLink.dados
  
    let nomeDeputados = jsonLinkDados.map(({nome}) =>{
      return nome
    })
    return nomeDeputados
    
  }

  const CardsBusca = async () => {
    let urlCard = await fetch(urlLink)
    let jsonLinkCard = await urlCard.json()
    let jsonLinkCardDados = jsonLinkCard.dados
    
    let FirstLetra = inputBusca.value.charAt(0)
    let returFilter = jsonLinkCardDados.filter(item => {
      if(item.nome.charAt(0) == FirstLetra){
        return item
      }
    })
  
    let createCard = returFilter.filter(item => {
      if(inputBusca.value == item.nome){
        return item 
      }
    
    })
  
    createCard.map(async ({uri}) => {
      let uridep = uri
      let uriDeputadosUri = await fetch(uridep)
      let jsonUri = await uriDeputadosUri.json()
      let jsonUriDados = jsonUri.dados

  
      if(inputBusca.value === jsonUriDados.ultimoStatus.nome){
  
        const {id, ultimoStatus, nomeCivil, dataNascimento, municipioNascimento, ufNascimento, escolaridade} = jsonUriDados
  
        deputadoBuscado.innerHTML = `
        
        <div class="container-deputadoBusado">
  
            <div>
              <img class="imgBusca" src="${ultimoStatus.urlFoto}" alt="Foto ${ultimoStatus.nome}">
            </div>
  
            <div class="descriscao">
              <h3>${nomeCivil}</h3>
              <p>Nome Eleitoral : ${ultimoStatus.nome}</p>
  
                <div>
                  <span>Partido: ${ultimoStatus.siglaPartido}</span> | 
                  <span>Situação: Em ${ultimoStatus.situacao}</span>
                </div>
  
                  <div>
                    <p>Data de Nascimento: ${dataNascimento}</p>
                    <p>Original da cidade ${municipioNascimento} | Estado: ${ufNascimento}</p>
                    <p>Escolaridade: ${escolaridade}</p>
                    <span>E-mail : ${ultimoStatus.email}</span>
                  </div>
            </div>
        </div>
        `
  
        let uriDespesasDeputado = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas?ano=2022&mes=11&ordem=ASC`)
        let jsonUri = await uriDespesasDeputado.json();
        let jsonUriDadosDespesa = jsonUri.dados;
  
        jsonUriDadosDespesa.map(({tipoDocumento, nomeFornecedor, dataDocumento, valorDocumento, valorLiquido, urlDocumento}) => {
          deputadoBuscado.innerHTML += `
            <div>
              <h1>${tipoDocumento}</h1>
              <h2>${valorDocumento} - <em>Valor líquido ${valorLiquido}</em></h2>
              <p>Nome do forncecedor: ${nomeFornecedor}</p>
              <p>${dataDocumento}</p>
  
              <a href="${urlDocumento}">Link da despesa</a>
            </div>
          `
        })
    
      }
    }) 
    
  }
  
  btnBuscar.addEventListener("click", async ()=> {
    let bntBusca = await BuscarDeputado()
       
      if(bntBusca.includes(inputBusca.value)){
        msgSucess.innerHTML = `Buscado Deputado...`
        msgSucess.setAttribute("style", "color: green")
  
        setTimeout(() => {
          msgSucess.innerHTML = ""
          inputBusca.value = ""
        }, 3000); 
        inputBusca.focus()
      }else {
        msgSucess.innerHTML = `Deputado Não Existe`
        msgSucess.setAttribute("style", "color: red")
        deputadoBuscado.innerHTML = ''
        inputBusca.focus()
      }
      CardsBusca()
  })
  function deputados() {
    fetch(urlLink)
      .then(async (resultDeputados) => {
        if (!resultDeputados.ok) {
          throw new Error(resultDeputados.status);
        }
  
        var deputadoInfo = await resultDeputados.json();
        var deputadosDados = deputadoInfo.dados
  
        deputadosDados.map(({urlFoto, nome, siglaPartido, siglaUf, email}, indice) => {
          let divCol = document.querySelector(".card-wrapper");
  
          if(indice < 50) {
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
                      <ul class="comunicao">
                          <li class="linkComunicacao">
                              <a href="https://www.camara.leg.br/tv/" target="_blank">TV Câmara</a>
                          </li> 
                          | 
                          <li class="linkComunicacao">
                              <a href="https://www.camara.leg.br/radio/" target="_blank">Rádio Câmara</a>
                          </li>
                      </ul>
      
                      <a href="https://www.camara.leg.br/" target="_blank"class="button">Saiba Mais</a>
                  </div>
                </div>
                `;
          }
          teste.appendChild(divCol);
        });
      }).catch((e) => console.log(e));
  }
  deputados(); 