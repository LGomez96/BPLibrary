import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../auth/services/login.service';

import { CanloadGuard } from './canload.guard';

describe('CanloadGuard', () => {
  let guard: CanloadGuard;
  let router: Router;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(CanloadGuard);
    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
