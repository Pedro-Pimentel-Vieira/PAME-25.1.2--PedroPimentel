const requisicao = require('readline-sync');
class Reserva{
    constructor(id, idCliente, idQuarto, dataEntrada, dataSaida, status) {
        this.id = id;
        this.idCliente = idCliente;
        this.idQuarto = idQuarto;
        this.status = status;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
}
class Funcionario {
    constructor(idFuncionario, nomeUsuario, cpf, email, senha,nome) {
        this.idFuncionario = idFuncionario;
        this.nomeUsuario = nomeUsuario;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.nome = nome
    }
}
class Cliente {
    constructor(idCliente, nome, cpf, email, senha) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}
class Quarto {
    constructor(id,nome, descricao, quantidadeCamas, precoPorNoite) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidadeCamas = quantidadeCamas;
        this.precoPorNoite = precoPorNoite;
    }
}
class Sistema{
    constructor(){
        // atributos da classe Sistema
        this.clientes = []; // array com dados dos clientes cadastrados
        this.funcionarios = []; // array com dados dos funcionários cadastrados
        this.quartos = []; // array com dados dos quartos cadastrados
        this.reservas = []; // array com dados das reservas registradas
        this.clienteLogado = null; // variável que define se há um cliente logado para manter um loop infinito no menu de cliente, ate que o usuario faça logout e essa variavel volta ao valor null
        this.funcionarioLogado = null // variável que define se há um funcionário logado para manter um loop infinito no menu de cliente, ate que o usuario faça logout e essa variavel volta ao valor null
        this.proximoIdCliente = 1; // controla o número de ID dos clientes
        this.proximoIdFuncionario = 1; // controla o número de ID dos funcionários
        this.proximoIdQuarto = 1; // controla o número de ID dos quartos
        this.proximoIdReserva = 1; // controla o número de ID das reservas
    }

    // Método que permite cadastrar clientes. Acessado no menu inicial.
    fazerCadastro(){
        const email = requisicao.question('Email: ');
        // confere se ha algum funcionario ou cliente com esse email ja cadstrado
        if (this.clientes.some(c => c.email === email) || this.funcionarios.some(f => f.email === email)) {
            console.log('Erro: Email ja cadastrado!');
            return;
        }
        const cpf = requisicao.question('CPF: ');
        // confere se ha algum funcionario ou cliente com esse cpf ja cadstrado
        if (this.clientes.some(c => c.cpf === cpf) || this.funcionarios.some(f => f.cpf === cpf)) {
            console.log('Erro: CPF ja cadastrado!');
            return;
        }
        const senha = requisicao.question('Senha: ', { hideEchoBack: true });
        const nome = requisicao.question('Nome completo: ');
        const idCliente = 'C' + this.proximoIdCliente++
        const novoCliente = new Cliente(idCliente, nome, cpf, email, senha);
        this.clientes.push(novoCliente);
        console.log('Cadastro realizado com sucesso!');
    }

    // Metodo para realizar o cadastro de funcionário. Só é acessado dentro do menu de funcionarios.
    CadastroFuncionario(){
        const email = requisicao.question('Email: ');
        if (this.clientes.some(c => c.email === email) || this.funcionarios.some(f => f.email === email)) {
            console.log('Erro: Email ja cadastrado!');
            return;
        }
            const cpf = requisicao.question('CPF: ');
        if (this.clientes.some(c => c.cpf === cpf) || this.funcionarios.some(f => f.cpf === cpf)) {
            console.log('Erro: CPF ja cadastrado!');
            return;
        }
        const senha = requisicao.question('Senha: ', { hideEchoBack: true });
        const idFuncionario = 'F' + this.proximoIdFuncionario++
        const nomeUsuario = requisicao.question('Nome de usuario: ');
        const nome = requisicao.question('Nome completo: ');
        const novoFuncionario = new Funcionario(idFuncionario, nomeUsuario, cpf, email, senha,nome);
        this.funcionarios.push(novoFuncionario);
        console.log('Cadastro realizado com sucesso!')
    }

    //Método para realizar login Acessado no menu inicial.
    fazerLogin(){
        const email = requisicao.question('Email: ');
        const senha = requisicao.question('Senha: ', { hideEchoBack: true });
        const clientelogado = this.clientes.find(c => c.email === email && c.senha === senha); 
        const funcionariologado = this.funcionarios.find(f => f.email === email && f.senha === senha);
        // Se for encontrado um email e senha correspondentes aos fornecidos pelo usario no array que guarda as informações dos funcionarios ou no array que guarda as infrmaçoes 
        // dos clientes, o atributo clienteLogado ou funcionarioLogado recebe as informações do usuario que fez login.
        if (clientelogado){
            this.clienteLogado = clientelogado;
            console.log(`Bem-vindo, ${clientelogado.nome}!`);
            return
        }
        else if (funcionariologado){
            this.funcionarioLogado = funcionariologado
            console.log(`Bem-vindo, ${funcionariologado.nome}`)
            return
        } 
        else{
            console.log('Email ou senha invalidos.');
        }
    }

    // metodo para funcionarios e clientes poderem acessar seus dados.
    verMeusDados() {
        if (this.clienteLogado) {
            console.log('Seus Dados:');
            console.log(`ID: ${this.clienteLogado.idCliente}`);
            console.log(`Nome: ${this.clienteLogado.nome}`);
            console.log(`Email: ${this.clienteLogado.email}`);
            console.log(`CPF: ${this.clienteLogado.cpf}\n`);
        } 
        else if (this.funcionarioLogado) {
            console.log('Seus Dados:');
            console.log(`ID: ${this.funcionarioLogado.idFuncionario}`);
            console.log(`Nome: ${this.funcionarioLogado.nome}`);
            console.log(`Email: ${this.funcionarioLogado.email}`);
            console.log(`CPF: ${this.funcionarioLogado.cpf}`);
            console.log(`Nome de Usuario: ${this.funcionarioLogado.nomeUsuario}\n`);
        } 
        else {
            console.log('Nenhum usuario está logado.');
        }
    }

    // metodo para funcionarios acessarem as informaçoes dos clientes logados.
    verListaClientes(){
        console.log('Lista de clientes cadastrados');
        if (this.clientes.length === 0) {
            console.log('Nenhum cliente cadastrado.');
            return;
        }
        this.clientes.forEach(c => {
            console.log(`ID: ${c.idCliente} | Nome: ${c.nome} | Cpf: ${c.cpf} | Email: ${c.email}`);
            console.log('---------------------------------');
        });
    }

    // metodo para adicionar mais um quarto a lista do hotel. Acessado somente no menu de funcionarios.
    adicionarQuarto(){
        const quantidadeCamas = Number(requisicao.question('Quantidade de camas do quarto: '));
        if (isNaN(quantidadeCamas) || quantidadeCamas < 0){
            console.log('Erro. Insira um valor numerico valido.');
            return;
        }
        const precoPorNoite = Number(requisicao.question('Preco por noite do quarto: '));
        if (isNaN(precoPorNoite) || precoPorNoite < 0){
            console.log('Erro. Insira um valor numerico valido.');
            return;
        }
        const nome = requisicao.question('Nome do quarto: ');
        const descricao = requisicao.question('Descricao do quarto: ');
        const idQuarto = 'Q' + this.proximoIdQuarto++
        const novoquarto = new Quarto(idQuarto,nome, descricao, quantidadeCamas, precoPorNoite);
        this.quartos.push(novoquarto);
        console.log('Quarto adicionado com sucesso!\n');
    }

    // metodo que exibe todos os quartos oferecidos pelo hotel. Acessado no menu do funcionario e do cliente
    verListaDeQuartos(){
        console.log('Lista de quartos do hotel F-luxo!');
        if (this.quartos.length === 0) {
            console.log('Nenhum quarto cadastrado.');
            return;
        }
        this.quartos.forEach(q => {
            console.log(`ID: ${q.id} | Nome: ${q.nome} | Camas: ${q.quantidadeCamas} | Preço por noite:${q.precoPorNoite.toFixed(2)}`);
            console.log(`   Descricao: ${q.descricao}`);
            console.log('---------------------------------');
        });
    }

    // metodo para reservar um quarto do hotel, dada uma data de entrada e saída. Acessado no menu do cliente
    fazerReserva() {
        console.log('Data desejada para reserva');
        const dataEntradaStr = requisicao.question('Entrada (DD/MM/AAAA): ');
        const dataSaidaStr = requisicao.question('Saida (DD/MM/AAAA): ');
        // O usuario fornece uma data no formato (Dia/mes/ano), que é convertido para o formato Date
        const [diaE, mesE, anoE] = dataEntradaStr.split('/').map(Number);
        const [diaS, mesS, anoS] = dataSaidaStr.split('/').map(Number);
        let dataEntrada = new Date(anoE, mesE - 1, diaE);
        let dia = new Date(anoE, mesE - 1, diaE); // Essa variavel 'dia' funciona como um contador tendo como inicio a data de entrada
        const dataSaida = new Date(anoS, mesS - 1, diaS);
        // o while incrementa um dia a variavel 'dia' e adiciona na variavel 'datasreserva' essa data, para que seja um array com todas as datas em que o cliente deseja permanecer hospedado no hotel
        let datasreserva = [];
        while (dia <= dataSaida) { 
            datasreserva.push(new Date(dia));
            dia.setDate(dia.getDate() + 1);
        }
        // filtrar os quartos disponíveis percorrendo o array de reservas, para ver se há alguma reserva com status pendente
        let quartosDisponiveis = this.quartos.filter(quarto => {
            let reservasDoQuarto = this.reservas.filter(r => r.idQuarto === quarto.id && r.status === "pendente");
            // se alguma reserva desse quarto conflitar com as datas solicitadas ele não será exibido na lista de quartos disponiveis para o cliente
            let conflito = reservasDoQuarto.some(r => datasreserva.some(d => d >= r.dataEntrada && d <= r.dataSaida));
            return !conflito;
        });
        // exibe os quartos disponiveis
        if (quartosDisponiveis.length === 0) {
            console.log('Nao ha quartos disponiveis para essas datas.');
            return;
        } 
        else {
            console.log('Quartos disponiveis para essas datas:');
            quartosDisponiveis.forEach(q => {
                console.log(`ID: ${q.id} | Nome: ${q.nome} | Camas: ${q.quantidadeCamas} | Preco por noite: ${q.precoPorNoite.toFixed(2)}`);
                console.log(`   Descricao: ${q.descricao}`);
                console.log('---------------------------------');
            });
        }
        // salva dados da reserva
        const idQuartoEscolhido = requisicao.question('Digite o ID do quarto desejado: ');
        const quartoSelecionado = quartosDisponiveis.find(q => q.id === idQuartoEscolhido);
        if (!quartoSelecionado) {
            console.log('ID invalido.');
            return;
        }
        const novaReserva = new Reserva('R'+this.proximoIdReserva++,this.clienteLogado.idCliente,quartoSelecionado.id,dataEntrada,dataSaida,"pendente");
        this.reservas.push(novaReserva);
        console.log('Reserva confirmada!');
    }
    // metodo para ver dados de todas as reservas registradas. Acessado no menu do funcionário
    verReservas(){
        if (this.reservas.length === 0) {
            console.log('Nao ha reservas cadastradas.');
            return;
        }
        console.log('Lista reservas');
        this.reservas.forEach(r => {
            console.log(`Reserva ID: ${r.id}`);
            console.log(`Cliente: ${r.idCliente}`);
            console.log(`Quarto: ${r.idQuarto}`);
            console.log(`Data de Entrada: ${r.dataEntrada.toLocaleDateString('pt-BR')}`);
            console.log(`Data de Saida: ${r.dataSaida.toLocaleDateString('pt-BR')}`);
            console.log(`Status: ${r.status}`);
            console.log('---------------------------------');
        });
        return this.reservas
    }
    // metodo para o cliente ver seu historico de reservas.
    verMinhasReservas(){
        const minhasReservas = this.reservas.filter(r => r.idCliente === this.clienteLogado.idCliente);
        if (minhasReservas.length === 0) {
            console.log('Voce nao possui reservas.');
            return;
        }
        console.log('Minhas reservas:');
        minhasReservas.forEach(r => {
            const quarto = this.quartos.find(q => q.id === r.idQuarto);
            console.log(`Reserva ID: ${r.id}`);
            console.log(`Quarto: ${quarto.nome}`);
            console.log(`Data de entrada: ${r.dataEntrada.toLocaleDateString('pt-BR')}`);
            console.log(`Data de saida: ${r.dataSaida.toLocaleDateString('pt-BR')}`);
            console.log(`Status: ${r.status}`);
            console.log('---------------------------');
        });
        return minhasReservas;        
    }
    // metodo para cancelar o cliente cancelar uma reserva. 
    cancelarReserva() {
        const minhasReservas = this.verMinhasReservas();
        if (this.reservas.length === 0) {
            console.log('Voce nao possui reservas para cancelar.');
            return;
        }

        const reservasPendentes = minhasReservas.filter(r => r.status === "pendente");
        if (reservasPendentes.length === 0) {
            console.log('Voce nao possui reservas para cancelar.');
            return;
        }

        const idReserva = requisicao.question('Digite o ID da reserva que deseja cancelar: ');
        const reservaSelecionada = reservasPendentes.find(r => r.id === idReserva);

        if (!reservaSelecionada) {
            console.log('ID invalido.');
            return;
        }

        reservaSelecionada.status = "cancelada";
        console.log(`Reserva cancelada com sucesso!`);
    }
    // metodo para o funcionario alterar o status de uma reserva
    MudarStatusReserva(){
        const todasreservas = this.verReservas()
        if (this.reservas.length === 0) {
            console.log('Nao ha reservas para alterar.');
            return;
        }
        if(todasreservas.length === 0){
            console.log('Nao ha reservas para alterar.');
            return;
        }
        const idReserva = requisicao.question('Digite o ID da reserva que deseja alterar: ');
        const reservaSelecionada = this.reservas.find(r => r.id === idReserva);

        if (!reservaSelecionada) {
            console.log('ID de reserva invalido.');
            return;
        }
        const novoStatus = requisicao.question('Digite o novo status da reserva: ');
        reservaSelecionada.status = novoStatus;
    }
    // metodo para sair do menu, acessado pelo funcionario ou pelo cliente. Volta para o menu principal.   
    logout() {
        if (this.clienteLogado){
            console.log(`Ate logo, ${this.clienteLogado.nome}!`);
            this.clienteLogado = null;
        }
        if (this.funcionarioLogado){
            console.log(`Ate logo, ${this.funcionarioLogado.nome}!`);
            this.funcionarioLogado = null;
        }
    }
    menucliente(){
        while (true){
            console.log('Menu Do Cliente');
            console.log('1. Ver meus dados');
            console.log('2. Ver lista de quartos');
            console.log('3. Fazer reserva');
            console.log('4. Cancelar reserva');
            console.log('5. Ver minhas reservas');
            console.log('6. Logout');
            const opcao = requisicao.question('> ');
            if (opcao ==='1'){
                this.verMeusDados()
            }
            else if (opcao === '2'){
                this.verListaDeQuartos()
            }
            else if (opcao === '3'){
                this.fazerReserva()
            }
            else if (opcao ==='4'){
                this.cancelarReserva()
            }
            else if (opcao === '5'){
                this.verMinhasReservas()
            }
            else if (opcao === '6'){
                this.logout()
                break
            }
            else {
                console.log('Opcao invalida. DIgite o numero correspondente a acao que deseja realizar.')
            }
        }
    }
    menufuncionario(){
        while (true){
            console.log('Menu Do Funcionário');
            console.log('1. Ver meus dados');
            console.log('2. Ver lista de reservas');
            console.log('3. Ver lista de quartos');
            console.log('4. Ver lista de clientes');
            console.log('5. Mudar status da reserva');
            console.log('6. Adicionar quarto');
            console.log('7. Cadastrar novo funcionario')
            console.log('8. Logout');
            const opcao = requisicao.question('> ');
            if (opcao ==='1'){
                this.verMeusDados()
            }
            else if (opcao === '2'){
                this.verReservas()
            }
            else if (opcao === '3'){
                this.verListaDeQuartos()
            }
            else if (opcao ==='4'){
                this.verListaClientes()
            }
            else if (opcao === '5'){
                this.MudarStatusReserva()
            }
            else if (opcao === '6'){
                this.adicionarQuarto()
            }
            else if (opcao === '7'){
                this.CadastroFuncionario()
            }
            else if (opcao === '8'){
                this.logout()
                break
            }
            else {
                console.log('Opcao invalida. DIgite o numero correspondente a acao que deseja realizar.')
            }
        }
    }
    menuInicial(){
        while (true){
            console.log('Seja bem-vindo ao site do Hotel F-Luxo!');
            console.log('1. Fazer login');
            console.log('2. Fazer cadastro');
            console.log('3. Sair do Programa');
            let opcao = requisicao.question('Selecione uma opcao para continuar.\n')
            if (opcao === '1'){
                const login = this.fazerLogin()
                if (this.clienteLogado){
                    this.menucliente()
                }
                if (this.funcionarioLogado){
                    this.menufuncionario()
                }
            }
            else if(opcao === '2'){
                this.fazerCadastro()
            }
            else if(opcao === '3'){
                break
            }
            else{
                console.log('Opcao invalida. Digite apenas o numero correspondente a acao que deseja realizar.')
            }
        }
    }
}

const hotel = new Sistema();

// Adicionar um funcionário inicial
hotel.funcionarios.push(new Funcionario(
    'F0',          // ID
    'admin',       // nome de usuário
    '12345678900', // CPF
    'admin@hotel.com', // email
    'senha123',    // senha
    'Administrador' // nome completo
));

// Inicia o menu principal
hotel.menuInicial();