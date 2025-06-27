import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoginRoute = state.url.includes('/login') || state.url.includes('/register');

    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          // ログイン済みの場合
          if (isLoginRoute) {
            // ログインページへのアクセスは許可しない
            return this.router.createUrlTree(['/tasks']); // タスク一覧ページへリダイレクト
          }
          return true; // その他のページへのアクセスは許可
        } else {
          // 未ログインの場合
          if (isLoginRoute) {
            // ログインページへのアクセスは許可
            return true;
          }
          // タスク関連ページへのアクセスは許可しない
          return this.router.createUrlTree(['/login']); // ログインページへリダイレクト
        }
      })
    );
  }
}