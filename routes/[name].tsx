/** @jsx h */
import { Fragment, h } from 'preact';
import { tw } from '@twind';
import { Handlers, PageProps } from '$fresh/server.ts';

import { User } from '../types/index.ts';
import { getUser } from '../services/getUser.ts';

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const res = await getUser(name);
    if (res.status === 404) {
      return ctx.render(null);
    }

    const user: User = await res.json();
    return ctx.render(user);
  },
};

export default function Greet({ data }: PageProps<User | null>) {
  return (
    <div
      class={tw`relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-slate-800  py-6 sm:py-12`}
    >
      <div
        class={tw`relative bg-white px-6 pt-10 pb-8 shadow-l sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10`}
      >
        {data ? (
          <Fragment>
            <head>
              <title>Git Card | {data.login}</title>
            </head>

            <h1>{data.login}</h1>
            <h2>{data.name}</h2>
            <div>
              <img
                class={tw`my-6 rounded-full`}
                width={432}
                height={432}
                src={data.avatar_url}
              />
              <div>{data.bio}</div>
              <a href={data.html_url} target="_blank">
                Github Profile
              </a>
              <div>{data.location}</div>
              <a href={`https://${data.blog}`} target="_blank">
                {data.blog}
              </a>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <head>
              <title>Git Card | User not found</title>
            </head>
            <div>User not found</div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
