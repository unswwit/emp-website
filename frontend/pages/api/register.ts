// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// reCaptcha v3 in NextJS: https://www.kpadenou.net/blogs/post/recaptcha_v3_with_nextjs
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
  email: string;
  zid: string;
  password: string;
};

export default async function register(req: NextApiRequest, res: NextApiResponse<Data>) {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;
  const { recaptchaResponse } = req.body;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaJson = await recaptchaRes.json();
    res.status(200).json({ ...recaptchaJson });
    // res.status(200).json({ name, email, zid, password, ...recaptchaJson });
  } catch (_e) {
    // res.status(400).json(e);
    res.status(400);
  }
}
