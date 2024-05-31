export const corsHandle = async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.append('Access-Control-Allow-Origin', `*`);
  return response;
};
