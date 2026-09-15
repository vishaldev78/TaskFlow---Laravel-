import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({
  status,
}: {
  status?: string;
}) {
  return (
    <>
      <Head title="Forgot Password - TaskFlow" />

      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Forgot your password?
            </h1>

            <p className="mt-2 text-gray-500">
              No worries. Enter your email and we'll send you a
              password reset link.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            {status && (
              <div className="mb-5 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}

            <Form
              {...email.form()}
              disableWhileProcessing
              className="space-y-5"
            >
              {({ processing, errors }) => (
                <>
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      Email address
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      required
                      placeholder="you@example.com"
                      className="h-11"
                    />

                    <InputError
                      message={errors.email}
                    />
                  </div>

                  {/* Button */}
                  <Button
                    type="submit"
                    className="h-11 w-full bg-blue-600 font-semibold hover:bg-blue-700"
                    disabled={processing}
                    data-test="email-password-reset-link-button"
                  >
                    {processing && (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    )}

                    {processing
                      ? 'Sending link...'
                      : 'Send password reset link'}
                  </Button>
                </>
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