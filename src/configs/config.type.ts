import {AppConfig} from "./app.config.type";
import AuthConfig from "../auth/common/config/auth.config";

export type ConfigType = {
    app: AppConfig;
    auth: AuthConfig;
};