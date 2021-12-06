import { User } from "firebase/auth";
import {
  FirebaseError,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase-config";

type UserAttr = {
  id: string;
  email: string;
  password: string;
};

const login = async ({
  email,
  password,
}: Omit<UserAttr, "id">): Promise<User | FirebaseError> => {
  const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error: FirebaseError) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}::${errorMessage}`);

      return error;
      // ...
    });

  return response;
};

const createUser = async ({
  email,
  password,
}: Omit<UserAttr, "id">): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export { createUser, login };
export type { UserAttr };
