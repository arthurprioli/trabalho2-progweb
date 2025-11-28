onload = () => {
    const btnLogin = document.getElementById('btnLogin') as HTMLInputElement;

    if (btnLogin) {
        btnLogin.addEventListener('click', evento => {
            evento.preventDefault();

            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;
            const msg = (document.getElementById('msg') as HTMLDivElement);

            fetch(backendAddress + 'accounts/token-auth/', {
                method: 'POST',
                body: JSON.stringify({
                    'username': username,
                    'password': password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    if (response.status == 401) {
                        msg.innerHTML = 'Usuário ou senha inválidos.'
                    }
                    throw new Error('Falha na autenticação');
                }
            })
            .then((data: { token: string }) => {
                localStorage.setItem('token', data.token);
                return fetch(backendAddress + "accounts/logged_info/", {
                    method: "GET",
                    headers: {
                        "Authorization": tokenKeyword + data.token
                    }
                });
            })
            .then(res => res.json())
            .then(profile => {
                localStorage.setItem("role", profile.role);
                window.location.replace('index.html');
            })
            .catch(erro => {
                console.log(erro);
                localStorage.removeItem('token');
            });
        });
    }
};