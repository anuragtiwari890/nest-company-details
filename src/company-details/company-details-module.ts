import { Module } from '@nestjs/common';

import { CompanyDetailsModel } from './models/company-details-model';
import { CompanyDetailsController } from './controllers/company-details-controller';
import { CompanyDetailsRepository } from './repositories/company-details-repository';
import { CompanyDetailsService } from './services/company-details-service';

const data = require('../../data.json')

@Module({
  controllers: [CompanyDetailsController],
  providers: [
    {
      provide: 'companiesDetails',
      useValue: data,
    },
    CompanyDetailsModel,
    CompanyDetailsRepository,
    CompanyDetailsService
  ],
})
export class CompanyDeatilsModule {}
