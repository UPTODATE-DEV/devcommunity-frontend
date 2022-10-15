import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { postLocalRequest } from "@/lib/api";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(registerRoute, sessionOptions);

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstName, lastName } = await req.body;

  try {
    const response = await postLocalRequest({
      endpoint: "/users/register",
      data: { email, password, firstName, lastName },
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
