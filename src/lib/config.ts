/*
 * Configuration file
 * This file contains all the non-secret configuration variables for the application.
 */

export class CONFIG {
  // ! DO NOT TOUCH UNLESS ABSOLUTELY ESSENTIAL. This variable must only be updated if you require the user to force update their tasks.
  public static readonly LATEST_TASK_VERSION = 1.5;

  public static readonly SIGN_IN_URL = '/api/auth/signin';

  public static readonly SIGN_OUT_URL = '/api/auth/signout';
}
