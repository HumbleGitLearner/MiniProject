
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../shared/model/Photo';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrl: './photo-details.component.css'
})
export class PhotoDetailsComponent implements OnInit {

  id!:number;
  photo?: Photo;
  
  constructor(private route: ActivatedRoute, private empSvc: PhotoService, private router: Router) { }

  ngOnInit(): void {
    // read the URL endpoint route value
    this.id = this.route.snapshot.params['id'];

    this.empSvc.getPhotoById(this.id).subscribe(data => {
      this.photo = data;
    });
      
  }

  backToList(): void {
    this.router.navigate(['/photos']);
  }

}
