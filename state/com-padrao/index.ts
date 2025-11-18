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