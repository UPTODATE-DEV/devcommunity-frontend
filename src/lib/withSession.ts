import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/lib/session';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
