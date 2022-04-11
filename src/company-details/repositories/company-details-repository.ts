import { Injectable } from '@nestjs/common'
import { CompanyDetailsModel, CompanyDetails, Query, Options } from '../models/company-details-model'


@Injectable()
export class CompanyDetailsRepository {
    constructor(private readonly companyDetailsModel: CompanyDetailsModel) {}

    search(
        searchText?: string, 
        isExactMatch?: boolean,
        sort?: string | string[], 
        skip?: number, 
        limit?: number
    ):  CompanyDetails[] {
        const modelquery: Query = this.getSearchQuery(searchText, isExactMatch);
        const options: Options = this.getSearchQueryOptions(sort, skip, limit);
        return this.companyDetailsModel.find(modelquery, options);
    }

    count(searchText?: string, isExactMatch?: boolean,) {
        const modelquery: Query = this.getSearchQuery(searchText, isExactMatch);
        return this.companyDetailsModel.count(modelquery)
    }

    private getSearchQuery(searchText ?: string, isExactMatch?: boolean) {
        let query: Query = {};
        searchText && (query['searchText'] = searchText);

        if (searchText &&  isExactMatch) {
            query.isExactMatch = true;
        }

        return query;
    }

    private getSearchQueryOptions(sort, skip, limit) {
        let options: Options = {};
        sort && (options.sort = sort);
        skip && (options.skip = skip);
        limit && (options.limit = limit)

        return options;
    }
}