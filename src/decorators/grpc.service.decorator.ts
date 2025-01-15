import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export const servicesRegistry = new Map<
    string,
    { service: any; implementation: any }
>();

export function GrpcService(protoPath: string, serviceName: string) {
    return function (constructor: new () => object) {
        const path = `./src/proto${protoPath}`;
        const proto = grpc.loadPackageDefinition(
            protoLoader.loadSync(path)
        ) as any;

        const service = serviceName
            .split('.')
            .reduce((obj, key) => obj[key], proto);

        if (!service || !service.service) {
            throw new Error(
                `Serviço "${serviceName}" não encontrado no proto "${protoPath}".`
            );
        }

        const instance = new constructor();
        const implementation: Record<string, grpc.UntypedHandleCall> =
            Object.getOwnPropertyNames(constructor.prototype)
                .filter((method) => method !== 'constructor')
                .reduce(
                    (impl, method) => {
                        const handler = instance[
                            method as keyof typeof instance
                        ] as unknown;
                        if (typeof handler === 'function') {
                            impl[method] = handler.bind(instance);
                        }
                        return impl;
                    },
                    {} as Record<string, grpc.UntypedHandleCall>
                );

        servicesRegistry.set(serviceName, {
            service: service.service,
            implementation,
        });
    };
}
