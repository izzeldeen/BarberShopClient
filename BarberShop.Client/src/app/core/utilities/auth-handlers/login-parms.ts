import { LanguageEnum } from "src/app/shared/enum/language-enum";
import { LoginProviderEnum } from "src/app/shared/enum/login-provider-enum";

export class LoginParms {
    provider?: LoginProviderEnum;
    language: string;
}