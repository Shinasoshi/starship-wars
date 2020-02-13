export class Starship {
  name: string;
  model: string;
  cargoCapacity: number;
  costInCredits: number;
  crew: number;
  length: number;
  passengers: number;

  constructor(starship) {
    this.name = starship.name;
    this.model = starship.model;
    this.cargoCapacity = starship.cargo_capacity;
    this.costInCredits = starship.cost_in_credits;
    this.crew = starship.crew;
    this.length = starship.length;
    this.passengers = starship.passengers;
  }
}
