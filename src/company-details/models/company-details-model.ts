import { Inject, Injectable } from "@nestjs/common";
import {sortBy} from 'lodash'

export interface CompanyDetails {
    name: string,
    description: string,
    image: string,
    dateLastEdited: string
};

type Options = {
    sort?: string | string[],
    skip?: number,
    limit?: number
};

// For the demo purpose setting only single operation
type Query = {
    searchText?: string,
    isEaxctMatch?: boolean
};

// The impmentation of the model is very specific to the excercise 
@Injectable()
export class CompanyDetailsModel {
    data: CompanyDetails[];
    constructor(@Inject('companiesDetails') private readonly companiesDetails) {
        this.data = companiesDetails;
    }

    // This will only work for one field as per the current req
    find(query: Query, options: Options = {}): CompanyDetails[] {
        let ret = this.data;

        if (query.searchText) {
            if (query.isEaxctMatch) {
                ret = ret.filter((companyDetail: CompanyDetails) => {
                    return query.searchText === companyDetail.name 
                        || query.searchText === companyDetail.description;
                })
            } else {
                const words = query.searchText.toLowerCase().split(' ');
                ret = ret.filter((companyDetail: CompanyDetails) => {
                    return this.searchTerm(words, companyDetail.name.toLowerCase()) ||
                        this.searchTerm(words, companyDetail.description.toLowerCase())
                })
            }
        }

        if (options.sort) {
            ret = sortBy(ret, options.sort);
        }

        if (options.skip && options.limit) {
            ret = ret.slice(options.skip, options.skip + options.limit);
        } else if (options.skip) {
            ret = ret.slice(options.skip);
        } else if (options.limit) {
            ret = ret.slice(0, options.limit);
        }

        return ret;
    }

    private searchTerm(words: string[], searchText: string) {
        return words.some(word => {
            return searchText.includes(word)
        })
    }
}