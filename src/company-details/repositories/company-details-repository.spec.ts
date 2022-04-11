import { CompanyDetailsModel, CompanyDetails } from '../models/company-details-model';
import { CompanyDetailsRepository } from './company-details-repository';


describe('Company Repository', () => {
    let companyDetailsModel: CompanyDetailsModel;
    let mockData: CompanyDetails[];
    let companyDetailsRepository: CompanyDetailsRepository;

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
        ]
        companyDetailsModel = {
            find: jest.fn().mockImplementation(() => mockData),
            count: jest.fn().mockImplementation(() => 2)
        } as any;

        companyDetailsRepository = new CompanyDetailsRepository(companyDetailsModel);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('search()', () => {

        it('should return all the data when no search data is provided', async () => {
            const result = companyDetailsRepository.search({});
            expect(companyDetailsModel.find).toBeCalledWith({}, {});
            expect(result).toMatchObject(mockData);
        });

        it('should return data matching the provided search string', async () => {
            const searchText = "test"
            const query = { searchText }
            const result = companyDetailsRepository.search({ searchText });
            expect(companyDetailsModel.find).toBeCalledWith(query, {});
            expect(result).toMatchObject(mockData);
        });

        it('should return data exactly matching with the provided search string', async () => {
            const searchText = 'test'
            const query = { searchText, isExactMatch: true }
            const result = companyDetailsRepository.search(query);
            expect(companyDetailsModel.find).toBeCalledWith(query, {});
            expect(result).toMatchObject(mockData);
        });

        it('should return data in sorted order', async () => {
            const result = companyDetailsRepository.search({ sort: 'name' });
            expect(companyDetailsModel.find).toBeCalledWith({}, { sort: 'name' });
            expect(result).toMatchObject(mockData);
        });

        it('should return skipped data', async () => {
            const result = companyDetailsRepository.search({ skip: 10 });
            expect(companyDetailsModel.find).toBeCalledWith({}, { skip: 10 });
            expect(result).toMatchObject(mockData);
        });

        it('should return limited data', async () => {
            const result = companyDetailsRepository.search({ limit: 10 });
            expect(companyDetailsModel.find).toBeCalledWith({}, { limit: 10 });
            expect(result).toMatchObject(mockData);
        });

        it('should exactly matching data with search text, sort, skip, limit', async () => {
            const searchText = 'test'
            const query = { searchText, isExactMatch: true };
            const options = { sort: 'name', skip: 10, limit: 10 }
            const result = companyDetailsRepository.search({ ...query, ...options });
            expect(companyDetailsModel.find).toBeCalledWith(query, options);
            expect(result).toMatchObject(mockData);
        });
    })

    describe('count()', () => {
        it('should return the count data when no search data is provided', async () => {
            const result = companyDetailsRepository.count({});
            expect(companyDetailsModel.count).toBeCalledWith({});
            expect(result).toEqual(2);
        });

        it('should return count when query search query is provided with exact matching', async () => {
            const searchText = "test"
            const query = { searchText }
            const result = companyDetailsRepository.count(query);
            expect(companyDetailsModel.count).toBeCalledWith(query);
            expect(result).toEqual(2);
        });

        it('should return count when query search query is provided without exact matching', async () => {
            const searchText = 'test'
            const query = { searchText, isExactMatch: true }
            const result = companyDetailsRepository.count(query);
            expect(companyDetailsModel.count).toBeCalledWith(query);
            expect(result).toEqual(2);
        });
    })
});