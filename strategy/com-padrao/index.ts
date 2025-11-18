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