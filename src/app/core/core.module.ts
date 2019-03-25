import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PetService } from './services/pet.service';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
  ],
  providers: [PetService],
})
export class CoreModule { }
