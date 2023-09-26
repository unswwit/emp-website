const port = process.env.port || 4000;

export async function doRegister(event: React.FormEvent<HTMLFormElement>) {
  // event.preventDefault(); // FOR DEBUGGING
  const e = event.currentTarget;

  await fetch(`http://localhost:${port}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.email.value,
      zid: e.zid.value,
      firstName: e.fname.value,
      lastName: e.lname.value,
      password: e.password.value,
    }),
  }).then((res) => res.json());
}
