window.addEventListener('load', () => {
    const token = localStorage.getItem('token');

    // Elementos do DOM
    const divLogged = document.getElementById('logged') as HTMLDivElement;
    const divUnlogged = document.getElementById('unlogged') as HTMLDivElement;
    const spanIdentificacao = document.getElementById('identificacao') as HTMLSpanElement;

    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: {
            'Authorization': tokenKeyword + token
        }
    })
    .then(response => {
        // Se a resposta for OK (usuário logado)
        if (response.ok) {
            response.json().then(usuario => {
                // LOGADO: Remove d-none do logged, adiciona d-none no unlogged
                divLogged.classList.remove('d-none');
                divUnlogged.classList.add('d-none');

                spanIdentificacao.innerHTML = usuario.username;
            });
        } else {
            // Se der erro (401 - Não autorizado ou Token inválido)
            throw new Error('Token inválido ou não logado');
        }
    })
    .catch(() => {
        // NÃO LOGADO (Visitante)
        // Garante que logged está escondido e unlogged visível
        divLogged.classList.add('d-none');
        divUnlogged.classList.remove('d-none');

        spanIdentificacao.innerHTML = 'visitante';
    });
});