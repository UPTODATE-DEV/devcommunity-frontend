import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<Session>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      jwt: '',
      user: undefined,
    });
  }
}
