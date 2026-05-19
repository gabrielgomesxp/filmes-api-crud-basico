import app from './src/app.js'; // importando o arquivo app.js

const port = 3000; // definindo a porta que o servidor vai escutar


// criar rota padrão raiz ( localhost:3000 )

// falar com a porta 3000
app.get('/', (req, res) => { // definindo uma rota GET para a aplicação
    res.send('Hello World!'); // resposta ao cliente
});

// --------


// escutar a porta 3000
app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
}); // função que vai ser executada quando o servidor estiver rodando


