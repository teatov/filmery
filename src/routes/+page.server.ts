import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const allUsers = db.select().from(users).all();
  console.log(allUsers);
  return { allUsers };
};
