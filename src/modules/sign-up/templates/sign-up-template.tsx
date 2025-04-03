import SignUpForm from '../components/sign-up-form';

export default function SignUpTemplate() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-10">
      <div className="w-1/2">
        <SignUpForm></SignUpForm>
      </div>
    </div>
  );
}
