import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
  passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
  return (
    <>
      <Head title="Register - TaskFlow" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-gray-500">
              Start organizing your tasks with TaskFlow
            </p>
          </div>

          {/* Register Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <Form
              {...store.form()}
              resetOnSuccess={[
                'password',
                'password_confirmation',
              ]}
              disableWhileProcessing
              className="flex flex-col gap-6"
            >
              {({ processing, errors }) => (
                <>
                  <div className="grid gap-5">

                    {/* Name */}
                    <div className="grid gap-2">
                      <Label htmlFor="name">
                        Full name
                      </Label>

                      <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        name="name"
                        placeholder="John Doe"
                        className="h-11"
                      />

                      <InputError
                        message={errors.name}
                      />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                      <Label htmlFor="email">
                        Email address
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        required
                        tabIndex={2}
                        autoComplete="email"
                        name="email"
                        placeholder="you@example.com"
                        className="h-11"
                      />

                      <InputError
                        message={errors.email}
                      />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                      <Label htmlFor="password">
                        Password
                      </Label>

                      <PasswordInput
                        id="password"
                        required
                        tabIndex={3}
                        autoComplete="new-password"
                        name="password"
                        placeholder="Create a password"
                        passwordrules={passwordRules}
                      />

                      <InputError
                        message={errors.password}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-2">
                      <Label htmlFor="password_confirmation">
                        Confirm password
                      </Label>

                      <PasswordInput
                        id="password_confirmation"
                        required
                        tabIndex={4}
                        autoComplete="new-password"
                        name="password_confirmation"
                        placeholder="Confirm your password"
                        passwordrules={passwordRules}
                      />

                      <InputError
                        message={
                          errors.password_confirmation
                        }
                      />
                    </div>

                    {/* Register Button */}
                    <Button
                      type="submit"
                      className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
                      tabIndex={5}
                      data-test="register-user-button"
                    >
                      {processing && <Spinner />}

                      {processing
                        ? 'Creating account...'
                        : 'Create account'}
                    </Button>
                  </div>

                  {/* Login */}
                  <div className="text-center text-sm text-gray-500">
                    Already have an account?{' '}

                    <TextLink
                      href={login()}
                      tabIndex={6}
                      className="font-semibold text-blue-600"
                    >
                      Log in
                    </TextLink>
                  </div>
                </>
              )}
            </Form>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

Register.layout = {
  title: 'Create an account',
  description: 'Enter your details below to create your account',
};