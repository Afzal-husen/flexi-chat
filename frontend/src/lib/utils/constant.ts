const baseUrl = process.env.SERVER_URL!;

const serverUrls = {
  signIn: `${baseUrl}/signin`,
};

const clientRoutes = {
  signIn: "/login",
};

export { serverUrls, clientRoutes };
