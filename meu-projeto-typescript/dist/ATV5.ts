// 1 - SISTEMA DE TAREFAS E PROJETOS
abstract class TaskManager {
  protected tasks: { nome: string; tipo: string }[] = [];

  abstract addTask(task: string): void;

  listTasks(): string[] {
    const lista: string[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      lista[lista.length] = this.tasks[i].nome;
    }
    return lista;
  }
}

class Project extends TaskManager {
  addTask(task: string): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].nome === task && this.tasks[i].tipo === "projeto") {
        return;
      }
    }
    this.tasks[this.tasks.length] = { nome: task, tipo: "projeto" };
  }
}

class DailyTasks extends TaskManager {
  addTask(task: string): void {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].nome === task && this.tasks[i].tipo === "diaria") {
        return;
      }
    }
    this.tasks[this.tasks.length] = { nome: task, tipo: "diaria" };
  }
}


// 2 - INVENTÁRIO
abstract class Inventory {
  protected items: Record<string, number> = {};

  abstract addItem(item: string, quantity: number): void;
  abstract removeItem(item: string): void;
  abstract getInventory(): Record<string, number>;
}

class WarehouseInventory extends Inventory {
  addItem(item: string, quantity: number): void {
    if (this.items[item] === undefined) {
      this.items[item] = quantity;
    } else {
      this.items[item] += quantity;
    }
  }

  removeItem(item: string): void {
    delete this.items[item];
  }

  getInventory(): Record<string, number> {
    return this.items;
  }
}

class StoreInventory extends Inventory {
  addItem(item: string, quantity: number): void {
    if (this.items[item] === undefined) {
      this.items[item] = 0;
    }

    const novoTotal = this.items[item] + quantity;

    if (novoTotal > 10) {
      this.items[item] = 10;
    } else {
      this.items[item] = novoTotal;
    }
  }

  removeItem(item: string): void {
    delete this.items[item];
  }

  getInventory(): Record<string, number> {
    return this.items;
  }
}


// 3 - GERENCIADOR DE FAVORITOS
abstract class FavoriteManager {
  protected favorites: string[] = [];

  abstract addFavorite(item: string): void;
  abstract getFavorites(): string[];
}

class MoviesFavoriteManager extends FavoriteManager {
  addFavorite(item: string): void {
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i] === item) {
        return;
      }
    }
    this.favorites[this.favorites.length] = item;
    this.favorites.sort();
  }

  getFavorites(): string[] {
    return this.favorites;
  }
}

class BooksFavoriteManager extends FavoriteManager {
  addFavorite(item: string): void {
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i] === item) {
        return;
      }
    }
    const novaLista: string[] = [item];

    for (let i = 0; i < this.favorites.length; i++) {
      novaLista[novaLista.length] = this.favorites[i];
    }
    this.favorites = novaLista;
  }

  getFavorites(): string[] {
    return this.favorites;
  }
}


// 4 - SISTEMA DE VOTAÇÃO
abstract class VoteSystem {
  protected votes: Record<string, number> = {};

  abstract voteFor(candidate: string): void;
  abstract getResults(): object;
}

class Election extends VoteSystem {
  voteFor(candidate: string): void {
    if (this.votes[candidate] === undefined) {
      this.votes[candidate] = 1;
    } else {
      this.votes[candidate]++;
    }
  }

  getResults(): object {
    return this.votes;
  }
}

class Poll extends VoteSystem {
  voteFor(candidate: string): void {
    if (this.votes[candidate] === undefined) {
      this.votes[candidate] = 1;
    } else {
      this.votes[candidate]++;
    }
  }

  getResults(): object {
    const lista: { nome: string; votos: number }[] = [];

    for (const nome in this.votes) {
      lista[lista.length] = { nome: nome, votos: this.votes[nome] };
    }

    for (let i = 0; i < lista.length - 1; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        if (lista[j].votos > lista[i].votos) {
          const temp = lista[i];
          lista[i] = lista[j];
          lista[j] = temp;
        }
      }
    }

    const resultado: string[] = [];
    for (let i = 0; i < lista.length; i++) {
      resultado[resultado.length] = lista[i].nome;
    }

    return resultado;
  }
}


// TESTES
const projeto = new Project();
projeto.addTask("Criar tela de login");
projeto.addTask("Criar API");
projeto.addTask("Criar tela de login");
console.log(projeto.listTasks());

const diaria = new DailyTasks();
diaria.addTask("Estudar");
diaria.addTask("Treinar");
diaria.addTask("Estudar");
console.log(diaria.listTasks());

const warehouse = new WarehouseInventory();
warehouse.addItem("Parafuso", 100);
warehouse.addItem("Porca", 200);
console.log(warehouse.getInventory());

const store = new StoreInventory();
store.addItem("Caneta", 5);
store.addItem("Caneta", 10);
console.log(store.getInventory());

const filmes = new MoviesFavoriteManager();
filmes.addFavorite("Matrix");
filmes.addFavorite("Avatar");
filmes.addFavorite("Matrix");
console.log(filmes.getFavorites());

const livros = new BooksFavoriteManager();
livros.addFavorite("Clean Code");
livros.addFavorite("O Hobbit");
console.log(livros.getFavorites());

const eleicao = new Election();
eleicao.voteFor("Ana");
eleicao.voteFor("Ana");
eleicao.voteFor("João");
console.log(eleicao.getResults());

const enquete = new Poll();
enquete.voteFor("Maria");
enquete.voteFor("Pedro");
enquete.voteFor("Maria");
console.log(enquete.getResults());
