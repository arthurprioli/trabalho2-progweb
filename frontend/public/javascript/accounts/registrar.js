"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnRegister');
    if (!btn) {
        console.error('Botão btnRegister não encontrado!');
        return;
    }
    btn.addEventListener('click', (evento) => {
        evento.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const password_confirm = document.getElementById('password_confirm').value;
        const role = document.getElementById('role').value;
        const msg = document.getElementById('msg');
        if (password !== password_confirm) {
            msg.innerHTML = '<div class="alert alert-danger">As senhas devem ser iguais.</div>';
            return;
        }
        fetch(backendAddress + 'accounts/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, password_confirm, email, role })
        })
            .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', data.user.role);
                    window.location.replace('index.html');
                });
            }
            else {
                return response.json().then(err => {
                    msg.innerHTML = `<div class="alert alert-danger">${err.detail || 'Erro no cadastro'}</div>`;
                }).catch(() => {
                    msg.innerHTML = '<div class="alert alert-danger">Erro de conexão</div>';
                });
            }
        })
            .catch(err => console.error(err));
    });
});
