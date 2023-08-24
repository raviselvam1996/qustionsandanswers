import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Qustions,Answers } from './qusans';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qusans';

  qusid:any;
  qustion:any;
  ans:any;
  mergedObject: any;
  answers: any;
  postQusId: any;
  finalans:any;
  postAnsId: any;
  mergedObjectans :any;
  qusAns: any;
  ansIdQus:any;
  QustionId: any;
  
  
constructor(private fb:FormBuilder,private http:HttpClient){
  this.getqus();
}
qusForm=this.fb.group({
  qus:['']

})

ansForm=this.fb.group({

  ans:['']

})

addqus(){
  console.log(this.qusForm.value);
  
  this.http.post("http://localhost:3000/qustion",this.qusForm.value).subscribe()
  this.ans = [];
  const raju = {};
  this.ansIdQus = this.qustion.length + 1;
  console.log(this.ansIdQus);
  
  this.mergedObject = { ...raju,  qusid: this.ansIdQus  ,ans:this.ans};

  this.http.post("http://localhost:3000/answer",this.mergedObject).subscribe()
  setTimeout(() => {
    this.getqus();
  }, 2000);
}

addans(id:any){
  
  console.log(this.ansForm.value);
 this.ans = [];
 this.ans.push(this.ansForm.value.ans)
 console.log(this.ans);
 

 var answerForQus = []


 const raju = {}
 
 console.log(this.finalans);
 console.log(this.postAnsId);
 const myChildren = this.finalans.concat(this.ans);
 // this.finalans.concat(this.ans )
 this.mergedObjectans = { ...raju,  qusid: id,ans:myChildren };
//  this.mergedObject = { ...raju,  qusid: id ,ans:this.ans};

 

//  if(this.postQusId == 0){

// console.log('raviselvan');
// this.http.post("http://localhost:3000/answer",this.mergedObject).subscribe()

//  }
//  else{

  console.log('uthaya');
  console.log(this.postAnsId);
  
  this.http.put(`http://localhost:3000/answer/${this.postAnsId}`,this.mergedObjectans).subscribe();
  
//  }

}

getqus(){
  
  this.getAllAnswers()
  this.http.get("http://localhost:3000/qustion").subscribe((res)=>{
this.qustion = res;
for(var i=0 ; i < this.qustion.length;i++){
  this.qustion[i]["ans"] = this.qusAns[i].ans
  }

// const answerss = this.qustion.filter((p: any) => p.id);
// console.log(answerss);

  })

 
}
 
getans(){
  
  console.log('rasss');
  
  this.http.get("http://localhost:3000/answer").subscribe((res)=>{

const answerArray = res as any[]; // Assuming your response is an array of objects
// this.finalans = answerArray.filter((p: any) =>{
//   return p.ans

// });

// console.log(this.finalans);


this.answers = answerArray.find((p: any) => p.qusid === this.QustionId);
// if(this.answers != undefined){
  console.log(this.answers);
  this.finalans = this.answers.ans
  this.postQusId = this.answers.qusid
  this.postAnsId = this.answers.id
  console.log(this.postAnsId);
  const raju = {}
 
  console.log( this.mergedObjectans);
  this.addans(this.QustionId);
  setTimeout(() => {
    this.getqus();
  }, 2000);
  

// }
// else{
//   this.postQusId = 0;
//   this.finalans = [];
//   this.addans(id);
// }





});


}
getAllAnswers(){
  this.http.get("http://localhost:3000/answer").subscribe((res)=>{

this.qusAns = res;
console.log(this.qusAns);
// const answerss = this.qusAns.find((p: any) => p.qusid === id);


  })
}

modelfun(id:any){

  this.QustionId = id ;
  console.log(this.QustionId);
   
}


}
