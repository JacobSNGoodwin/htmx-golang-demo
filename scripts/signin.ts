import clerk from './authClient';

export default function mountSignInToDivId(id: string) {
  console.log(document);

  const div = document.querySelector<HTMLDivElement>(id);

  if (div) {
    clerk.mountSignIn(div);
  }
}
