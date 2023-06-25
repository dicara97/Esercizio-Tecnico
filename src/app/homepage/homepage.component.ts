import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
interface optionalValues {
  name: string;
  type: string;
  isRequired: boolean
}
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
  documentSubmitted: {
    title: string,
    optionalValues: optionalValues []
  } 

  constructor(
    private userService: UserService, 
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
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
  const values = this.optionalFieldsForm.get('optionalValues') as FormArray
  values.push(this.createOptionalValueGroup())
}

addOptionalValueIntoDocumentForm(type: string,i?: number){
  this.canAdd = !this.canAdd
  switch (type) {
    case 'title':
      this.documentSubmitted.title = this.documentForm.value.title
        break;
    case 'optional':
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
  console.log(this.documentSubmitted.optionalValues)
  const values = this.optionalFieldsForm.get('optionalValues') as FormArray
  if (values.length > 1) {
    values.removeAt(i)
  } else {
    values.reset()
  }
}

resetOptionalValue(type: string, i?: number) {
  switch (type) {
    case 'title':
    this.documentForm.reset()
    this.documentSubmitted.title = ''
        break;
    case 'optional':
      if(i || i == 0){
        this.optionalValues.removeAt(i)
        this.addOptionaValueFormGroup()
      }
      
    // this.optionalFieldsForm.reset()

        break;
    default:
}
}

editOptionalValue(selectedEdited: any, i: number){
  this.isEditing = true
  console.log(i)
  console.log(selectedEdited)
  this.documentSubmitted.optionalValues.splice(i ,1)
}
createOptionalValueGroup(): FormGroup {
  return new FormGroup({
    'name': new FormControl('', Validators.required),
    'type': new FormControl('',Validators.required),
    'isRequired': new FormControl(false),

  })
}

onSubmit(){
console.log(this.optionalFieldsForm.valid)
console.log()
}



}
