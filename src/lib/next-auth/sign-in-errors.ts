/**
 * These errors occur when the user tries to sign in unsuccessfully.
 * The keys used in the dictionary are the error codes returned by the NextAuth client as query paramters.
 * @see https://next-auth.js.org/errors#signin-errors
 */

interface SignInErrors {
  [key: string]: string;
}

export const SIGN_IN_ERRORS: SignInErrors = {
  OAuthAccountNotLinked:
    'This email is already linked to another account. Please sign in with the other account.',
  OAuthCreateAccount: 'Unable to create your account. Please try again.',
  OAuthSignin: 'Unable to sign you in using OAuth. Please try again.',
  OAuthCallback: 'Unable to sign you in using OAuth. Please try again.',
};
