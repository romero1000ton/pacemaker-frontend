import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-left-view',
  standalone: true,
  templateUrl: './left-view.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './left-view.component.scss'
})
export class LeftViewComponent {

  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  public UPLOAD_IMAGE_PATH: string = 'assets/add_image.svg';

  public selectedImage!: string;

  private _currentFile: File | undefined;

  @Output() public uploadImage: EventEmitter<File | undefined>;
  @Output() public clear: EventEmitter<void>;

  constructor(private _cdr: ChangeDetectorRef) {
    this.uploadImage = new EventEmitter<File | undefined>();
    this.clear = new EventEmitter<void>();
  }

  public onFileSelected(event: any): void {
    const selectedFile: Blob = new Blob([event.target.files[0]], {type: 'application/octet-stream'});
    this._currentFile = event.target.files[0];

    if (selectedFile) {
      this._previewImage(selectedFile);
    }
  }

  public clearImage(): void {
    this.selectedImage = '';
    this._currentFile = undefined;
    this.clear.emit();
  }

  public predict(): void {
    this.uploadImage.emit(this._currentFile);
  }

  private _previewImage(file: Blob): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.selectedImage = e.target.result.toString();
        this._cdr.markForCheck();
      }
    };

    reader.readAsDataURL(file);
  }
}
