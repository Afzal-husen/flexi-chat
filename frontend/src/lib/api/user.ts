import { serverRoutes } from "../utils/constant";

export const userSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(serverRoutes.signIn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok) return null;

  return data;
};
