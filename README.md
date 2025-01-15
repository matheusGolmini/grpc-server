# Servidor gRPC com TypeScript

Este projeto é um exemplo de implementação de um servidor gRPC usando TypeScript. Ele demonstra como estruturar um servidor gRPC com um CRUD completo para dois modelos: **User** e **Car**, utilizando boas práticas de organização, decoradores e protótipos `.proto`.

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript para backend.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **gRPC**: Framework de comunicação de alta performance.
- **proto-loader**: Utilizado para carregar arquivos `.proto`.

---

## 🚀 Funcionalidades

### **Modelos Implementados**

1. **User**:
   - **CreateUser**: Cria um novo usuário.
   - **GetUser**: Retorna um usuário pelo ID.
   - **ListUsers**: Retorna uma lista de usuários.
   - **UpdateUser**: Atualiza as informações de um usuário.
   - **DeleteUser**: Remove um usuário pelo ID.

2. **Car**:
   - **CreateCar**: Cria um novo carro.
   - **GetCar**: Retorna um carro pelo ID.
   - **ListCars**: Retorna uma lista de carros.
   - **UpdateCar**: Atualiza as informações de um carro.
   - **DeleteCar**: Remove um carro pelo ID.

### **Estrutura do Projeto**

O projeto utiliza decoradores para registrar os serviços e métodos gRPC, promovendo uma organização modular e escalável.

- **`proto/`**: Arquivos `.proto` que definem os serviços e modelos.
- **`services/`**: Implementações dos serviços gRPC.
- **`decorators/`**: Decoradores personalizados para mapeamento dinâmico de serviços e métodos.
- **`repositories/`**: Lógica de persistência em memória para os dados.
- **`proto-loader/`**: Configuração de carregamento dos arquivos `.proto`.

---

# Guia de Configuração e Execução

## 📥 Instalação de Dependências e Execução da Aplicação

### **Pré-requisitos**
- **Node.js**: Certifique-se de que o Node.js 16 ou superior esteja instalado.
- **npm** ou **yarn**: Gerenciador de pacotes para instalar as dependências.
- **Postman**: Ferramenta para testar APIs (versão que suporta gRPC).

### **Passos**

1. **Clone o repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd grpc-server
2. **Execute o comando**:
   ```bash
      npm i
3. **Rodar a aplicação**:
   ```bash
    npm run dev

## 🧪 Configurando e Testando no Postman

1. **Abra o Postman**:
   Certifique-se de que você está usando a versão mais recente do Postman que suporta gRPC (Postman v9 ou superior).

2. **Crie uma nova requisição gRPC**:
   - Clique em **New** no menu superior.
   - Selecione **gRPC Request**.

3. **Configure o endereço do servidor**:
   - No campo de entrada, insira: `localhost:50051`.

4. **Importe o arquivo `.proto`**:
   - Clique em **Import Proto File**.
   - Navegue até a pasta `proto/` do projeto e selecione o arquivo desejado (por exemplo, `user.proto` ou `car.proto`).

5. **Escolha o serviço e método**:
   - Após importar o arquivo `.proto`, o Postman exibirá os serviços e métodos disponíveis.
   - Selecione um serviço (por exemplo, `UserService`) e um método (como `CreateUser`).

6. **Insira os dados de entrada**:
   - Na aba **Message**, preencha os campos esperados no formato JSON.  
     Exemplo para `CreateUser`:
     ```json
     {
       "name": "John Doe",
       "age": 30
     }
     ```

7. **Envie a requisição**:
   - Clique em **Send** para executar a chamada.
   - O Postman exibirá a resposta retornada pelo servidor gRPC.