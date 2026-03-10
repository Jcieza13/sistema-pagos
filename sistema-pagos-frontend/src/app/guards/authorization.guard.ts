import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const router = inject(Router);

  const storedRoles: string[] = JSON.parse(localStorage.getItem('roles') || '[]');

  const requiredRoles: string[] =
    (route.data['roles'] as string[]) ||
    (route.parent?.data['roles'] as string[]) ||
    [];

  const hasRole = storedRoles.some((role: string) => requiredRoles.includes(role));

  if (hasRole) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};