function exibeListaDePosicoes() {
	fetch(backendAddress + "posicoes/lista/")
		.then(res => res.json())
		.then(posicoes => {
			let campos = ["nome_pt", "nome_en", "categoria", "dificuldade", "descricao", "observacoes"];
			let tbody = document.getElementById("idtbody") as HTMLTableSectionElement;
			tbody.innerHTML = ""
			for (let posicao of posicoes) {
				let tr = document.createElement('tr') as HTMLTableRowElement;
				for (let i = 0; i < campos.length; i++) {
					let td = document.createElement('td') as HTMLTableCellElement;
					const key = campos[i]!;
					const value = posicao[key];
					const textContent = value == null ? "" : String(value);
					let texto = document.createTextNode(textContent) as Text;
					td.appendChild(texto);
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
		})
		.catch(error => {
			console.log("Erro:", error);
		});
}

onload = function () {
    (document.getElementById("insere") as HTMLButtonElement)
    .addEventListener('click', evento=> {location.href="inserePos.html" });
	exibeListaDePosicoes();
}

