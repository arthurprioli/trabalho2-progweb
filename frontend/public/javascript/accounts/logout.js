"use strict";
onload = (evento) => {
    // É boa prática verificar se o elemento existe antes de adicionar o listener
    const btnLogout = document.getElementById('logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (evento) => {
            const token = localStorage.getItem('token');
            fetch(backendAddress + 'accounts/token-auth/', {
                method: 'DELETE',
                headers: {
                    'Authorization': tokenKeyword + token,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                const mensagem = document.getElementById('mensagem');
                if (response.ok) {
                    localStorage.removeItem('token'); // Remove o token
                    localStorage.removeItem('role'); // Remove a permissão (admin/estudante)
                    window.location.assign('/');
                }
                else {
                    if (mensagem) {
                        mensagem.innerHTML = 'Erro ' + response.status;
                    }
                }
            })
                .catch(erro => { console.log(erro); });
        });
    }
};
