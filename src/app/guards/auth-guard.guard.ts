import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2'

export const authGuardGuard: CanActivateFn = (route, state) => {
  // inject is a keyword and it is used to call the method inside the guard
  const authStatus = inject(AuthService)
  const router = inject(Router)
  if (authStatus.isUserLogged()) {
    return true;
  }
  else {
    // alert('please login');
    Swal.fire({
      title: 'Oops!',
      text: 'Please Login',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    router.navigateByUrl('')
    return false;
  }
  return true;
};
