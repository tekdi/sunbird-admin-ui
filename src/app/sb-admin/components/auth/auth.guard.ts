import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    let userToken;
    if (sessionStorage.length > 0 && sessionStorage.getItem('token') !== undefined && sessionStorage.getItem('token') !== '' && sessionStorage.getItem('token') !== null) {
      userToken = sessionStorage.getItem('token');
    }
    if (userToken) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
