class Veiculo {
  mover(): void {
    console.log("O veículo está se movendo");
  }
}

class Carro extends Veiculo {
  mover(): void {
    console.log("O carro está dirigindo");
  }
}

class Bicicleta extends Veiculo {
  mover(): void {
    console.log("A bicicleta está pedalando");
  }
}

const carro = new Carro();
const bicicleta = new Bicicleta();

carro.mover();
bicicleta.mover();


abstract class FiguraGeometrica {
  abstract calcularArea(): number;
}

class Circulo extends FiguraGeometrica {
  raio: number;

  constructor(raio: number) {
    super();
    this.raio = raio;
  }

  calcularArea(): number {
    return Math.PI * this.raio * this.raio;
  }
}

class Quadrado extends FiguraGeometrica {
  lado: number;

  constructor(lado: number) {
    super();
    this.lado = lado;
  }

  calcularArea(): number {
    return this.lado * this.lado;
  }
}

class Triangulo extends FiguraGeometrica {
  base: number;
  altura: number;

  constructor(base: number, altura: number) {
    super();
    this.base = base;
    this.altura = altura;
  }

  calcularArea(): number {
    return (this.base * this.altura) / 2;
  }
}

function imprimirAreas(figuras: FiguraGeometrica[]): void {
  figuras.forEach((figura) => {
    console.log(figura.calcularArea());
  });
}

const figuras: FiguraGeometrica[] = [
  new Circulo(3),
  new Quadrado(4),
  new Triangulo(5, 2)
];

imprimirAreas(figuras);


class Pagamento {
  processar(): void {
    console.log("Processando pagamento...");
  }
}

class PagamentoCartao extends Pagamento {
  numeroCartao: string;

  constructor(numeroCartao: string) {
    super();
    this.numeroCartao = numeroCartao;
  }

  private validarCartao(): boolean {
    return this.numeroCartao.length === 16;
  }

  processar(): void {
    if (this.validarCartao()) {
      console.log("Pagamento com cartão processado");
    } else {
      console.log("Cartão inválido");
    }
  }
}

class PagamentoBoleto extends Pagamento {
  processar(): void {
    const codigo = "BOL" + Math.floor(Math.random() * 1000000);
    console.log(`Boleto gerado: ${codigo}`);
  }
}

function processarPagamentos(pagamentos: Pagamento[]): void {
  pagamentos.forEach((pagamento) => {
    pagamento.processar();
  });
}

const pagamentos: Pagamento[] = [
  new PagamentoCartao("1234567812345678"),
  new PagamentoBoleto()
];

processarPagamentos(pagamentos);


class Animal {
  private energia: number;

  constructor(energia: number = 50) {
    this.energia = energia;
  }

  protected alterarEnergia(valor: number): void {
    this.energia += valor;
  }

  comer(): void {
    this.alterarEnergia(10);
  }

  statusEnergia(): void {
    console.log(`Energia: ${this.energia}`);
  }
}

class Leao extends Animal {
  cacar(): void {
    this.alterarEnergia(-15);
    this.comer();
  }
}

class Passaro extends Animal {
  comer(): void {
    this.alterarEnergia(5);
  }
}

const animais: Animal[] = [
  new Leao(),
  new Passaro()
];

animais.forEach((animal) => {
  if (animal instanceof Leao) {
    animal.cacar();
  } else {
    animal.comer();
  }
  animal.statusEnergia();
});


abstract class Funcionario {
  protected nome: string;
  protected salario: number;

  constructor(nome: string, salario: number) {
    this.nome = nome;
    this.salario = salario;
  }

  abstract calcularBonus(): number;

  calcularSalarioFinal(): number {
    return this.salario + this.calcularBonus();
  }

  getNome(): string {
    return this.nome;
  }
}

class Gerente extends Funcionario {
  calcularBonus(): number {
    return this.salario * 0.1;
  }
}

class Operario extends Funcionario {
  calcularBonus(): number {
    return this.salario * 0.05;
  }
}

function calcularSalarioComBonus(funcionarios: Funcionario[]): void {
  funcionarios.forEach((funcionario) => {
    const total = funcionario.calcularSalarioFinal();
    console.log(`${funcionario.getNome()}: ${total}`);
  });
}

const funcionarios: Funcionario[] = [
  new Gerente("Ana", 5000),
  new Operario("Carlos", 3000)
];

calcularSalarioComBonus(funcionarios);
