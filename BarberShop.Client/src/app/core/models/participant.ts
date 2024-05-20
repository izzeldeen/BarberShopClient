export class Participant {
    id: number;
    participantType: string;
    participantCode: string;
    nameAr: string;
    nameEn: string;
    tradeLicenceNumber: string;
    taxIdentificationNumber: string;
    password: string;
    confirmPassword: string;
    email: string;
    mobile: string;
    createdAt: Date;
    modifiedAt: Date;
    isActive: boolean;
    termsAndConditionId: number;

    constructor() {
        this.id = null;
        this.participantType = null;
        this.participantCode = null;
        this.nameAr = null;
        this.nameEn = null;
        this.tradeLicenceNumber = null;
        this.taxIdentificationNumber = null;
        this.password = null;
        this.confirmPassword = null;
        this.email = null;
        this.mobile = null;
        this.createdAt = null;
        this.modifiedAt = null;
        this.isActive = null;
    }
}
