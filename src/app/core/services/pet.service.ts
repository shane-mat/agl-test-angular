
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable()
export class PetService {

  constructor(public http: HttpClient) {
  }

  public getData() {
    const url = 'http://agl-developer-test.azurewebsites.net/people.json';

    return this.http
      .get(url)
      .pipe(map(data => data), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}