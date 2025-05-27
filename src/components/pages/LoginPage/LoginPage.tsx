import * as React from 'react';
import { LoginForm, LoginFormData } from './LoginForm.tsx';

export const LoginPage: React.FC = () => {
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div>
      <LoginForm onSubmit={onSubmit} />;
    </div>
  );
};
