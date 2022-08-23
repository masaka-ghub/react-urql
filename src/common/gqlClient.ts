import { createClient } from "urql";

export type clientSetting = {
  token?: string;
  url: string;
};

export const client = createClient({
  url: "https://localhost:8080/graphql",
});

export function gqlClient(options: clientSetting) {
  return createClient({
    url: options.url,
    fetchOptions: () => {
      return options.token
        ? {
            headers: { authorization: `Bearer ${options.token}` },
          }
        : {};
    },
  });
}
