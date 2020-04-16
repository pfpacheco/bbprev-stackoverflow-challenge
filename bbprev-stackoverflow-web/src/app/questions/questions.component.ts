import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Search} from "./search/search";
import {SearchService} from "./search/search.service";
import {Question} from "./question/question";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  formGroup: FormGroup;
  questions: Question[];
  items: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        fsearch: ['', [
          Validators.required,
          Validators.pattern('^[_A-z0-9-?]*((-|\\s)*[_A-z0-9-?])*$')
        ]],
        items:['', [this.formBuilder.array([this.createItem()])]]
      });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({

    });
  }

  validate() {
    if (!this.formGroup.valid) {
      alert('Invalid search field!');
      this.formGroup.controls.fsearch.reset();
      return false;
    }
    return true;
  }

  onSubmit() {
    let search: Search = null;

    if (this.validate()) {

      search = {
        search: this.formGroup.controls.fsearch.value
      }

      this.searchService.searchQuestions(search).subscribe((questions: Question[]) => {
        this.questions = questions;
        if (this.questions.length > 0) {
          for (const question of this.questions) {

          }
        }
      });
    }
  }
}
