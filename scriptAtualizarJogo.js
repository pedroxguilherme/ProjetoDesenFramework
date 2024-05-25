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
                    </tr>
                `;
                jogoBody.innerHTML += row;
            });
            
        })
        .catch(error => console.error('Erro ao carregar os jogos:', error));

       

}
carregarJogos()

function atualizar(idjogo) {
    fetch(`${apiUrl}/${idjogo}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            
            nome:"",
            autor:"",
            genero:""
            
        }),
    })
    .then(() => carregarJogos())
    .catch(error => console.error('Erro ao retirar o jogo:', error));
}

})