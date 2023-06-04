import { auth } from "../firebase";

export default async function isUserPremium(): Promise<boolean> {
  const user = auth?.currentUser;
  if (!user) return false;
  const idTokenResult = await user.getIdTokenResult();

  return !!idTokenResult.claims.stripeRole ? true : false;
}
