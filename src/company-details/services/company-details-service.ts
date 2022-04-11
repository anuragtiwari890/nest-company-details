import { CompanyDetailsRepository } from '../repositories/company-details-repository';
import { SearchQueryParamsDTO } from '../dtos/search-query-dto';
import { CompanyDetails } from '../models/company-details-model';
import _ from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyDetailsService {

    constructor(
        private readonly companyDetailsRepository: CompanyDetailsRepository,
    ) { }

    search(searchDTO: SearchQueryParamsDTO): {companiesDetails: CompanyDetails[], count: number} {
        const companiesDetails: CompanyDetails[] = this.companyDetailsRepository.search({
            ...this.buildSearchParams(searchDTO), 
            ...this.buildOptionsParams(searchDTO)
        });

        const totalCount = this.companyDetailsRepository.count(
            this.buildSearchParams(searchDTO)
        );

        return {companiesDetails, count: totalCount};
    }

    private buildOptionsParams(searchDTO: SearchQueryParamsDTO) {
        let params: any = {};

        searchDTO.sort && (params.sort = searchDTO.sort);
        searchDTO.skip && (params.skip = searchDTO.skip);
        searchDTO.limit && (params.limit = searchDTO.limit);

        return params;
    }

    private buildSearchParams(searchDTO: SearchQueryParamsDTO) {
        let params: any = {};
        searchDTO.search && (params.searchText = searchDTO.search);

        searchDTO.search  && 
            this.isExactMatchSearch(searchDTO.search) && 
            (params.isExactMatch = true);

        params.isExactMatch && (params.searchText = params.searchText.slice(1,-1));

        return params;
    }

    private isExactMatchSearch(search: string): boolean {
        return search && search[0] === "\"" && search[search.length - 1] === "\"";
    }
}
