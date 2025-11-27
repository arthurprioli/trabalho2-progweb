onload = (evento) => {
    (document.getElementById('btnRegister') as HTMLInputElement).addEventListener('click', evento => {
        evento.preventDefault();
        const username: String = (document.getElementById('username') as HTMLInputElement).value;
        const email: String = (document.getElementById('email') as HTMLInputElement).value;
        const password: String = (document.getElementById('password') as HTMLInputElement).value;
        const password2: String = (document.getElementById('password2') as HTMLInputElement).value;
        const msg = (document.getElementById('msg') as HTMLDivElement);
        if (password != password2) {
            msg.innerHTML = 'As senhas devem ser iguais.';
            return;
        }
        fetch(backendAddress + 'accounts/registrar/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: Response) => {
                if (response.ok) {
                    window.location.replace('registrarDone.html');
                }
                else {
                    msg.innerHTML = 'Erro ao registrar: ' + response.status + ' ' + response.statusText;
                }
            })
            .catch(erro => { console.log(erro) })
    });
}