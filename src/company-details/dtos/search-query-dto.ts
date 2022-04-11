import { Type,Transform } from 'class-transformer';
import { IsOptional, Min, IsNotEmpty, ValidateNested } from 'class-validator';

export class SearchQueryParamsDTO {

    @IsOptional()
    @Type(() => String)
    @IsNotEmpty({ message: "Search string provided cannot be Empty" })
    readonly search: string;

    @IsOptional()
    @IsNotEmpty({ message: "Sort cannot be Empty" })
    @Transform(({ value }) => typeof value == 'string' && value ? value.split(',') : value)
    readonly sort: string | string[];

    @IsOptional()
    @Type(() => Number)
    @Min(0, { message: "skip value should be greater than 0" })
    readonly skip: number;

    @IsOptional()
    @Type(() => Number)
    @Min(1, { message: "limit value should be greater than 1" })
    readonly limit: number;

    constructor(
        search?: string,
        sort?: string | string[],
        skip?: number,
        limit?: number,
    ) {
        this.search = search;
        this.sort = sort;
        this.skip = skip;
        this.limit = limit;
    }
}
''