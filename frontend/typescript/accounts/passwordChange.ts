window.addEventListener('load', (e) => {
    (document.getElementById("formulario") as HTMLFormElement).addEventListener('click', async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        fetch(backendAddress + 'accounts/token-auth/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": tokenKeyword + token,
            },
            body: JSON.stringify({
                old_password: (document.getElementById("old_password") as HTMLInputElement).value,
                new_password1: (document.getElementById("new_password1") as HTMLInputElement).value,
                new_password2: (document.getElementById("new_password2") as HTMLInputElement).value,  
            })
        })
        .then((response: Response) => {
            if (response.ok) {
               console.log("Trocou senha com sucesso!");
               return response.json() 
            } else {
                console.log("Erro ao trocar senha " + response);
                throw new Error("Erro ao trocar senha: " + response)
            }
        })
        .then((data: {token:string}) => {
            const token: string = data.token;
            localStorage.setItem('token', token)
            window.location.replace('passwordChangeDone.html');
        })
        .catch(error => {
            console.error("Ocorreu um erro: ", error)
        })
    })
})