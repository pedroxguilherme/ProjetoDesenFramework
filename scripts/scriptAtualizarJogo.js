document.addEventListener('DOMContentLoaded', function(){


    const apiUrl = 'http://localhost:3000/jogos';
    
    function carregarJogos(){
            
        fetch(apiUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
         })
    
            .then(response => response.json())
            .then(data => {
                const jogoBody = document.getElementById('jogos');
               jogoBody.innerHTML = '';
    
                data.forEach(jogo => {
                    const disponibilidade = jogo.disponivel ? 'Sim' : 'Não';
                    const row = `
                        <tr>
                            <td>${jogo.id}</td>
                            <td>${jogo.nome}</td>
                            <td>${jogo.autor}</td>
                            <td>${jogo.genero}</td>
                            <td>${jogo.disponivel}</td>
                            <td>
                    <button type="button" class="btn btn-primary btn-atualizar" data-toggle="modal" data-target="#modalAtualizarJogo" data-id="${jogo.id}" data-nome="${jogo.nome}" data-autor="${jogo.autor}" data-genero="${jogo.genero}">
                    >
                        Atualizar Jogo
                    </button>
                    
                    
                   
                    `;
                    jogoBody.innerHTML += row;
                });
                document.querySelectorAll('.btn-atualizar').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        const nome = this.getAttribute('data-nome');
                        const autor = this.getAttribute('data-autor');
                        const genero = this.getAttribute('data-genero');

                        document.getElementById('idJogo').value = id;
                        document.getElementById('nomeJogo').value = nome;
                        document.getElementById('autorJogo').value = autor;
                        document.getElementById('generoJogo').value = genero;
                    });
                });

            })
            .catch(error => console.error('Erro ao carregar os jogos:', error));
    
           
    
    }
    carregarJogos()
    


    document.getElementById('formAtualizarJogo').addEventListener('submit', function(event) {
        event.preventDefault();

        const idJogo = document.getElementById('idJogo').value;
        const nomeJogo = document.getElementById('nomeJogo').value;
        const autorJogo = document.getElementById('autorJogo').value;
        const generoJogo = document.getElementById('generoJogo').value;

        fetch(`${apiUrl}/${idJogo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeJogo,
                autor: autorJogo,
                genero: generoJogo,
                disponivel: true
            }),
        })
        .then(() => carregarJogos())
        .catch(error => console.error('Erro ao atualizar o jogo:', error));
    })
   
})