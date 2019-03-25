import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { PetComponent } from './pet.component';
import { mockData } from '../shared/mocks/pet.mocks';
import { PetService } from 'src/app/core/services/pet.service';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('PetComponent', () => {
  let component: PetComponent;
  let fixture: ComponentFixture<PetComponent>;
  let de: DebugElement;
  let service: PetService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PetComponent ],
      providers: [ PetService],
      imports: [HttpClientModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should call getData function and retrive the data from api', () => {
    service = de.injector.get(PetService);
    fixture.detectChanges();

    spy = spyOn(service, 'getData').and.returnValue(of(mockData));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.cats).toBeDefined();
  });

  it('should extractCats function return the list of cats grouped by gender of their owner', () => {

    let cats = component.extractCats(mockData);
    expect(cats.male.length).toEqual(4);
    expect(cats.female.length).toEqual(3);
  });

  it('should extractCats function handle null/empty list', () => {

    let cats = component.extractCats(null);
    expect(cats).toBeUndefined();

    cats = component.extractCats(undefined);
    expect(cats).toBeUndefined();

  });
});
