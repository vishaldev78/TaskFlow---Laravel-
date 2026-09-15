import { Form, Head } from '@inertiajs/react';
import { KeyRound, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { update } from '@/routes/password';

type Props = {
  token: string;
  email: string;
  passwordRules: string;
};

export default function ResetPassword({
  token,
  email,
  passwordRules,
}: Props) {
  return (
    <>
      <Head title="Reset Password - TaskFlow" />

      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <KeyRound className="h-7 w-7" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Reset your password
            </h1>

            <p className="mt-2 text-gray-500">
              Create a new password for your TaskFlow account.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <Form
              {...update.form()}
              transform={(data) => ({
                ...data,
                token,
                email,
              })}
              resetOnSuccess={[
                'password',
                'password_confirmation',
              ]}
              disableWhileProcessing
            >
              {({ processing, errors }) => (
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
                      value={email}
                      readOnly
                      className="h-11 bg-gray-50"
                    />

                    <InputError
                      message={errors.email}
                    />
                  </div>

                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">
                      New password
                    </Label>

                    <PasswordInput
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      autoFocus
                      required
                      placeholder="Enter new password"
                      passwordrules={passwordRules}
                    />

                    <InputError
                      message={errors.password}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                      Confirm new password
                    </Label>

                    <PasswordInput
                      id="password_confirmation"
                      name="password_confirmation"
                      autoComplete="new-password"
                      required
                      placeholder="Confirm new password"
                      passwordrules={passwordRules}
                    />

                    <InputError
                      message={
                        errors.password_confirmation
                      }
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    type="submit"
                    className="mt-2 h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
                    disabled={processing}
                    data-test="reset-password-button"
                  >
                    {processing && <Spinner />}

                    {processing
                      ? 'Resetting password...'
                      : 'Reset password'}
                  </Button>
                </div>
              )}
            </Form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <TextLink
                href={login()}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </TextLink>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}