import '@/scss/AuthLayout.scss';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import logo from '@/assets/lendsqr-logo.svg';

import { useAuth } from './AuthProvider';

type Inputs = {
  email: string;
  password: string;
};

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Please enter your password'),
});

export const AuthLayout = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;

    if (email === 'testadmin@mail.com' && password === '12345678') {
      signIn();
      toast.success('Log in success', { style: { color: 'green' } });
      reset();
      navigate('/dashboard');
    } else {
      toast.error('Incorrect email or password', { style: { color: 'red' } });
    }
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="login-form"
          className="login-form"
          noValidate
        >
          <h1>Welcome</h1>
          <p>Enter details to login.</p>

          <div className="login-form--inputs">
            <div>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                className="input"
              />

              {errors.email && (
                <p className="invalid-message" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="password-input">
                <input
                  {...register('password')}
                  type={type}
                  id="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className="input"
                />
                <button
                  className="button button--ghost"
                  onClick={handleTypeChange}
                >
                  {type === 'password' ? 'show' : 'hide'}
                </button>
              </div>

              {errors.password && (
                <p className="invalid-message" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <a href="#">Forgot Password?</a>
          </div>

          <div className="login-form--submit">
            <button className="button button--primary">LOG IN</button>
          </div>
        </form>
      </main>
    </div>
  );
};
