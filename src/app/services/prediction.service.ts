/**
 * @author Milton Romero
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {PredictionResponse} from "../domain/prediction.response";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://127.0.0.1:5000/predict';

  constructor(private http: HttpClient) {
  }

  public predictImage(imageData: File): Observable<PredictionResponse> {
    const formData = new FormData();

    formData.append('imageData', imageData);

    return this.http.post<PredictionResponse>(this.apiUrl, formData);
  }
}
