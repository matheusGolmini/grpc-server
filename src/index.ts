import * as grpc from '@grpc/grpc-js';
import { servicesRegistry } from './decorators/grpc.service.decorator';
import 'reflect-metadata'
import './services';

function startServer() {
  const server = new grpc.Server();

  for (const [serviceName, { service, implementation }] of servicesRegistry.entries()) {
    const protoMethods = Object.keys(service);
    const implementationMethods = Object.keys(implementation);
    const validateMethods = (protoMethods: string[], implementationMethods: string[]): string[] => {
      const formattedImplementationMethods = implementationMethods.map(method => method.toLowerCase());
  
      const missingMethods = protoMethods.filter(method => !formattedImplementationMethods.includes(method.toLocaleLowerCase()));
      return missingMethods;
    };
  
    const missingMethods = validateMethods(protoMethods, implementationMethods);
  
    if (missingMethods.length > 0) {
      throw new Error(`Erro: A implementação do serviço "${serviceName}" está faltando os seguintes métodos definidos no arquivo proto: ${missingMethods.join(', ')}`);
    }
  
    server.addService(service, implementation);
    console.log(`Serviço registrado: ${serviceName}`);
  }

  const port = '50051';
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error('Erro ao iniciar o servidor:', err);
      return;
    }
    console.log(`Servidor gRPC iniciado na porta ${bindPort}`);
  });
}

startServer();