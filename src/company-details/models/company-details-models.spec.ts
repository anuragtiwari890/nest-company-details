import { CompanyDetailsModel, CompanyDetails } from './company-details-model';

let companiesMockData = require('./mock-data.json');

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

        it.todo('should return proper data while searching with company name wihout Exact match');
    });
});