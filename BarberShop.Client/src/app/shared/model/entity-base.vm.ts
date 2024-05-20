export class EntityBase {
    id: number;
    createStamp: Date;
    createdBy: number;
    updateStamp: Date;
    updatedBy: number;
    isActive?: boolean;
    isDeleted?: boolean;
    isSystem?: boolean;
}

export class EncyptResponse {
  responseData: string;
 
}

