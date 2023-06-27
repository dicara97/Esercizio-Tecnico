import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documentSubject: BehaviorSubject<any> = new BehaviorSubject<void>(undefined);
  public document: Observable<Document>
  constructor(private http: HttpClient) {
    this.document = this.documentSubject.asObservable()
   }

   public get docValue(): Document {
    return this.documentSubject.value
  }

  public addValue(data: any): Document {
    this.documentSubject.next(data)
    return this.documentSubject.value
  }

   addDocument(document: any){
    return this.http.post<any>(`${environment.api}/document/create`, {document})
    .pipe(map((data: Document )=> {
      localStorage.setItem('document', JSON.stringify(data));
      return data
    }))
  }

  patchDocument(title: string){
    return this.http.patch<any>(`${environment.api}/document/${title}`, {document})
    .pipe(map((data: Document )=> {
      return data
    }))
  }
}
