import { AutoMap } from '@automapper/classes';

export class BusinessCloseModel {
  
  id?: string;

  @AutoMap()  
  uidEnDynamics: string;
  
  @AutoMap()  
  rut: string;
  
  @AutoMap()  
  razonSocial: string;
  
  @AutoMap()  
  estatusDelCliente: string;
  
  @AutoMap()  
  identificacioneDelEquipo: string;
  
  @AutoMap()  
  modelo: string;
  
  @AutoMap()  
  serie: string;
  
  @AutoMap()  
  faena: string;
  
  @AutoMap()  
  adjuntos: string[]
}
