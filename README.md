# Padrões de Desenvolvimento — Strategy e State

---

## 📌 Objetivo

Estudar e demonstrar 2 padrões comportamentais do GoF — **Strategy** e **State** — com explicações, exemplos em **TypeScript** mostrando *sem padrão* e *com padrão*, análise de pontos fortes/fracos, comparativo entre os padrões.

---

## 📂 Estrutura do repositório

```
padroes-de-desenvolvimento/
├── README.md
├── strategy/
│   ├── sem-padrao/
│   │   └── index.ts
│   └── com-padrao/
│       └── index.ts
├── state/
│   ├── sem-padrao/
│   │   └── index.ts
│   └── com-padrao/
│       └── index.ts
```

---

# 1) Strategy

## 🔎 O que é

O padrão **Strategy** encapsula algoritmos intercambiáveis dentro de objetos separados (estratégias), permitindo que o comportamento de um contexto mude em tempo de execução sem condicionais espalhados.

### ✅ Quando usar

* Várias variações de um algoritmo (ex.: cálculo de frete, descontos, ordenação).
* Evitar longos `if/else` ou `switch` baseados em tipo.
* Permitir extensão de comportamentos sem modificar o cliente.

### 🔧 Exemplo em TypeScript

#### ❌ Sem padrão (código com if/else)

```ts
// strategy/sem-padrao/index.ts

function calcularFrete(tipo: string, peso: number) {
  if (tipo === 'sedex') return peso * 12;
  if (tipo === 'pac') return peso * 7;
  if (tipo === 'motoboy') return peso * 5;
  throw new Error('Tipo de frete desconhecido');
}

console.log(calcularFrete('sedex', 2));
```

#### ✔ Com padrão Strategy

```ts
// strategy/com-padrao/index.ts

interface FreteStrategy {
  calcular(peso: number): number;
}

class SedexStrategy implements FreteStrategy {
  calcular(peso: number) { return peso * 12; }
}

class PacStrategy implements FreteStrategy {
  calcular(peso: number) { return peso * 7; }
}

class MotoboyStrategy implements FreteStrategy {
  calcular(peso: number) { return peso * 5; }
}

class CalculadoraFrete {
  constructor(private strategy: FreteStrategy) {}
  setStrategy(strategy: FreteStrategy) { this.strategy = strategy; }
  calcular(peso: number) { return this.strategy.calcular(peso); }
}

const calc = new CalculadoraFrete(new SedexStrategy());
console.log(calc.calcular(2));
calc.setStrategy(new MotoboyStrategy());
console.log(calc.calcular(2));
```

### ✔ Pontos fortes

* Remove condicionais; código mais limpo.
* Facilita teste unitário de cada estratégia.
* Permite adicionar novas estratégias sem alterar o contexto.

### ✖ Pontos fracos

* Aumenta número de classes/arquivos (overhead estrutural).
* Cliente precisa conhecer as estratégias ou receber uma fábrica.

---

# 2) State

## 🔎 O que é

O padrão **State** permite que um objeto altere seu comportamento quando seu estado interno muda — o objeto parecerá mudar de classe.

### ✅ Quando usar

* Máquinas de estado com regras de transição (ex.: pedidos, autenticação, fases de jogo).
* Quando muitos condicionales `if(state === X)` existem espalhados no objeto.

### 🔧 Exemplo em TypeScript

#### ❌ Sem padrão (vários ifs)

```ts
// state/sem-padrao/index.ts

class Pedido {
  status: 'novo' | 'pago' | 'enviado' | 'cancelado' = 'novo';

  pagar() {
    if (this.status !== 'novo') throw new Error('Não pode pagar');
    this.status = 'pago';
  }

  enviar() {
    if (this.status !== 'pago') throw new Error('Não pode enviar');
    this.status = 'enviado';
  }
}
```

#### ✔ Com padrão State

```ts
// state/com-padrao/index.ts

interface PedidoState {
  pagar(p: PedidoContext): void;
  enviar(p: PedidoContext): void;
}

class PedidoContext {
  private state: PedidoState;
  constructor(state: PedidoState) { this.state = state; }
  setState(state: PedidoState) { this.state = state; }
  pagar() { this.state.pagar(this); }
  enviar() { this.state.enviar(this); }
}

class NovoState implements PedidoState {
  pagar(p: PedidoContext) { p.setState(new PagoState()); console.log('Pago.'); }
  enviar() { throw new Error('Não pode enviar: pedido não pago'); }
}

class PagoState implements PedidoState {
  pagar(p: PedidoContext) { throw new Error('Já está pago'); }
  enviar(p: PedidoContext) { p.setState(new EnviadoState()); console.log('Enviado.'); }
}

class EnviadoState implements PedidoState {
  pagar(p: PedidoContext) { throw new Error('Já enviado'); }
  enviar(p: PedidoContext) { throw new Error('Já enviado'); }
}

const pedido = new PedidoContext(new NovoState());
pedido.pagar();
pedido.enviar();
```

### ✔ Pontos fortes

* Remove condicionais baseados em estado, organizando comportamento por estado.
* Facilita manutenção e extensão de novos estados.

### ✖ Pontos fracos

* Aumenta número de classes/arquivos.
* Transições complexas podem requerer lógica adicional para validação.

---

# Comparativo: Strategy × Observer × State

| Critério      |                                       Strategy |                                       State |
| ------------- | ---------------------------------------------: |  -----------------------------------------: |
| Propósito     |                          Encapsular algoritmos |  Permitir comportamento variável por estado |
| Complexidade  |                                    Baixa–Média |                                       Média |
| Acoplamento   |                   Baixo (contexto ↔ interface)                    Baixo (contexto ↔ estados) |
| Uso comum     |                 Cálculos, validações, política|                Máquinas de estado, workflows |
| Testabilidade | Muito boa (estratégias testáveis isoladamente) |        Boa (estados testáveis isoladamente) |
| Quando evitar |                     Poucas variações; overhead |     Estados simples sem regras de transição |

---

# Instruções para execução (node + ts-node)

1. `npm init -y`
2. `npm install typescript ts-node @types/node --save-dev`
3. `npx tsc --init` (opcional)
4. Para rodar um exemplo: `npx ts-node strategy/com-padrao/index.ts`

---

