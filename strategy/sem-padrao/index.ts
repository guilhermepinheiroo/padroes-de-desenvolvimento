function calcularFrete(tipo: string, peso: number) {
if (tipo === 'sedex') return peso * 12;
if (tipo === 'pac') return peso * 7;
if (tipo === 'motoboy') return peso * 5;
throw new Error('Tipo de frete desconhecido');
}


console.log(calcularFrete('sedex', 2));