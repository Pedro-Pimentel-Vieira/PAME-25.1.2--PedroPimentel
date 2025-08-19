Sistema em JavaScript (Node.js) para gerenciamento de reservas de hotel, cadastro de clientes e funcionários, e controle de quartos. O sistema roda na interface de linha de comando (CLI).

Funcionalidades:

Cadastro de clientes e funcionários.

Login e logout de usuários.

Controle de quartos do hotel.

Reservas de quartos com verificação de disponibilidade.

Cancelamento e alteração de status da reserva.

Classes:

1) Reserva 

Representa a reserva de um quarto.

Atributos:

ID único, ID do cliente, status, data de entrada e de saída (no formato Date)

2) Funcionario

Representa os funcionarios cadastrados do hotel.

Atributos:

ID único, nome de usuário, cpf, email e senha.

3) Cliente

Representa um cliente do hotel.

Atributos:

idCliente(ID único do cliente), nome, cpf, email e senha

4) Quarto

Representa os quartos do hotel.

Atributos:

quantidade de camas, preço por noite, quantidade disponível e nome

5) Sistema

Responsável por gerenciar as interações entre clientes, funcionários, reservas e quartos.

Atributos:

clientes: Lista de clientes cadastrados

funcionarios: Lista de funcionários cadastrados.

quartos: Lista de quartos do hotel.

reservas: Lista de reservas realizadas.

clienteLogado: Cliente atualmente logado.


funcionarioLogado: Funcionário atualmente logado.

Contadores de ID: proximoIdCliente, proximoIdFuncionario, proximoIdQuarto, proximoIdReserva.

Métodos:

fazerCadastro(): Permite cadastrar clientes.

Cadastrofuncionario(): Permite um funcionário cadastrar outro funcionário.

fazerLogin(): Permite login de clientes ou funcionários.

verMeusDados(): Exibe dados do usuário logado.

verListaClientes(): Lista todos os clientes cadastrados (para funcionários).

adicionarQuarto(): Adiciona um quarto ao sistema (para funcionários).

verListaDeQuartos(): Lista todos os quartos disponíveis.

fazerReserva(): Permite que o cliente faça uma reserva.

verReservas(): Exibe todas as reservas (para funcionários).

verMinhasReservas(): Exibe reservas do cliente logado.

cancelarReserva(): Cancela uma reserva pendente do cliente.

MudarStatusReserva(): Altera o status de uma reserva (para funcionários).

logout(): Encerra a sessão do usuário logado.

menucliente(): Menu interativo para clientes.

menufuncionario(): Menu interativo para funcionários.

menuInicial(): Menu principal do sistema.

Uso:

Instale o Node.js.

Instale a dependência:

        npm install readline-sync

Execute o sistema:

         nome_do_arquivo.js

Observação:

O código possui dados de login de um administrador, que entra no sistema como funcionário, já que só é possível cadastrar um novo funcionário à partir da conta de um funcionário 
já cadastrado.

Funcionário administrador:

Email: admin@fluxo.com

Senha: senha123