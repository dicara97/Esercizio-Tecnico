import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../services/document.service';
interface optionalValues {
  name: string;
  type: string;
  isRequired: boolean
}

const DEFAULT = { title: '', optionalValues: [] };
const resetToDefault = (state: any) => Object.assign(state, DEFAULT);
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loading = false;
  user!: User
  documentForm!: FormGroup
  optionalFieldsForm!: FormGroup
  openStatus = false;
  openedSelect!: any
  canAdd: boolean = false
  isEditing: boolean = false
  isIncomplete = true
  titleAdded: boolean = false
  optionalValueAdded: boolean = false
  documentSubmitted: {
    title: string,
    optionalValues: optionalValues []
  } 

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private documentService: DocumentService
    ) {
      this.documentSubmitted = {
    title: '',
    optionalValues: []
  };
     }

  ngOnInit() {
      this.loading = false;
      this.authenticationService.user.subscribe(res => this.user = res);
      this.createOptionFieldsForm()
      this.createForm()
  }

  createForm(){

    this.documentForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      optionalValues: this.formBuilder.group({})
    });

  }

  createOptionFieldsForm(){
    this.optionalFieldsForm = this.formBuilder.group({
      optionalValues: this.formBuilder.array([this.createOptionalValueGroup()], Validators.required)
    });
  }

addOptionaValueFormGroup() {
  this.canAdd = false
  this.optionalValueAdded = false
  const values = this.optionalFieldsForm.get('optionalValues') as FormArray
  values.push(this.createOptionalValueGroup())
}

addOptionalValueIntoDocumentForm(type: string,i?: number){
  if(type == 'optional')
  this.canAdd = !this.canAdd
  switch (type) {
    case 'title':
      this.documentSubmitted.title = this.documentForm.value.title
      if(this.documentSubmitted.title != '')
      this.titleAdded = true
        break;
    case 'optional':
      this.optionalValueAdded = true
      if(i || i == 0)
         this.documentSubmitted.optionalValues.push(this.optionalValues.value[i])
        break;
    default:
}
}
get optionalValues()
 {  
  return <FormArray>this.optionalFieldsForm.get('optionalValues'); 
 }

removeOptionalValue(i: number) {
  this.documentSubmitted.optionalValues.length > 0 ? this.canAdd = true : this.canAdd = false
  if(this.documentSubmitted.optionalValues.length === 1)
  this.canAdd = false
  this.documentSubmitted.optionalValues.splice(i ,1)
  if(this.optionalFieldsForm.value.optionalValues[this.optionalFieldsForm.value.optionalValues.length - 1].name === ''){
    this.canAdd = false
  }
  console.log(this.canAdd)
  // const values = this.optionalFieldsForm.get('optionalValues') as FormArray
  // if (values.length > 1) {
  //   values.removeAt(i)
  // } else {
  //   values.reset()
  // }
}

resetOptionalValue(type: string, i?: number) {
  switch (type) {
    case 'title':
    this.titleAdded = false
    this.documentForm.reset()
    this.documentSubmitted.title = ''
        break;
    case 'optional':
      this.optionalValueAdded = false
      if(i || i == 0){
        this.optionalValues.removeAt(i)
        this.addOptionaValueFormGroup()
      }
        break;  
    case 'all':
        this.titleAdded = false
        this.optionalValueAdded = false
        this.documentSubmitted.title = ''
        this.documentSubmitted.optionalValues.length = 0
        this.documentForm.reset()
        this.optionalFieldsForm.reset()
        this.optionalValues.reset()
        this.createOptionFieldsForm()
        this.createForm()
        this.canAdd = false
        // if(this.optionalValues.value.length === 0)
        // this.addOptionaValueFormGroup()
        break;

}
}

editOptionalValue(selectedEdited: any, i: number){
  this.isEditing = true
  this.documentSubmitted.optionalValues.splice(i ,1)
}
createOptionalValueGroup(): FormGroup {
  return new FormGroup({
    'name': new FormControl('', Validators.required),
    'type': new FormControl('',Validators.required),
    'isRequired': new FormControl(false),

  })
}

checkValues(){
  if(!this.titleAdded) return false
  else if(!this.optionalValueAdded) return false
  else return true

}

onSubmit(){
  this.documentService.addValue(this.documentSubmitted)
  this.documentService.addDocument(this.documentSubmitted).subscribe(res => {
    console.log(res)
  })

}



}
