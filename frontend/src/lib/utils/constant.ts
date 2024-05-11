const baseUrl = process.env.SERVER_URL!;

const serverRoutes = {
  signIn: `${baseUrl}/signin`,
};

const clientRoutes = {
  signIn: "/login",
};

export { serverRoutes, clientRoutes };
