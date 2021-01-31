import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UploadService } from './upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef;
  fileAttr = 'Choose Listing and Contact Files ';
  formData?: FormData;
  dataSource?: any
  constructor(private _service: UploadService) { }

  ngOnInit(): void {

  }
  uploadFileEvt(CsvFile: any) {
    this.dataSource = {};
    if (CsvFile.target.files.length != 2)
      return alert("Select Only Two files")

    if (CsvFile.target.files && CsvFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(CsvFile.target.files).forEach((file: any) => this.fileAttr += file['name'] + ' - ');

      this.formData = new FormData();

      for (let i = 0; i < CsvFile.target.files.length; i++)
        this.formData.append(`uploadFile[${i}]`, CsvFile.target.files[i]);

      this._service.uploadListing(this.formData, (res: any) => {
        if (!res.error) {
          this.dataSource = res.data;
          console.log(res);
        }
        else {
          alert(res.error)
        }
      })

    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
