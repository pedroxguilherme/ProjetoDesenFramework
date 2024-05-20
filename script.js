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
                            <td>${jogo.nome}</td>
                            <td>${jogo.autor}</td>
                            <td>
                                <button class="btn btn-danger btn-deletar" data-id="${jogo.id}">Deletar ${jogo.id}</button>
                            </td>
                            <td>
                                <button class="btn btn btn-primary btn-update" data-id="${jogo.id}">Update ${jogo.id}</button>
                            </td>
                        </tr>
                    `;
                    jogoBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Erro ao carregar os jogos:', error));

           

    }
    carregarJogos();


   function deletarJogo(jogoId) {
        fetch(`${apiUrl}/${jogoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            console.log(`Jogo com id ${jogoId} deletado.`);
            carregarJogos();
        })
        .catch(error => console.error('Erro ao deletar o jogo:', error));
    }


    carregarJogos();




})