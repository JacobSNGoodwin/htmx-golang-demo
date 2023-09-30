import clerk from './authClient';

export default function mountSignUpToDivId(id: string) {
  const div = document.querySelector<HTMLDivElement>(id);

  if (div) {
    clerk.mountSignUp(div);
  }

  console.error(`Unable to find <div /> with id [${id}]`);
}
