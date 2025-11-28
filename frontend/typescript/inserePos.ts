onload = () => {
	(document.getElementById("insere") as HTMLButtonElement).addEventListener('click',
		evento => {
			evento.preventDefault();
			const elements = (document.getElementById("formpos") as HTMLFormElement).elements;
			let data: Record<string, string> = {};
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i] as HTMLInputElement;
				data[element.name] = element.value;
			}
			fetch(backendAddress + "posicoes/pos/", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {'Content-Type': 'application/json',
                   'Authorization': 'Token ' + localStorage.getItem('token')
         }
			})
				.then(res => {
					if (res.ok) {
						(document.getElementById("mensagem") as HTMLDivElement).innerText = "Dados inseridos com sucesso!";
					} else {
						(document.getElementById("mensagem") as HTMLDivElement).innerText = "Erro na inserção dos dados.";
					}
				})
				.catch(err => { console.log(err) })
		}
	)
}
