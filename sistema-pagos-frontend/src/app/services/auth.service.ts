import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  authState$ = this.authState.asObservable(); // 👈 propiedad observable

  public users: any = {
    admin: { password: '1234', roles: ['ADMIN'] },
    user1: { password: '1234', roles: ['USER'], codigo: 'ABC123' },
    user2: { password: '2235', roles: ['USER'], codigo: 'est01'}
  
  };

  public username: string | undefined;
  public codigoEstudiante: string | undefined;
  public roles: string[] = [];

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('username');
    const storedRoles = localStorage.getItem('roles');
    const storedCodigo = localStorage.getItem('codigoEstudiante');

    if (storedUser && storedRoles) {
      this.username = storedUser;
      this.roles = JSON.parse(storedRoles);
      this.codigoEstudiante = storedCodigo || undefined;
      this.authState.next(true); // 👈 notifica sesión activa
    }
  }

  public login(username: string, password: string): boolean {
    if (this.users[username] && this.users[username].password === password) {
      this.username = username;
      this.roles = this.users[username].roles;

      if (this.roles.includes('USER')) {
        this.codigoEstudiante = this.users[username].codigo;
      } else {
        this.codigoEstudiante = undefined;
      }

      localStorage.setItem('username', this.username);
      localStorage.setItem('roles', JSON.stringify(this.roles));
      if (this.codigoEstudiante) {
        localStorage.setItem('codigoEstudiante', this.codigoEstudiante);
      } else {
        localStorage.removeItem('codigoEstudiante');
      }

      this.authState.next(true); // 👈 notifica login
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  public logout(): void {
    this.roles = [];
    this.username = undefined;
    this.codigoEstudiante = undefined;

    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('codigoEstudiante');

    this.authState.next(false); // 👈 notifica logout
    this.router.navigateByUrl('/login');
  }

  public isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  public isUser(): boolean {
    return this.roles.includes('USER');
  }

  public getHomeRoute(): string {
  if (this.isAdmin()) {
    return '/admin';   // ruta principal para admin
  } else if (this.isUser()) {
    return '/user';    // ruta principal para user
  } else {
    return '/login';   // fallback si no hay sesión
  }
}
}