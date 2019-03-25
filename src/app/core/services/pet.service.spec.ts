import { PetService } from './pet.service';
import { asyncData, asyncError } from './async-observable-helpers';
import { HttpErrorResponse } from '@angular/common/http';
import { mockData } from 'src/app/shared/mocks/pet.mocks';

describe('PetService', () => {
  
    let httpClientSpy: { get: jasmine.Spy };
    let petService: PetService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        petService = new PetService(<any> httpClientSpy);
    });

    it('should return pet data', () => {
        const expectedData  = mockData;
    
        httpClientSpy.get.and.returnValue(asyncData(expectedData));
    
        petService.getData().subscribe(pets => expect(pets).toEqual(expectedData), fail);
        expect(httpClientSpy.get.calls.count()).toBe(1);
    });
    
    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404, statusText: 'Not Found'
        });
    
        httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    
        petService.getData().subscribe(
            heroes => fail('expected an error'),
            error  => expect(error).toContain('test 404 error')
        );
    });
});
