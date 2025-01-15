import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import * as grpc from '@grpc/grpc-js';

export function ValidateDto(dtoClass: any) {
    return function (
        _target: unknown,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (
            call: grpc.ServerUnaryCall<any, any>,
            callback: grpc.sendUnaryData<any>
        ) {
            try {
                const dtoInstance = plainToInstance(dtoClass, call.request);

                const errors = await validate(dtoInstance);

                if (errors.length > 0) {
                    return callback({
                        code: grpc.status.INVALID_ARGUMENT,
                        message: `Validation failed: ${errors.toString()}`,
                    });
                }

                return originalMethod.call(this, call, callback);
            } catch (error) {
                callback({
                    code: grpc.status.INTERNAL,
                    message: 'Internal server error',
                });
            }
        };
    };
}
