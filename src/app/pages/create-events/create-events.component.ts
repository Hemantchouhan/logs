import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-events',
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.scss']
})
export class CreateEventsComponent implements OnInit {

  eventForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private dataService: DataService
  ) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      type: ['', Validators.required],
      userid: ['', Validators.required],
      timestamp: ['', Validators.required]
  });
  }
    // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.eventForm.invalid) {
          return;
      }

      this.loading = true;
      this.dataService.save(this.f)
          .subscribe(
              data => {
                if(data.saved){
                  this.router.navigate('/events');
                } else {
                  this.error = data.user;
                  this.loading = false;
                }
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}
