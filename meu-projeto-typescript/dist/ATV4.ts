// 1 - PRODUTOS
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

class ItemLoja implements Produto {
  id: number;
  nome: string;
  preco: number;

  constructor(id: number, nome: string, preco: number) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
  }
}

// 2 - DOCUMENTOS
interface Documento {
  titulo: string;
  conteudo: string;
}

class Texto implements Documento {
  titulo: string;
  conteudo: string;

  constructor(titulo: string, conteudo: string) {
    this.titulo = titulo;
    this.conteudo = conteudo;
  }

  exibir(): string {
    return "Título: " + this.titulo + ", Conteúdo: " + this.conteudo;
  }
}

// 3 - PRODUTO LOJA
interface ProdutoLoja {
  codigo: number;
  nome: string;
}

class Loja {
  produtos: ProdutoLoja[] = [];

  adicionarProduto(produto: ProdutoLoja): void {
    this.produtos[this.produtos.length] = produto;
  }

  buscarProdutoPorCodigo(codigo: number): ProdutoLoja | undefined {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].codigo === codigo) {
        return this.produtos[i];
      }
    }
    return undefined;
  }
}

// 4 - BIBLIOTECA
interface Livro {
  titulo: string;
  autor: string;
  disponivel: boolean;
}

class Biblioteca {
  livros: Livro[] = [];

  adicionarLivro(livro: Livro): void {
    this.livros[this.livros.length] = livro;
  }

  buscarLivrosDisponiveis(): Livro[] {
    const resultado: Livro[] = [];

    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].disponivel === true) {
        resultado[resultado.length] = this.livros[i];
      }
    }

    return resultado;
  }
}

// 5 - GESTÃO BIBLIOTECA
interface LivroBiblioteca {
  titulo: string;
  autor: string;
  genero: string;
  disponivel: boolean;
}

class BibliotecaGestao {
  livros: LivroBiblioteca[] = [];

  adicionarLivro(livro: LivroBiblioteca): void {
    this.livros[this.livros.length] = livro;
  }

  filtrarPorGenero(genero: string): LivroBiblioteca[] {
    const resultado: LivroBiblioteca[] = [];

    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].genero === genero) {
        resultado[resultado.length] = this.livros[i];
      }
    }

    return resultado;
  }

  buscarPorAutor(autor: string): LivroBiblioteca[] {
    const resultado: LivroBiblioteca[] = [];

    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].autor === autor) {
        resultado[resultado.length] = this.livros[i];
      }
    }

    return resultado;
  }

  obterLivrosDisponiveisOrdenados(): LivroBiblioteca[] {
    const disponiveis: LivroBiblioteca[] = [];

    for (let i = 0; i < this.livros.length; i++) {
      if (this.livros[i].disponivel === true) {
        disponiveis[disponiveis.length] = this.livros[i];
      }
    }

    for (let i = 0; i < disponiveis.length - 1; i++) {
      for (let j = i + 1; j < disponiveis.length; j++) {
        if (disponiveis[i].titulo > disponiveis[j].titulo) {
          const temp = disponiveis[i];
          disponiveis[i] = disponiveis[j];
          disponiveis[j] = temp;
        }
      }
    }

    return disponiveis;
  }
}

// TESTES
const item = new ItemLoja(1, "Mouse", 50);

const texto = new Texto("Aviso", "Esta é uma mensagem importante");
console.log(texto.exibir());

const loja = new Loja();
loja.adicionarProduto({ codigo: 1, nome: "Teclado" });
loja.adicionarProduto({ codigo: 2, nome: "Monitor" });

console.log(loja.buscarProdutoPorCodigo(2));

const biblioteca = new Biblioteca();
biblioteca.adicionarLivro({ titulo: "1984", autor: "George Orwell", disponivel: true });
biblioteca.adicionarLivro({ titulo: "Dom Casmurro", autor: "Machado de Assis", disponivel: false });

console.log(biblioteca.buscarLivrosDisponiveis());

const gestao = new BibliotecaGestao();
gestao.adicionarLivro({ titulo: "Duna", autor: "Frank Herbert", genero: "Ficção", disponivel: true });
gestao.adicionarLivro({ titulo: "It", autor: "Stephen King", genero: "Terror", disponivel: true });
gestao.adicionarLivro({ titulo: "Drácula", autor: "Bram Stoker", genero: "Terror", disponivel: false });

console.log(gestao.filtrarPorGenero("Terror"));
console.log(gestao.buscarPorAutor("Stephen King"));
console.log(gestao.obterLivrosDisponiveisOrdenados());