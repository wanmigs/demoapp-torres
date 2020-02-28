import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';
  selected: Array<string> = [];
  users: User[];
  search: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      tap((users: User[]) => (this.users = users)),
      catchError(this.handleError<User[]>(`getUsers`))
    );
  }

  getuser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => console.log(`fetch users`)),
      catchError(this.handleError<User>(`getUsers`))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`add users`)),
      catchError(this.handleError<User>(`getUsers`))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.baseUrl}/${user._id}`, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`update users`)),
        catchError(this.handleError<User>(`getUsers`))
      );
  }

  getSelected(): Array<string> {
    return this.selected;
  }

  setSelected(selected: Array<string>) {
    this.selected = [...selected];
  }

  deleteUser(id: string): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      tap(_ => {
        const index = this.users.findIndex(user => user._id === id);
        this.users.splice(index, 1);
      }),
      catchError(this.handleError(`getUsers`))
    );
  }

  setSearch(value: string) {
    this.search = value;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
