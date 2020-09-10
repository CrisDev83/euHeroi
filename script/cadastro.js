
function populateUfs () {
    const ufSelect = document.querySelector("select[name=nuf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json() })
    .then( estados => {
        for(const estado of estados)
        ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
    })
}

populateUfs ()

function getCidades(event) {
    const cidadeSelect = document.querySelector("select[name=ncidade]")
    const estadoInput = document.querySelector("input[name=estado]")

    const ufValue = event.target.value

    const indexOfSelectedEstado = event.target.selectedIndex
    estadoInput.value = event.target.options[indexOfSelectedEstado].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    
    cidadeSelect.innerHTML = "<option value>Selecione a Cidade</option>"
    cidadeSelect.disabled = true

    fetch(url)
    .then((res) => {return res.json() })
    .then( cidades => {
        
        for(const cidade of cidades) {
        cidadeSelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
      }

      cidadeSelect.disabled = false


    })
}


document
    .querySelector("select[name=nuf]")
    .addEventListener("change", getCidades)