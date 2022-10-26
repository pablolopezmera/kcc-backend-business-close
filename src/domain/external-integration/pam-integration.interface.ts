import { BusinessCloseModel } from "../model/business-close-model";

export abstract class PamIntegration {
  abstract startProcess(request: BusinessCloseModel): Promise<string>;
}
