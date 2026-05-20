import express, { json } from 'express'; // importanto express para o projeto
const app = express(); // criando uma aplicação express ( instancia )

app.use(json()); // o "traduz" do JSON para o Express


// ---- filmes

const filmes = [ // array de filmes
    {id: 1, titulo: 'O Senhor dos Anéis', categoria: "Ação"},
    {id: 2, titulo: 'Harry Potter e a Pedra Filosofal', categoria: "Aventura"},
    {id: 3, titulo: 'Matrix', categoria: "Ficção Científica"},
    {id: 4, titulo: 'O Código Da Vinci', categoria: "História"}
]; 

const selecoes = [ // array de filmes
    {id: 1, titulo: 'Brasil', categoria: "America do Sul"},
    {id: 2, titulo: 'Argentina', categoria: "America do Sul"},
    {id: 3, titulo: 'Chile', categoria: "America do Sul"},
    {id: 4, titulo: 'Colombia', categoria: "America do Sul"} 
]; 


app.get('/filmes', (req, res) => {
    res.json(filmes); // resposta ao cliente com o array de filmes
});


app.get('/selecoes', (req, res) => {
    res.json(selecoes); // resposta ao cliente com o array de selecoes
});

// ----
// ---- selefionar filmes por categoria

app.get('/filmes/:id', (req, res) =>{
    const id = req.params.id;
    const filmeEncontrado = filmes.find(f => f.id == id); // procurar entre os filmes pelo ID fornecido
    if(filmeEncontrado){
        res.status(200).json(filmeEncontrado) // se encontrou, retorna o filme encontrado
    } else {
        res.status(404).send('Filme não encontrado'); // se não encontrou, retorna uma mensagem de erro
    }
});

// ----
// ---- registro de novos filmes na lista

app.post('/filmes', (req, res) =>{
    const novoFilme = req.body; // obter os dados do novo filme do corpo da requisição
    filmes.push(novoFilme); // adicionar o novo filme ao array de filmes
    res.status(201).json(novoFilme) // retorna o novo filme criado com status 201 (Created)
});

// ----
// ---- 
app.post('/selecoes', (req, res) => {
    selecoes.push(req.body); // adicionar o novo filme ao array de filmes
    res.status(201).send('Seleção cadastrada com sucesso') // retorna o novo
});

// ----
// ---- deletar filmes selecionados pelo id
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id; // obter o ID do filme a ser deletado

    // 1. Achar o índice do filme no array de filmes
    const index = filmes.findIndex(f => f.id == id); // encontrar o índice do filme no array de filmes

    // 2. Usar o splice para remover ( se o index for diferente de -1)
    if(index >= 0){ 
        filmes.splice(index, 1); // remover o filme no índice especificado
        res.status(204).send('Filme deletado com sucesso!'); // retorna sem conteúdo
    }else{
        res.status(404).send('Filme não encontrado!'); // retorna um status 4
    }

});


// ----
export default app; // exportar o objeto app para ser usado em outros arquivos do projeto
