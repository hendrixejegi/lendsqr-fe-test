import '@/scss/AuthLayout.scss';

import { useState } from 'react';

import logo from '@/assets/lendsqr-logo.svg';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const AuthLayout = () => {
  const [type, setType] = useState('password');

  const handleTypeChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (type === 'password') {
      setType('text');
      return;
    }
    setType('password');
  };

  return (
    <div className="auth-container">
      <div>
        <img
          src={logo}
          width={173.76473999023438}
          height={36}
          alt="Lendsqr logo"
        />
      </div>
      <main>
        <form action="" id="login-form" className="login-form">
          <h1>Welcome</h1>
          <p>Enter details to login.</p>

          <div className="login-form--inputs">
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              aria-label="Email"
            />

            <div className="password-input">
              <Input
                type={type}
                name="password"
                id="password"
                placeholder="Password"
                aria-label="Password"
              />
              <Button variant="ghost" onClick={handleTypeChange}>
                {type === 'password' ? 'show' : 'hide'}
              </Button>
            </div>

            <p>Forgot Password?</p>
          </div>

          <div className="login-form--submit">
            <Button variant="primary">LOG IN</Button>
          </div>
        </form>
      </main>
    </div>
  );
};
