import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CamelCaseNamingConvention, Mapper, MappingProfile, createMap, forMember, ignore, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BusinessCloseModel } from '../../domain/model/business-close-model';
import { BusinessCloseDto } from '../controllers/business-close/business-close.dto';
import { BusinessClose } from '../schemas/business-close.schema';

@Injectable()
export class BusinessCloseProfile extends AutomapperProfile {

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
      return (mapper) => {
        createMap(mapper, BusinessCloseModel, BusinessCloseDto,
          forMember(dest => dest.adjuntos, mapFrom(src => src.adjuntos)),
        );
        createMap(mapper, BusinessCloseDto, BusinessCloseModel,
          forMember(dest => dest.adjuntos, mapFrom(src => src.adjuntos)),
        );
        createMap(mapper, BusinessClose, BusinessCloseModel,
          forMember(dest => dest.adjuntos, mapFrom(src => src.adjuntos)),
        );
      };
  }

}
