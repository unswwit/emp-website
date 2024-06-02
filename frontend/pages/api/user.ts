const port = process.env.port || 4000;

export async function doRegister(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); // FOR DEBUGGING
  const e = event.currentTarget;

  const res = await fetch(`http://localhost:${port}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.email.value,
      zid: e.zid.value,
      firstName: e.fname.value,
      lastName: e.lname.value,
      password: e.password.value,
    }),
  });

  if (res.ok) {
    console.log("Successful registration");
  } else {
    console.error('Registration failed');
  }
}

export async function doLogin(event: React.FormEvent<HTMLFormElement>) {
  // event.preventDefault(); // FOR DEBUGGING
  const e = event.currentTarget;
  const userId = e.userId.value;

  await fetch(`http://localhost:${port}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      password: e.password.value,
    }),
  }).then((res) => {
    res.json();
    // console.log(res.status); // FOR DEBUGGING
  });
}
