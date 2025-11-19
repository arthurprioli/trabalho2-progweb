onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const idPlace = document.getElementById('id') as HTMLSpanElement;
  if (id)
  {
    idPlace.innerHTML = id;
    fetch(backendAddress + "posicoes/pos/" + id + '/')
    .then(res => res.json())
    .then(posicao => {
      let campos = ['id', "nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"]
      for (let i = 0; i < campos.length; i++)
      {
        console.log(document.getElementById(campos[i]));
        (document.getElementById(campos[i]) as HTMLInputElement).value = posicao[campos[i]];
      }
    })
    .catch(err => { console.log(err)});
  }
  else
  {
    idPlace.innerHTML = "URL mal formada: " + window.location;
  }

  (document.getElementById("atualiza") as HTMLButtonElement)
    .addEventListener('click', (evento) => {
      evento.preventDefault();
      const form = document.getElementById("formpos") as HTMLFormElement;
      const elements = form.elements;
      let data: Record<string, string> = {};
      for (let i = 0; i < elements.length; i++)
      {
        const element = elements[i] as HTMLInputElement;
        data[element.name] = element.value;
      }
      fetch(backendAddress + "posicoes/pos/" + id + "/", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        if (res.ok)
        {
          (document.getElementById("mensagem") as HTMLDivElement).innerHTML = "Sucesso atualizando dados!";
        }
        else
        {
          (document.getElementById("mensagem") as HTMLDivElement).innerHTML = "Erro: " + res.status + " " + res.statusText;
        }
      })
      .catch(err => {console.log(err)});
    })
}
