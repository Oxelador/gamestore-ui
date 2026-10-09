import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Publisher } from '../models/publisher/publisher.model';
import { Observable } from 'rxjs';
import { CreatePublisherRequest } from '../models/publisher/publisher-create-request.model';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${this.apiUrl}/publishers`);
  }

  addPublisher(publisher: CreatePublisherRequest): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.apiUrl}/publishers`, publisher);
  }
}
