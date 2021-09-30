
//3 approaches fo handling validation
// Highlighting the errors-->
// Disabling the submit Button --> force to enter mandatory fields
// Custom field Validation --> show hidden Error message
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { ErrorMessage } from 'src/app/models/error-message';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  formdata : FormGroup; //step 3:give the same formGroup as in template



  //step 4:inject the form builder
  // constructor(private fb: FormBuilder) {
  //   this.formdata = fb.group({ //building the form using formBuilder
  //     userName:new FormControl(),//in the formbuilder we are creating the group of  formBuilder.
  //     password:new FormControl(),//theses should be exactly same as your form
  //     confirmPassword:new FormControl(),//we can also have it by dynamic
  //     preferredlanguage:new FormControl(),
  //     question:new FormControl(),
  //     securityAnswer:new FormControl()
  //   });

  constructor(private fb: FormBuilder) {
    this.formdata = this.fb.group({ //building the form using formBuilder
      userName:['',[Validators.minLength(5),Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,40}$")]],
      password:['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['',Validators.required],
      preferredlanguage: ['',Validators.required],
      question: ['',Validators.required],
      securityAnswer:['',Validators.required]
    },
    {
        validators : this.mustMatch('password','confirmPassword')
       });
    // ,

  }
  get userName():any|null{ return this.formdata.get('userName');}
  get password():any|null{ return this.formdata.get('password');}
  get confirmPassword():any|null{ return this.formdata.get('confirmPassword');}
  get preferredlanguage():any|null{ return this.formdata.get('preferredlanguage');}
  get securityAnswer():any|null{ return this.formdata.get('securityAnswer');}
  get question():any|null{ return this.formdata.get('question');}

  // checkPasswords: ValidatorFn = (group: FormData): | null => {
  //   let pass = group.get('password').value;
  //   let confirmPass = group.get('confirmPassword').value
  //   return pass === confirmPass ? null : { notSame: true }
  // }

  ngOnInit(): void {

  }

  onClickSubmit() {
    //console.log('Form Object :',this.formdata, this.fb);
    console.log(this.formdata.value);
    console.log('UserName : ',this.formdata.value);
    console.log('password : ', this.formdata.value.password);

  }

  mustMatch(controlName: any,matchingControlName: any){
    return(formdata: FormGroup)=>{
      const control = formdata.controls[controlName];
      const matchingcontrol = formdata.controls[matchingControlName];
      if(matchingcontrol.errors && !matchingcontrol.errors.mustMatch){
        return
      }
      if(control.value != matchingcontrol.value){
        matchingcontrol.setErrors({mustMatch :true})
      }
      else{
        matchingcontrol.setErrors(null);
      }
    }
  }
}


