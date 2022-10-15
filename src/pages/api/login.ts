import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { postLocalRequest } from '@/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = await req.body;

  try {
    const response = await postLocalRequest({
      endpoint: '/auth/login',
      data: { email, password },
    });

    const { jwt, user } = response.data as Session;

    req.session.user = {
      jwt,
      user,
      isLoggedIn: jwt ? true : false,
    };
    await req.session.save();
    return res.json({ data: response.data });
  } catch (error: any) {
    res.status(500).json(error.response?.data);
  }
}
