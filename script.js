const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuToggle.setAttribute("aria-expanded", aberto);
});

document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("ano").textContent = new Date().getFullYear();

const galeria = document.getElementById("galeriaFotos");
const avisoApi = document.getElementById("avisoApi");
const botaoFotos = document.getElementById("novasFotos");

async function carregarFotos() {
  galeria.innerHTML = '<div class="carregando">Carregando fotos dos pets...</div>';
  avisoApi.textContent = "";
  try {
    const resposta = await fetch("https://dog.ceo/api/breeds/image/random/6");
    if (!resposta.ok) throw new Error("Não foi possível acessar a API.");
    const dados = await resposta.json();
    if (dados.status !== "success") throw new Error("A API não retornou as imagens.");
    galeria.innerHTML = "";
    dados.message.forEach((url, indice) => {
      const imagem = document.createElement("img");
      imagem.src = url;
      imagem.alt = `Foto de cachorro ${indice + 1}`;
      imagem.loading = "lazy";
      galeria.appendChild(imagem);
    });
  } catch (erro) {
    galeria.innerHTML = '<div class="carregando">Não foi possível carregar as fotos agora. Tente novamente.</div>';
    avisoApi.textContent = "Verifique sua conexão com a internet. API utilizada: dog.ceo.";
  }
}

botaoFotos.addEventListener("click", carregarFotos);
carregarFotos();

document.getElementById("formContato").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  document.getElementById("retornoForm").textContent =
    `Obrigado, ${nome}! Esta demonstração não envia os dados para um servidor.`;
  evento.target.reset();
});
