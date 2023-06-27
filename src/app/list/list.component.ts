import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

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
  user!: User;
  selectedDocument: {
    title: string;
    optionalValues: optionalValues;
  };
  isSuccess: boolean = false
  isDeleted: boolean = false
  selectedTitle: {title: string} = {title: ''}
  isEditing: boolean = false
  isEditingTitle: boolean = false
  newTitle: string = ''
  constructor(private documentService: DocumentService, private authenticationService: AuthenticationService) {
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
    this.authenticationService.user.subscribe((res) => (this.user = res));
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
    
    if(localStorage.getItem('document')){
      let newDocument = JSON.parse(localStorage.getItem('document')|| '{}')
      if(newDocument)
      this.documentList.push(newDocument)  
    }
    
    if(localStorage.getItem('documentList') ){
      let documentList = JSON.parse(localStorage.getItem('documentList')|| '{}')
      if(documentList)
      this.documentList = documentList
    }

  }

/**
 * The function returns a random integer between 1 and 100.
 * @returns A random integer between 1 and 100 (inclusive) is being returned.
 */
  getRandomId() {
    return Math.floor((Math.random()*100)+1);
  }

/**
 * The function allows for editing of a document's title and optional values.
 * @param {string} title - A string representing the title of a document.
 * @param {any} [optionalValue] - optionalValue is an optional parameter of type "any". It can be used
 * to pass additional values to the function, such as an object with properties like name, type,
 * isRequired, and id. If this parameter is provided, the function sets the isEditing flag to true and
 * creates a new selected
 */
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

/**
 * This function updates a specific optional value of a selected document in a document list.
 * @param {number} optionalValuesIndex - The index of the optional value in the selected document's
 * optionalValues array that needs to be changed.
 * @param {number} documentIndex - The index of the document in the documentList array that needs to be
 * updated.
 */
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
    this.documentService.patchDocument(this.selectedDocument.title).subscribe({
      next: (data) => {
        
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
    let documentStorageList = JSON.parse(localStorage.getItem('documentList') || '{}')
    if(documentStorageList){
      localStorage.removeItem('documentList')
    }
    localStorage.setItem('documentList', JSON.stringify(this.documentList))
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

/**
 * This function changes the title of a selected document in a document list.
 */
  changeTitle() {
    this.documentList.forEach( (res, index) => {
      if(this.selectedTitle.title === res.title)
      this.documentList[index].title = this.newTitle
    })
    this.documentService.patchDocument(this.newTitle).subscribe({
      next: (data) => {
        
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
      },
      error: (err) => {
        console.log(err);
      },
    });
    let documentStorageList = JSON.parse(localStorage.getItem('documentList') || '{}')
    if(documentStorageList){
      localStorage.removeItem('documentList')
    }
    localStorage.setItem('documentList', JSON.stringify(this.documentList))

    this.selectedTitle = {
      title: '',
    };
    this.isEditingTitle = false 

  }

  deleteDocument(document: Document){
    this.documentList.forEach((res, index) => {
      if(res == document ){
        this.documentList.splice(index, 1)
      }
    })

    this.isDeleted = true
    setTimeout(() => {
      this.isDeleted = false;
    }, 2000);

    let documentStorageList = JSON.parse(localStorage.getItem('documentList') || '{}')
    if(documentStorageList){
      localStorage.removeItem('documentList')
    }
    console.log(documentStorageList)
    localStorage.setItem('documentList', JSON.stringify(this.documentList)) 

  }

}
