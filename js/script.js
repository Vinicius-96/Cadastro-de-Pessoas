const form = document.getElementById("cadastro-form");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const telefoneInput = document.getElementById("telefone");

const pessoasLista = document.getElementById("pessoas");
const pesquisarInput = document.getElementById("pesquisar");

let pessoas = [];
let pessoaSelecionada = -1;

function adicionarPessoa(nome, idade, telefone) {
  const pessoa = {
    nome,
    idade,
    telefone
  };

  if (pessoaSelecionada !== -1) {
    pessoas[pessoaSelecionada] = pessoa;
    pessoaSelecionada = -1;
  } else {
    pessoas.push(pessoa);
  }

  form.reset();
  atualizarLista();
}

function atualizarLista() {
  pessoasLista.innerHTML = "";

  const termo = pesquisarInput.value.toLowerCase();
  const pessoasFiltradas = pessoas.filter((pessoa) => {
    return (
      pessoa.nome.toLowerCase().includes(termo) ||
      pessoa.telefone.includes(termo)
    );
  });

  pessoasFiltradas.forEach((pessoa, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${pessoa.nome}, ${pessoa.idade}, ${pessoa.telefone}`;

    const btnAlterar = document.createElement("button");
    btnAlterar.innerText = "Alterar";
    btnAlterar.addEventListener("click", () => {
      nomeInput.value = pessoa.nome;
      idadeInput.value = pessoa.idade;
      telefoneInput.value = pessoa.telefone;
      pessoaSelecionada = index;
    });
    li.appendChild(btnAlterar);

    const btnExcluir = document.createElement("button");
    btnExcluir.innerText = "Excluir";
    btnExcluir.addEventListener("click", () => {
      pessoas.splice(index, 1);
      atualizarLista();
    });
    li.appendChild(btnExcluir);

    pessoasLista.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = nomeInput.value;
  const idade = idadeInput.value;
  const telefone = telefoneInput.value;
  adicionarPessoa(nome, idade, telefone);
});

pesquisarInput.addEventListener("input", atualizarLista);
