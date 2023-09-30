import Clerk from '@clerk/clerk-js';

const clerkPubApiKey = 'pk_test_Y29vbC15YWstNTIuY2xlcmsuYWNjb3VudHMuZGV2JA';

const clerk = new Clerk(clerkPubApiKey);
await clerk.load({
  signInUrl: '/login',
  signUpUrl: '/signup',
  afterSignInUrl: '/admin',
  afterSignUpUrl: '/admin',
});

clerk.addListener((authChanges) => {
  console.debug('Auth changed', authChanges);
});

export default clerk;
