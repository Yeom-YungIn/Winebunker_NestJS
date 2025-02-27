import {IsEnum, IsInt, IsOptional, Max, Min} from "class-validator";
import {registerAs} from "@nestjs/config";
import {AppConfig} from "./app.config.type";
import validateConfig from "@app/utils/config/validate.config";

console.log(process.env.APP_PORT)
enum Environment {
    Development = 'development',
    Production = 'production',
}
class EnvironmentVariablesValidator {
    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV: Environment;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    APP_PORT: number;
}
export default registerAs<AppConfig>('app', () => {

    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        nodeEnv: process.env.NODE_ENV || 'development',
        port:  process.env.APP_PORT
                ? parseInt(process.env.APP_PORT, 10)
                : 3000,
    };
});
