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