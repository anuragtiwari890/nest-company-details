import { CompanyDetailsModel } from './company-details-model';

let companiesMockData = require('./mock-data.json');

describe('Comapny details model', () => {
    let companyDetailsModel: CompanyDetailsModel;


    beforeEach(async () => {
        companyDetailsModel = new CompanyDetailsModel(companiesMockData);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Search Companies -> Find', () => {
        it('should return all the data if no search text is provided', async () => {
            const result = companyDetailsModel.find({});
            expect(result).toMatchObject(companiesMockData);
        });

        it('should return proper data while searching exact with company name', async () => {
            const result = companyDetailsModel.find({
                searchText: 'Customer Assurance Liaison', 
                isEaxctMatch: true
            });
            expect(result).toMatchObject([companiesMockData[0]]);
        });
        it.todo('should return proper data while searching with exact company desription');
        it.todo('should return proper data while searching with company name');
    });
});