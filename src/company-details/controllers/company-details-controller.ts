import {
    Controller,
    Get,
    Query,
} from '@nestjs/common';

import { CompanyDetailsService } from '../services/company-details-service';
import { SearchQueryParamsDTO } from '../dtos/search-query-dto';
import { CompanyDetails } from '../models/company-details-model';


@Controller('/company-details')
export class CompanyDetailsController {

    constructor(
        private readonly companyDetailsService: CompanyDetailsService,
    ) { }

    @Get()
    async fetchCompaniesDetails(
        @Query() query: SearchQueryParamsDTO,
    ): Promise<{ companiesDetails: CompanyDetails[]; count: number }> {
        return this.companyDetailsService.search(query);
    }
}
