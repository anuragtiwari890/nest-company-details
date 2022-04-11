import { Inject, Injectable } from "@nestjs/common";

export interface ComapanyDetails {
    name: string,
    description: string,
    image: string,
    dateLastEdited: string
};

type Options = {
    sort?: string,
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
    data: ComapanyDetails[];
    constructor(@Inject('companiesDetails') private readonly companiesDetails) {
        this.data = companiesDetails;
    }

    // This will only work for one field as per the current req
    find(query: Query, options: Options = {}): ComapanyDetails[] {
        let ret = this.data;

        return ret;
    }
}