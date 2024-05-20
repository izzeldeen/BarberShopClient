import {EntityBase} from "../../shared/models/entity-base.model";

export class User extends EntityBase {
    username?: string;
    userTypeId?: number;
    participantId?: number;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email?: string;
    name: string;
    role: string;
    merchantEncryptionKey: string;
    merchantCode:string;
    participantCode:string;
    defaultBreakdownCode :string;
}

export class ResetPasswordDTO {
    username: string;
    newPassword: string;
    confirmPassword: string;
}
