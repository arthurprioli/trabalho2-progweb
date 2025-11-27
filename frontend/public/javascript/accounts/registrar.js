"use strict";
onload = (evento) => {
    document.getElementById('btnRegister').addEventListener('click', evento => {
        evento.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const password2 = document.getElementById('password2').value;
        const msg = document.getElementById('msg');
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
            .then((response) => {
            if (response.ok) {
                window.location.replace('registrarDone.html');
            }
            else {
                msg.innerHTML = 'Erro ao registrar: ' + response.status + ' ' + response.statusText;
            }
        })
            .catch(erro => { console.log(erro); });
    });
};
