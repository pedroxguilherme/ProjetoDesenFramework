document.addEventListener('DOMContentLoaded'), function(){


    const apiUrl = 'http://localhost:3000/lista-jogos';


    function carregarJogos(){
        
        fetch(apiUrl)
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
                            <td>${disponibilidade}</td>
                            <td>
        
                                <button class="btn btn-success btn-retirar" data-id="${jogo.id}">Deletar ${jogo.id}r</button>
                            </td>
                        </tr>
                    `;
                    jogoBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Erro ao carregar os jogos:', error));


 



    }
/*
    function DeletarJogo(jogoId) {
        fetch(`${apiUrl}/${jogoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            }),
        })
        .then(() => carregarJogos())
        .catch(error => console.error('Erro ao retirar o livro:', error));
    }




*/


}