import { SearchQueryParamsDTO } from '../dtos/search-query-dto';
import { CompanyDetailsModel, CompanyDetails } from '../models/company-details-model';
import { CompanyDetailsRepository } from '../repositories/company-details-repository';
import { CompanyDetailsService } from './company-details-service';


describe('Company Service', () => {
    let mockData: CompanyDetails[];
    let companyDetailsRepository: CompanyDetailsRepository;
    let companyDetailsService: CompanyDetailsService;

    beforeEach(async () => {
        mockData = [
            {
                "name": "B",
                "image": "http://lorempixel.com/640/480",
                "description": "description 1",
                "dateLastEdited": "2018-04-19T12:33:25.545Z"
            },
            {
                "name": "Big B",
                "image": "http://lorempixel.com/640/480",
                "description": "test is this",
                "dateLastEdited": "2018-05-19T12:33:25.545Z"
            },
        ];

        companyDetailsRepository = {
            search: jest.fn().mockImplementation(() => mockData),
            count: jest.fn().mockImplementation(() => 2)
        } as any;

        companyDetailsService = new CompanyDetailsService(companyDetailsRepository)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('search()', () => {

        it('should return all the data when no search data is provided', async () => {
            const result = companyDetailsService.search({} as SearchQueryParamsDTO);
            expect(companyDetailsRepository.search).toBeCalledWith({});
            expect(companyDetailsRepository.count).toBeCalledWith({});
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return all the matching data wrt search text', async () => {
            const params: any = {search: 'test'};
            const result = companyDetailsService.search(params);
            expect(companyDetailsRepository.search).toBeCalledWith({searchText: params.search});
            expect(companyDetailsRepository.count).toBeCalledWith({searchText: params.search});
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return all the matching data which are exactly matching name or description', async () => {
            const params: any = {search: '"test"'};
            const result = companyDetailsService.search(params);
            const expectedQuery = {searchText: params.search, isExactMatch: true};
            expect(companyDetailsRepository.search).toBeCalledWith(expectedQuery);
            expect(companyDetailsRepository.count).toBeCalledWith(expectedQuery);
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return sorted data', async () => {
            const params: any = {sort: ['name']};
            const result = companyDetailsService.search(params);
            expect(companyDetailsRepository.search).toBeCalledWith(params);
            expect(companyDetailsRepository.count).toBeCalledWith({});
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return skipped data', async () => {
            const params: any = {skip: 10};
            const result = companyDetailsService.search(params);
            expect(companyDetailsRepository.search).toBeCalledWith(params);
            expect(companyDetailsRepository.count).toBeCalledWith({});
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return limited data', async () => {
            const params: any = {limit: 10};
            const result = companyDetailsService.search(params);
            expect(companyDetailsRepository.search).toBeCalledWith(params);
            expect(companyDetailsRepository.count).toBeCalledWith({});
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should return search, sort, skip and limit params', async () => {
            const params: any = {search: 'test', sort: ['name'], skip: 10, limit: 10};
            const result = companyDetailsService.search(params);
            const expectedQuery = {searchText: params.search};
            const expectedOptions = {skip: params.skip, limit: params.limit, sort: params.sort}
            expect(companyDetailsRepository.search).toBeCalledWith({...expectedOptions, ...expectedQuery});
            expect(companyDetailsRepository.count).toBeCalledWith(expectedQuery);
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

        it('should search with exact match, sort, skip and limit params', async () => {
            const params: any = {search: '"test"', sort: ['name'], skip: 10, limit: 10};
            const result = companyDetailsService.search(params);
            const expectedQuery = {searchText: params.search, isExactMatch: true};
            const expectedOptions = {skip: params.skip, limit: params.limit, sort: params.sort}
            expect(companyDetailsRepository.search).toBeCalledWith({...expectedOptions, ...expectedQuery});
            expect(companyDetailsRepository.count).toBeCalledWith(expectedQuery);
            expect(result).toMatchObject({companiesDetails: mockData, count: 2});
        });

    })
});