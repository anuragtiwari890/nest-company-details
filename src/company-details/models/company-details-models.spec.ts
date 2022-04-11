import { CompanyDetailsModel, CompanyDetails } from './company-details-model';
import { sortBy } from 'lodash'

let companiesMockData = require('./mock-data/mock-data.json');

describe('Comapny details model', () => {
    let companyDetailsModel: CompanyDetailsModel;
    let mockData: CompanyDetails[];

    beforeEach(async () => {
        mockData = Object.keys(companiesMockData).map(mockDataKey => companiesMockData[mockDataKey])
        companyDetailsModel = new CompanyDetailsModel(mockData);
    });

    describe('Search Companies -> Find()', () => {
        it('should return all the data if no search text is provided', async () => {
            const result = companyDetailsModel.find({});
            expect(result).toMatchObject(mockData);
        });

        it('should return proper data while searching exact with company name', async () => {
            const result = companyDetailsModel.find({
                searchText: 'Customer Assurance Liaison',
                isEaxctMatch: true
            });
            expect(result).toMatchObject([companiesMockData['exactNameMatch']]);
        });

        it('should return proper data while searching with exact company desription', async () => {
            const result = companyDetailsModel.find({
                searchText: 'small desc',
                isEaxctMatch: true
            });
            expect(result).toMatchObject([companiesMockData['exactDescrpriptionMatch']]);
        });

        it('should return proper data while searching exact with company name with different case', async () => {
            const result = companyDetailsModel.find({
                searchText: 'Small Desc',
                isEaxctMatch: true
            });
            expect(result).toMatchObject([]);
        });

        it('should return proper data while searching with company name wihout Exact match', async () => {
            const result = companyDetailsModel.find({
                searchText: 'Contains',
            });
            expect(result).toMatchObject([companiesMockData['containsNameMatch']]);
        });

        it('should return proper data while searching with company description wihout Exact match', async () => {
            const result = companyDetailsModel.find({
                searchText: 'descriptionsss',
            });
            expect(result).toMatchObject([companiesMockData['containsDescriptionMatch']]);
        });

        it('should sort the data when sorting is provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find({}, { sort: ['name', 'dateLastEdited'] });

            expect(result).toMatchObject(sortBy(sortMockdata, ['name', 'dateLastEdited']))
        });

        it('should sort the data when sorting and exact match search both are provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find(
                {searchText: 'B', isEaxctMatch: true}, 
                { sort: ['name', 'dateLastEdited'] }
            );

            expect(result).toMatchObject(sortBy(sortMockdata.slice(0,2), ['name', 'dateLastEdited']))
        });

        it('should sort the data when sorting and search both are provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find(
                {searchText: 'B'}, 
                { sort: ['name', 'dateLastEdited'] }
            );

            expect(result).toMatchObject(sortBy(sortMockdata.slice(0,3), ['name', 'dateLastEdited']))
        })

        it('should skip the data when skip is provided', async () => {
            const result = companyDetailsModel.find({}, { skip: 2 });
            expect(result).toMatchObject(mockData.slice(2))
        })

        it('should return only 2 entries when limit is set to 2', async () => {
            const result = companyDetailsModel.find({}, { limit: 2 });
            expect(result).toMatchObject(mockData.slice(0,2))
        })

        it('should 2 entries starting from second index when limit is set to 2 and skip is set to 2', async () => {
            const result = companyDetailsModel.find({}, { skip: 2, limit: 2 });
            expect(result).toMatchObject(mockData.slice(2, 4));
        });

        it('should return proper data when exact search, sort, skip and limit are provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find(
                {searchText: 'B', isEaxctMatch: true}, 
                { sort: ['name', 'dateLastEdited'], skip: 1, limit: 1 }
            );

            const expectedRes = sortBy(sortMockdata.slice(0,2), ['name', 'dateLastEdited']).slice(1,2);

            expect(result).toMatchObject(expectedRes)
        });

        it('should return proper data when search, sort, skip and limit are provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find(
                {searchText: 'B'}, 
                { sort: ['name', 'dateLastEdited'], skip: 1, limit: 2 }
            );

            const expectedRes = sortBy(sortMockdata.slice(0,3), ['name', 'dateLastEdited']).slice(1,3);

            expect(result).toMatchObject(expectedRes)
        });
    });

    describe('Search Companies -> Count()', () => {
        beforeEach(async () => {
            companyDetailsModel.find = jest.fn().mockImplementation(() => [1,2,3,4])
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return count when query is empty', async () => {
            const result = companyDetailsModel.count({});
            expect(result).toEqual(4);
        });

        it('should return count when query search query is provided with exact matching', async () => {
            const query = {searchText: "test"}
            const result = companyDetailsModel.count(query);
            expect(companyDetailsModel.find).toBeCalledWith(query);
        });

        it('should return count when query search query is provided without exact matching', async () => {
            const query = {searchText: "test", isEaxctMatch: true}
            const result = companyDetailsModel.count(query);
            expect(companyDetailsModel.find).toBeCalledWith(query);
        });
    })
});