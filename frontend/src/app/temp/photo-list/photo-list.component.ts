import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '../shared/model/Photo';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.css'
})
export class PhotoListComponent implements OnInit {

  employees?: Photo[];

  constructor(private empSvc: PhotoService, private router: Router) { }

  ngOnInit(): void {
    this.empSvc.getPhotoList().subscribe(data => {
      // console.log("employee  list>>> " + data)

      for (let i = 0; i < data.length; i++) {
        console.log("employee >>> " + data[i].id + " >>> " + data[i].profileURL)
      }
      this.employees = data;
    });
  }

  deletePhoto(id: number) {
    console.log("employee  list delete record id >>> " + id);
    this.empSvc.deletePhotoById(id).subscribe((data) => {
      this.router.navigate(['/photos']);
    });
    // call API using empSvc to perform the delete of the record
  }

  showPhotoDetails(id: number) {
    console.log("employee  list show details record id >>> " + id);
    this.router.navigate([`/employee-details/${id}`]);
  }

  updatePhoto(id: number) {
    this.router.navigate([`/update-employee/${id}`]);
  }
}