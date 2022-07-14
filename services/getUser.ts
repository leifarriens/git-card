export function getUser(name: string) {
  return fetch(`https://api.github.com/users/${name}`);
}
