export default function verifyError(errorCode: string): string {
    switch (errorCode) {
        case 'auth/user-disabled':
            return 'The corresponding user has been disabled.';
        case 'auth/user-not-found':
            return 'The user does not correspond to any record.';
        case 'auth/weak-password':
            return 'Your password must have at least 6 characters.';
        case 'auth/email-already-in-use':
            return 'An account with this email address already exists.';
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/account-exists-with-different-credential':
            return 'Email already associated with another account.';
        case 'auth/timeout':
            return 'Exceeded the response time. The domain may not be authorized to perform operations.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/invalid-verification-code':
            return 'The verification code is not valid.';
        case 'auth/popup-blocked':
            return 'The pop-up window was blocked by the browser.';
        case 'auth/popup-closed-by-user':
            return 'The pop-up window was closed by the user without completing the login with the provider.';
        case 'auth/invalid-api-key':
            return 'The provided API key is invalid. Contact support.';
        case 'auth/network-request-failed':
            return 'Network connection failed.';
        case 'auth/too-many-requests':
            return 'Requests have been blocked due to unusual activity. Please try again after some time.';
        case 'auth/email-already-exists':
            return 'The provided email is already in use.';
        case 'auth/phone-number-already-exists':
            return 'The provided phone number is already in use.';
        case 'auth/internal-error':
            return 'The authentication server encountered an unexpected error while trying to process the request.';
        default:
            return '';
    }
}
