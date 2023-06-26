import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document.model';

interface optionalValues {
  name: string;
  type: string;
  isRequired: boolean;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  documentList: any[] = []
  response: any 
  selectedDocument: {
    title: string;
    optionalValues: optionalValues;
  };
  constructor(private documentService: DocumentService) {
    this.selectedDocument = {
      title: '',
      optionalValues: {
        name:'',
        type:'',
        isRequired: false
      },
    };
   }

  ngOnInit(): void {
    this.documentList.push({
      title: 'Example',
      optionalValues: [{
        name: 'esempio nome 1',
        type: 'string',
        isRequired: false
      },
      {
        name: 'esempio nome 2',
        type: 'string 2',
        isRequired: true
      },
    ]
    })
    
    let newDocument = JSON.parse(localStorage.getItem('document')|| '{}')
    this.documentList.push(newDocument)
  }

  editDocument(title: string, optionalValue: any){

      this.selectedDocument = {
        title: title,
        optionalValues: {
          name: optionalValue.name,
          type: optionalValue.type,
          isRequired: optionalValue.isRequired,
        }
      }

      console.log(this.selectedDocument)
  }

}
