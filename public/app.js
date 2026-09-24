const API_URL = '/api/produtos';


// Buscar produtos da API
async function carregarProdutos() {

    try {

        const resposta = await fetch(API_URL);

        const produtos = await resposta.json();

        mostrarProdutos(produtos);

    } catch (erro) {

        console.error('Erro ao carregar produtos:', erro);

    }
}


// Mostrar produtos na tela
function mostrarProdutos(produtos) {

    const lista = document.getElementById('listaProdutos');

    lista.innerHTML = '';

    if (produtos.length === 0) {

        lista.innerHTML = '<p>Nenhum produto cadastrado.</p>';

        return;
    }


    produtos.forEach(produto => {

        const elemento = document.createElement('div');

        elemento.classList.add('produto');

        elemento.innerHTML = `
            <h3>${produto.nome}</h3>

            <p>
                <strong>Quantidade:</strong>
                ${produto.quantidade}
            </p>

            <p>
                <strong>Preço:</strong>
                R$ ${Number(produto.preco).toFixed(2)}
            </p>
        `;

        lista.appendChild(elemento);

    });
}


// Cadastrar produto
async function cadastrarProduto(evento) {

    evento.preventDefault();


    const nome = document.getElementById('nome').value;

    const quantidade = document.getElementById('quantidade').value;

    const preco = document.getElementById('preco').value;


    const novoProduto = {

        nome: nome,

        quantidade: Number(quantidade),

        preco: Number(preco)

    };


    try {

        const resposta = await fetch(API_URL, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(novoProduto)

        });


        if (!resposta.ok) {

            const erro = await resposta.json();

            alert(erro.error);

            return;
        }


        const produtoCriado = await resposta.json();

        console.log('Produto cadastrado:', produtoCriado);


        // Limpa o formulário
        document.getElementById('formProduto').reset();


        // Atualiza a lista
        carregarProdutos();


    } catch (erro) {

        console.error('Erro ao cadastrar produto:', erro);

        alert('Não foi possível cadastrar o produto.');

    }

}


// Quando o formulário for enviado
document
    .getElementById('formProduto')
    .addEventListener('submit', cadastrarProduto);


// Carregar produtos quando a página abrir
carregarProdutos();