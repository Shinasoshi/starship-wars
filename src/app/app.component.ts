import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceForm } from './models/resource-form.model';
import { Starship } from './models/starship.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  starships: Starship[] = [];
  playerOneScore = 0;
  playerTwoScore = 0;

  playerOneStarship: Starship;
  playerTwoStarship: Starship;

  resourceForm: ResourceForm;
  resourceFormGroup: FormGroup;

  resources = [
    'cargoCapacity',
    'costInCredits',
    'crew',
    'length',
    'passengers'
  ];

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getStarships();
    this.initializeForm();
  }

  getStarships() {
    this.apiService.getStarships().pipe(take(1)).subscribe((response: any) => {
      response.results.map(starship => {
        this.starships.push(new Starship(starship));
      });
      this.assignStarshipsToPlayers();
    });
  }

  assignStarshipsToPlayers() {
    this.playerOneStarship = this.starships[this.generateRandomNumber()];
    this.playerTwoStarship = this.starships[this.generateRandomNumber()];
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  initializeForm() {
    this.resourceForm = new ResourceForm();
    this.resourceFormGroup = this.fb.group({
      resource: [this.resourceForm.resource, [Validators.required]]
    });
  }

  submitForm() {
    if (this.resourceFormGroup.valid) {
      const resourceName = this.resourceFormGroup.value.resource;

      if (
        this.playerOneStarship[resourceName] !== 'unknown'
        && this.playerTwoStarship[resourceName] !== 'unknown'
        && this.playerOneStarship[resourceName] !== this.playerTwoStarship[resourceName]
      ) {
        +this.playerOneStarship[resourceName] > +this.playerTwoStarship[resourceName] ? this.playerOneScore += 1 : this.playerTwoScore += 1;
      }

      this.assignStarshipsToPlayers();
    }
  }

}
