import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {LeftViewComponent} from "../left-view/left-view.component";
import {RightViewComponent} from "../right-view/right-view.component";
import {PredictionResponse} from "../../domain/prediction.response";
import {take} from "rxjs";
import {PredictionService} from "../../services/prediction.service";

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [
    LeftViewComponent,
    RightViewComponent
  ],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionComponent {
  public readonly LEFT_TITLE: string = 'UPLOAD IMAGE';
  public readonly RIGHT_TITLE: string = 'IDENTIFICATION RESULTS';

  public predictionResults!: PredictionResponse | undefined;

  constructor(private _predictionService: PredictionService, private _cdr: ChangeDetectorRef) {
  }

  public selectedFile(file: File | undefined): void {
    if (file) {
      this._predictionService.predictImage(file).pipe(take(1))
        .subscribe({
          next: (prediction: PredictionResponse) => {
            this.predictionResults = prediction;
            this._cdr.markForCheck();
          },
          error: (error) => {
            console.error('Image not found', error);
          }
        });
    }
  }

  public onClear(): void {
    this.predictionResults = undefined;
  }
}
