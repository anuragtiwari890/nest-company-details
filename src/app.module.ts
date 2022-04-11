import { Module } from '@nestjs/common';
import { CompanyDeatilsModule } from './company-details/company-details-module';


@Module({
  imports: [CompanyDeatilsModule],
})
export class AppModule {}
