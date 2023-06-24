import { TestBed } from '@angular/core/testing';

import { LoginInterceptorInterceptor } from './login-interceptor.interceptor';

describe('LoginInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoginInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoginInterceptorInterceptor = TestBed.inject(LoginInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
