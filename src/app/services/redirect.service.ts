import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
      private router: Router,
  ) { }

  toLogin(url: string = ''){
    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
  }
  toHome(){
    this.router.navigate(['/']);
  }

  toUpdateNugget(id: string){
    this.router.navigate(['update-nugget', id]);
  }
}
