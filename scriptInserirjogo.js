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
                            <td>${disponibilidade}</td>
                        
                        </tr>
                    `;
                    jogoBody.innerHTML += row;
                });
                
            })
            .catch(error => console.error('Erro ao carregar os jogos:', error));

       

}
carregarJogos()

document.getElementById('formAdicionarJogo').addEventListener('submit', function (event) {
    event.preventDefault();
    const idJogo = document.getElementById('idJogo').value;
    const nomeJogo = document.getElementById('nomeJogo').value;
    const autorJogo = document.getElementById('autorJogo').value;
    const generoJogo = document.getElementById('generoJogo').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idJogo,
            nome: nomeJogo,
            autor: autorJogo,
            genero:generoJogo,
            disponivel: false
        }),
    })
    .then(response => response.json())
    .then(() => {
        $('#modalAdicionarLivro').modal('hide');
        carregarJogos();
    })
    .catch(error => console.error('Erro ao adicionar o livro:', error));
});





})