import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListComponent } from './list.component';
import { SortListPipe } from '../pipes/list-sort-pipe.pipe';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent, SortListPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render the list of cats passed to the @Input', () => {

    component.items =  [
                        {"name": "Garfield"}, 
                        {"name": "Fido"}
                      ];

    fixture.detectChanges();

    const ulDebugEl = fixture.debugElement.query(By.css('ul'));
    const ulEl = ulDebugEl.nativeElement as HTMLUListElement;
    
    expect(ulEl.childElementCount).toBe(component.items.length);
  });

  it('should display no cats when empty list passed', () => {

    component.items =  [];
    component.type = 'Cat';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.no-item'));
    
    expect(el.nativeElement.textContent).toBe('No Cat');
  });
});
