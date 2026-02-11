import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <main className='flex justify-center items-center min-h-screen bg-black'>
      <div className='w-full max-w-md p-6'>
        <LoginForm />
      </div>
    </main>
  );
}
