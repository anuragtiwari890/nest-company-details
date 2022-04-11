import { plainToClass } from 'class-transformer';
import {
  validate,
  ValidationError,
} from 'class-validator';

import { SearchQueryParamsDTO } from './search-query-dto';

describe('SearchQueryParamsDTO', () => {
  it('validates that with empty object', async () => {
    const errorResult = await transformAndValidate({});
    expect(errorResult.length).toBe(0);
  });

  it('validates that with empty search string', async () => {
    const errorResult = await transformAndValidate({search: ''});
    expect(errorResult.length).toBe(1);
    expect(errorResult[0].constraints.isNotEmpty).toBeDefined();
  });

  it('validates with proper search string', async () => {
    const errorResult = await transformAndValidate({search: 'test'});
    expect(errorResult.length).toBe(0);
  });

  it('validates sort with proper string', async () => {
    const errorResult = await transformAndValidate({sort: 'test'});
    expect(errorResult.length).toBe(0);
  });

  it('validates sort with multiple stirngs', async () => {
    const errorResult = await transformAndValidate({sort: 'name,description'});
    expect(errorResult.length).toBe(0);
  });

  it('validates sort with array of strings', async () => {
    const errorResult = await transformAndValidate({sort: ['name','description']});
    expect(errorResult.length).toBe(0);

  });

  it('validates sort empty string', async () => {
    const errorResult = await transformAndValidate({sort: ''});
    expect(errorResult.length).toBe(1);
    expect(errorResult[0].constraints.isNotEmpty).toBeDefined();
  });

  it('validates skip with proper number', async () => {
    const errorResult = await transformAndValidate({search: 'test', skip: 1});
    expect(errorResult.length).toBe(0);
  });

  it('validates that skip is less than 0', async () => {
    const errorResult = await transformAndValidate({search: 'test', skip: -1});
    expect(errorResult.length).toBe(1);
    expect(errorResult[0].constraints.min).toBeDefined();
  });

  it('validates limit with expected value', async () => {
    const errorResult = await transformAndValidate({search: 'test', limit: 10});
    expect(errorResult.length).toBe(0);
  });

  it('validates that limit with value less than 1', async () => {
    const errorResult = await transformAndValidate({search: 'test', limit: 0});
    expect(errorResult.length).toBe(1);
    expect(errorResult[0].constraints.min).toBeDefined();
  });

  it('validates with proper search, sort, skip and limit', async () => {
    const errorResult = await transformAndValidate({
        search: 'test',  
        sort: 'name',
        skip: 1,
        limit: 1
    });
    expect(errorResult.length).toBe(0);
  });


  function transformAndValidate(
    params: any,
  ): Promise<ValidationError[]> {
    return validate(plainToClass(SearchQueryParamsDTO, params));
  }
});
