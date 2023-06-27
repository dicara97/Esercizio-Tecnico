import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document.model';

interface optionalValues {
  name: string;
  type: string;
  isRequired: boolean;
  id: number
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

  selectedTitle: {title: string} = {title: ''}
  isEditing: boolean = false
  isEditingTitle: boolean = false
  newTitle: string = ''
  constructor(private documentService: DocumentService) {
    this.selectedDocument = {
      title: '',
      optionalValues: {
        name:'',
        type:'',
        isRequired: false,
        id: this.getRandomId()
      },
    };
   }

  ngOnInit(): void {
    this.documentList.push({
      title: 'Example',
      optionalValues: [{
        name: 'esempio nome 1',
        type: 'string',
        isRequired: false,
        id: this.getRandomId()
      },
      {
        name: 'esempio nome 2',
        type: 'string',
        isRequired: true,
        id: this.getRandomId()
      },
    ]
    })
    
    let newDocument = JSON.parse(localStorage.getItem('document')|| '{}')
    if(newDocument)
    this.documentList.push(newDocument)
  }

  getRandomId() {
    return Math.floor((Math.random()*100)+1);
  }

  editDocument(title: string, optionalValue?: any){
      if(optionalValue){
        this.isEditing = true
        this.selectedDocument = {
          title: title,
          optionalValues: {
            name: optionalValue.name,
            type: optionalValue.type,
            isRequired: optionalValue.isRequired,
            id: optionalValue.id
          }
        }
      } else {  
        this.isEditingTitle = true
        this.newTitle = title
        this.selectedTitle = {
          title: title
        }
      }

  }

  changeValue(optionalValuesIndex: number, documentIndex: number){
    this.isEditing = false
    this.documentList.forEach((res) => {
      if(this.selectedDocument.title === res.title)
        if(res.optionalValues[optionalValuesIndex].id, this.selectedDocument.optionalValues.id){
          this.documentList[documentIndex].optionalValues[optionalValuesIndex] =
          this.selectedDocument.optionalValues
        }
      // }
    })
    this.selectedDocument = {
      title: '',
      optionalValues: {
        name:'',
        type:'',
        isRequired: false,
        id: this.getRandomId()
      },
    };
    
  }

  changeTitle() {

    this.documentList.forEach( (res, index) => {
      if(this.selectedTitle.title === res.title)
      this.documentList[index].title = this.newTitle
    })
    this.selectedTitle = {
      title: '',
    };
    this.isEditingTitle = false 

  }

}
