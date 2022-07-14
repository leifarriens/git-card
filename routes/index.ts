import { Handlers, HandlerContext } from '$fresh/server.ts';

export const handler: Handlers = {
  GET(req: Request, ctx: HandlerContext) {
    const url = new URL(req.url);
    url.pathname = '/leifarriens';
    return Response.redirect(url, 307);
  },
};
