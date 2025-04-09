import React from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { LogIn, LogOut } from 'lucide-react';

const AuthButton: React.FC = () => {
  const [user, setUser] = React.useState<typeof auth.currentUser>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        setUser(user);
        console.log('Zalogowano użytkownika:', user, 'Token:', token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Błąd przy logowaniu:', {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log('Wylogowano użytkownika');
      })
      .catch((error) => {
        console.error('Błąd przy wylogowaniu:', error);
      });
  };

  return (
    <button
      onClick={user ? handleSignOut : handleSignIn}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-white golden-button shadow-lg"
    >
      {user ? (
        <>
          <LogOut size={18} />
          Sign Out
        </>
      ) : (
        <>
          <LogIn size={18} />
          Sign In with Google
        </>
      )}
    </button>
  );
};

export default AuthButton;
