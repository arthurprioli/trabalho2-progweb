<h1>Introdução</h1>
Esse é o repositório do frontend do nosso projeto de posições de jiujitsu para a disciplina de programação para a web INF1407.
Projeto inteiramente desenvolvido por Felipe Barcellos e Arthur Prioli.
O objetivo desse site é que seja possível fazer login com um papel de estudante ou de professor. O aluno possuirá uma visão do site, em que ele poderá marcar as posições de luta como aprendidas, enquanto os professores poderão adicionar e remover as posições que são disponibilizadas no site.
Também é possível que o usuário esqueça a senha do seu login, então também foi implementado um email de redefinição de senha.
A dificuldade desse trabalho é o funcionamento totalmente isolado do front (typescript) e backend(Django/python), diferentemente do primeiro trabalho da disciplina.
link do backend: https://github.com/arthurprioli/INF1407-backend-bjj?tab=readme-ov-file
<h1>Descrição do projeto</h1>
Este projeto consiste no frontend completo do sistema de gerenciamento e aprendizado de posições de Jiu-Jitsu, desenvolvido para a disciplina INF1407 – Programação para a Web.
O objetivo principal é fornecer uma aplicação web moderna, totalmente em HTML + CSS + Bootstrap no layout, e TypeScript na lógica, funcionando independentemente do backend (que é implementado em Django).
O sistema permite que usuários acessem e interajam com uma base de posições de Jiu-Jitsu, oferecendo funcionalidades distintas de acordo com o papel (role) do usuário:<br>
<h2>👤 Estudante</h2>
<ul>
<li>Pode visualizar todas as posições cadastradas.</li>
<li>Pode marcar posições como aprendidas.</li>
<li>Possui interface limitada, sem acesso administrativo.</li>
</ul>
<h2>👨‍🏫 Professor / Admin </h2>
<ul>
<li>Pode adicionar novas posições ao sistema.</li>
<li>Pode remover posições existentes.</li>
<li>Possui acesso ao painel administrativo de controle.</li>
<li>Vê versões expandidas das páginas com botões exclusivos (Insere / Remove).</li>
</ul>
<h2>Autenticação e Fluxo de Usuário</h2>
O frontend se comunica com o backend por meio de chamadas HTTP empregando Token Authentication.
O usuário pode:
<ul>
<li>Criar conta</li>
<li>Entrar com login e senha</li>
<li>Recuperar senha via e-mail (fluxo completo de password reset)</li>
<li>Persistir sessão usando localStorage</li>
<li>Carregar dinamicamente permissões (student/admin)</li>
</ul>
<h2>Arquitetura do Frontend</h2>
O repositório é estruturado em duas camadas:
<ul>
<li>public/<br>
Contém as páginas HTML e os scripts JavaScript gerados automaticamente pelo TypeScript.</li>
<li>typescript/<br>
Contém todos os arquivos .ts, que são compilados para a pasta public/javascript/.
Cada funcionalidade do site possui seu próprio arquivo TS (login, logout, inserir, listar posições, etc.).</li>
</ul>
Comunicação com o Backend<br>
Todas as páginas utilizam chamadas fetch() para consumir o backend Django hospedado localmente ou via servidor remoto.
As URLs são centralizadas em um arquivo de constantes para facilitar a manutenção e a troca de ambientes.
<h2>O que funcionou?</h2>
Tudo que foi proposto no trabalho e mencionado acima é funcional. 
<h1>Instalação</h1>
Você irá abrir uma pasta no seu terminal e rodar esses comandos:<br>
git clone https://github.com/arthurprioli/trabalho2-progweb.git<br>
git clone https://github.com/arthurprioli/INF1407-backend-bjj.git<br>
Dessa maneira você terá instalado os dois repositórios, de front e backend respectivamente.

<h1>Instruções / Manual do usuário</h1>
Após clonar os repositórios vc irá abrir dois terminais e entrar no caminho dos repositórios e executar esse comando no terminal do frontend:<br>
cd .\frontend\public\<br>
python -m http.server 8080<br>
e esses comando no do backend:<br>
python -m venv .venv<br>
. .\.venv\Scripts\activate<br>
pip install -r requirements.txt
python .\LabJJ\manage.py runserver
Agora abra seu navegador e digite :<br>
http://127.0.0.1:8080<br>
para testar o swagger do backend é :<br>
http://127.0.0.1:8000/swagger/<br>

## Instruções para Rodar via Docker

1. Instale o Docker.
2. Puxe: `docker pull arthurprioli/t2-frontend:latest`
3. Rode: `docker run -p 8080:80 arthurprioli/t2-frontend:latest`
4. Acesse http://localhost:8080.
5. OBS: front-end depende do back-end estar sendo executado em outro terminal
