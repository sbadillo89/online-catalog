import { User } from "firebase/auth";
import {
  FirebaseError,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "../firebase-config";
import { createContext, useContext, useEffect, useState } from "react";

type LoginAttr = {
  user: User | null;
  hasError: boolean;
  error: FirebaseError | null;
};

type AuthContextState = {
  user: User | null;
  setUser: (data: User | null) => void;
  isAuthenticating: boolean;
  login: (email: string, password: string) => Promise<LoginAttr>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
};
const AuthContext = createContext<AuthContextState | null>(null);
/*
 * Hook for child components to get the auth object ...
 * ... and re-render when it changes.
 */
const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};

type AuthProviderProps = {
  children?: React.ReactNode;
};

// Provider hook that creates auth object and handles state
const AuthProvider = ({ children }: AuthProviderProps): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  /*
   * Wrap any Firebase methods we want to use making sure ...
   * ... to save the user to state.
   */
  const login = async (email: string, password: string): Promise<LoginAttr> => {
    try {
      return await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          setUser(response.user);

          return { user: response.user, hasError: false, error: null };
        }
      );
    } catch (error) {
      return { user: null, hasError: true, error: error as FirebaseError };
    }
  };

  const signup = async (email: string, password: string): Promise<User> => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);

        return response.user;
      }
    );
  };

  const logout = async (): Promise<void> => {
    return await signOut(auth).then(() => {
      setUser(null);
    });
  };

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    return await sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  /*
   * const confirmPasswordReset = (code, password) => {
   *   return firebase
   *     .auth()
   *     .confirmPasswordReset(code, password)
   *     .then(() => {
   *       return true;
   *     });
   * };
   */

  /*
   * Subscribe to user on mount
   * Because this sets state in the callback it will cause any ...
   * ... component that utilizes this hook to re-render with the ...
   * ... latest auth object.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // The user object and auth methods
  const values = {
    user,
    isAuthenticating,
    login,
    signup,
    logout,
    sendPasswordResetEmail,
    setUser,
  };

  /*
   * Provider component that wraps your app and makes auth object
   * ... available to any child component that calls useAuth().
   */
  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
export type { AuthContextState, LoginAttr };
