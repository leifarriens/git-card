/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { Handlers, PageProps } from '$fresh/server.ts';

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
  location: string;
  blog: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const res = await fetch(`https://api.github.com/users/${name}`);
    if (res.status === 404) {
      return ctx.render(null);
    }

    const user: User = await res.json();
    return ctx.render(user);
  },
};

export default function Greet({ data }: PageProps<User | null>) {
  if (data) {
    return (
      <div
        class={tw`relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 dark:bg-slate-800  py-6 sm:py-12`}
      >
        <div
          class={tw`relative bg-white px-6 pt-10 pb-8 shadow-l  sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10`}
        >
          <h1>{data.login}</h1>
          <h2>{data.name}</h2>
          <div>
            <img class={tw`my-6 rounded-full`} src={data.avatar_url} />
            <div>{data.bio}</div>
            <div>{data.html_url}</div>
            <div>{data.location}</div>
            <a href={`https://${data.blog}`} target="_blank">
              {data.blog}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
