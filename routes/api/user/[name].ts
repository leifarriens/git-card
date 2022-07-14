import { HandlerContext, Handlers } from '$fresh/server.ts';

import { User } from '../../../types/index.ts';

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { name } = ctx.params;
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 404) {
      return new Response('User not found', { status: 404 });
    }

    const user: User = await res.json();

    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
