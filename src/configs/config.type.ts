import {AppConfig} from "./app.config.type";
import { AuthConfig } from "../auth/common/config/auth.config.type";

export type ConfigType = {
    app: AppConfig;
    auth: AuthConfig;
};