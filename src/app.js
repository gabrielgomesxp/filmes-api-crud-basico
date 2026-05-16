const express = require('express'); // importanto express para o projeto
const app = express(); // criando uma aplicação express ( instancia )
const port = 3000; // definindo a porta que o servidor vai escutar
app.use(express.json()); // o "traduz" do JSON para o Express

// criar rota padrão raiz ( localhost:3000 )

// falar com a porta 3000
app.get('/', (req, res) => { // definindo uma rota GET para a aplicação
    res.send('Hello World!'); // resposta ao cliente
});

// escutar a porta 3000
app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
}); // função que vai ser executada quando o servidor estiver rodando



// ---- filmes

const filmes = [
    {id: 1, titulo: 'O Senhor dos Anéis', categoria: "Ação"},
    {id: 2, titulo: 'Harry Potter e a Pedra Filosofal', categoria: "Aventura"},
    {id: 3, titulo: 'Matrix', categoria: "Ficção Científica"},
    {id: 4, titulo: 'O Código Da Vinci', categoria: "História"}
]; // array de filmes

app.get('/filmes', (req, res) => {
    res.json(filmes); // resposta ao cliente com o array de filmes
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

