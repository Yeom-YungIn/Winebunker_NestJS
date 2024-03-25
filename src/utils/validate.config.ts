import {ClassConstructor, plainToInstance} from "class-transformer";
import {validateSync} from "class-validator";

function ValidateConfig<T extends object>(
    config: Record<string, unknown>,
    envClass: ClassConstructor<T>,
) {
    const validateConfig = plainToInstance(envClass, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validateConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validateConfig;
}

export default ValidateConfig;