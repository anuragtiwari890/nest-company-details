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

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Search Companies -> Find', () => {
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
                { sort: ['name', 'dateLastEdited'] });

            expect(result).toMatchObject(sortBy(sortMockdata.slice(0,2), ['name', 'dateLastEdited']))
        });

        it('should sort the data when sorting and search both are provided', async () => {
            let sortMockdata = require('./mock-data/mock-data-sort.json');
            companyDetailsModel = new CompanyDetailsModel(sortMockdata);
            const result = companyDetailsModel.find(
                {searchText: 'B'}, 
                { sort: ['name', 'dateLastEdited'] });

            expect(result).toMatchObject(sortBy(sortMockdata.slice(0,3), ['name', 'dateLastEdited']))
        })
    });
});