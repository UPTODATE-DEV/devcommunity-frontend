import { getRequest } from "@/lib/api";
import { sessionOptions } from "@/lib/session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(confirmationRoute, sessionOptions);

async function confirmationRoute(req: NextApiRequest, res: NextApiResponse) {
  const { code } = await req.body;

  try {
    const response = await getRequest({
      endpoint: `/auth/confirmation/${code}`,
    });
    if (response.error) {
      return res.status(400).json(response.error);
    }
    return res.json({ data: response.data });
  } catch (error: any) {
    res.status(500).json(error.response?.data);
  }
}
