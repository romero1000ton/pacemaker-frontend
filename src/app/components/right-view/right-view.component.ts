import {Component, Input} from '@angular/core';
import {PredictionResponse} from "../../domain/prediction.response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-right-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './right-view.component.html',
  styleUrl: './right-view.component.scss'
})
export class RightViewComponent {
  @Input() public predictionResults!: PredictionResponse | undefined;
}
