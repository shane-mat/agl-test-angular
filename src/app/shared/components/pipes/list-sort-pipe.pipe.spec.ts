import { SortListPipe } from './list-sort-pipe.pipe';
import { async, TestBed } from '@angular/core/testing';

describe('ListSortPipePipe', () => {

  let pipe: SortListPipe;

  beforeEach(() => {
    pipe = new SortListPipe();
  });
  
  it('create an instance', () => {
    pipe = new SortListPipe();
    expect(pipe).toBeTruthy();
  });

  it('should sort the list of items alphabetically', () => {
    let listToSort = [
      {"name": "Max"},
      {"name": "Garfield"}, 
      {"name": "Fido"},
    ];
    let sortedList = [
      {"name": "Fido"},
      {"name": "Garfield"}, 
      {"name": "Max"},
    ];

    expect(pipe.transform(listToSort, 'name')).toEqual(sortedList);
  });
});
