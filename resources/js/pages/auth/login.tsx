import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { register } from '@/routes';
import { request } from '@/routes/password';

type Props = {
  status?: string;
  canResetPassword: boolean;
};

export default function Login({
  status,
  canResetPassword,
}: Props) {
  return (
    <>
      <Head title="Login - TaskFlow" />

      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-gray-500">
              Login to continue to TaskFlow
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <Form
              action="/login"
              method="post"
              resetOnSuccess={['password']}
              disableWhileProcessing
              className="flex flex-col gap-6"
            >
              {({ processing, errors }) => (
                <>
                  <div className="grid gap-5">

                    {/* Email */}
                    <div className="grid gap-2">
                      <Label htmlFor="email">
                        Email address
                      </Label>

                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="h-11"
                      />

                      <InputError
                        message={errors.email}
                      />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">
                          Password
                        </Label>

                        {canResetPassword && (
                          <TextLink
                            href={request()}
                            className="text-sm text-blue-600"
                            tabIndex={5}
                          >
                            Forgot password?
                          </TextLink>
                        )}
                      </div>

                      <PasswordInput
                        id="password"
                        name="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                      />

                      <InputError
                        message={errors.password}
                      />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="remember"
                        name="remember"
                        tabIndex={3}
                      />

                      <Label
                        htmlFor="remember"
                        className="text-sm text-gray-600"
                      >
                        Remember me
                      </Label>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
                      tabIndex={4}
                      disabled={processing}
                    >
                      {processing && <Spinner />}

                      {processing
                        ? 'Logging in...'
                        : 'Log in'}
                    </Button>
                  </div>

                  {/* Register */}
                  <div className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}

                    <TextLink
                      href={register()}
                      tabIndex={5}
                      className="font-semibold text-blue-600"
                    >
                      Create an account
                    </TextLink>
                  </div>
                </>
              )}
            </Form>

            {status && (
              <div className="mt-5 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}