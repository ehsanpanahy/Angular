import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService} from '../services/dish.service';

import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';

import {Dish} from '../shared/dish';

import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  
    commentFlag: number;
    commentForm:FormGroup;
    comment: Comment;
    dish: Dish;
    dishCopy = null;
    dishIds: number[];
    prev: number;
    next: number;
    errMess: string;
    visibility = 'shown';
    formErrors = {
      'author': '',
      'comment': ''
    };

    validationMessages = {
      'author': {
        'required':     ' The Name field is required.',
        'minlength':    ' First Name must be at least 2 characters long.',

      },
      'comment': {
        'required':     ' The Comment field is required.',
      }
    };

    constructor(private dishService: DishService, 
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) {
        this.createForm();

       }

       createForm(): void {
        this.commentForm = this.fb.group({
          author:['',[Validators.required, Validators.minLength(2)]],
          rating:5,
          comment:['', Validators.required]

        });

        this.commentForm.valueChanges
          .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
       }

       onValueChanged(data?: any){

        this.comment = this.commentForm.value;
        //this.comment.rating = this.commentForm.get('rating').value;
        const newDate = new Date(Date.now());
        this.comment.date = newDate.toISOString() ;

        if(!this.commentForm) {return;}
        const form = this.commentForm;

        if (form.valid){
          this.commentFlag = 1;
        }
        
        for (const field in this.formErrors){
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty  && !control.valid){
            
            const messages = this.validationMessages[field];
            for (const key in control.errors){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
       };

       onSubmit() {

        //this.dish.comments.push(this.comment);
        this.dishCopy.comments.push(this.comment);
        this.dishCopy.save()
          .subscribe(dish => this.dish = dish);
        this.commentFlag = 0;
        console.log(this.comment);
        this.commentForm.reset ({
          author: '',
          rating:5,
          comment: ''
        });
      }

  ngOnInit() {
    this.dishService.getDishId()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility='hidden'; 
        return this.dishService.getDish(+params['id']);
      }))
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
        },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) 
  {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; // The parameter is just a way of wrapping around the array items in a mathematical trick
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length]; // The parameter is just a way of wrapping around the array items in a mathematical trick

  }

  goBack(): void {
    this.location.back();
  }



}
