import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

import {Search} from "./search";
import {Question} from "../question/question";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = 'http://localhost:5000/api/stackoverflow';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    )
  }

  public searchQuestions(search: Search): Observable<any[]> {
    const url = this.baseUrl + '/questions'
    return this.httpClient
      .post<Question[]>(url, search, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  public searchQuestionById(id: String): Observable<Question> {
    const url = this.baseUrl + '/question/' + id;
    return this.httpClient
      .get<Question>(url)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error code: ${error.status}, ' + 'message: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
