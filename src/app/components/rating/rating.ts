import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-rating',
  templateUrl: './rating.html',
  styleUrl: './rating.css',
})
export class Rating {
  value = input<number>(0);

  editable = input(false);

  ratingChanged = output<number>();

  stars = [1, 2, 3, 4, 5];

  setRating(star: number): void {
    if (!this.editable()) {
      return;
    }

    this.ratingChanged.emit(star);
  }
}
