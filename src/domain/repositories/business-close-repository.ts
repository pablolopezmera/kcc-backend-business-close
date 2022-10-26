import { BusinessCloseModel } from "../model/business-close-model";

export abstract class BusinessCloseRepository {
    
    abstract registerEvent(businessId: string, arg1: string, message: any);

    abstract saveBusiness(business:BusinessCloseModel):Promise<BusinessCloseModel>;

}