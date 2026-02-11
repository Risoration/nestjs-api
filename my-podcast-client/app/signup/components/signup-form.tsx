import { signup } from '@/app/actions/auth';
import { useActionState } from 'react';

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='name' id='name' placeholder='Name' />
      </div>
      {state?.errors.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' placeholder='Email' />
      </div>
      {state?.errors.email && <p>{state.errors.email}</p>}

      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' />
      </div>
      {state?.errors.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>-{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button disabled={pending} type='submit'>
        Sign Up
      </button>
    </form>
  );
}
