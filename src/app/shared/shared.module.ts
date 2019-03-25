import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { SortListPipe } from './components/pipes/list-sort-pipe.pipe';

@NgModule({
  declarations: [
    ListComponent,
    SortListPipe
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    ListComponent, 
    SortListPipe
  ]
})
export class SharedModule { }
