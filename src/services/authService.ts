/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendEmailVerification,
  type User
} from 'firebase/auth';
import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Interface pour les données utilisateur
export interface UserData {
  username?: string;
  email: string;
  firebaseUid: string;
  emailVerified: boolean;
}

/**
 * Inscription avec email et mot de passe
 * 1. Crée l'utilisateur dans Firebase
 * 2. Envoie l'email de vérification
 * 3. Synchronise avec le backend MongoDB
 */
export const registerWithEmail = async (
  email: string,
  password: string,
  username: string
): Promise<{ user: User; message: string }> => {
  try {
    // 1. Créer l'utilisateur dans Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // 2. Envoyer l'email de vérification
    await sendEmailVerification(userCredential.user);

    // 3. Synchroniser avec le backend
    const idToken = await userCredential.user.getIdToken();
    await syncUserWithBackend(idToken, { username });

    return {
      user: userCredential.user,
      message: 'Compte créé ! Vérifiez votre email pour activer votre compte.'
    };
  } catch (error: any) {
    // Gérer les erreurs Firebase
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Cet email est déjà utilisé');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Email invalide');
    }
    throw new Error(error.message || 'Erreur lors de l\'inscription');
  }
};

/**
 * Connexion avec email et mot de passe
 * Vérifie que l'email est vérifié avant de permettre la connexion
 */
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<{ user: User; message: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Vérifier si l'email est vérifié
    if (!userCredential.user.emailVerified) {
      // Déconnecter l'utilisateur
      await signOut(auth);
      throw new Error(
        'Veuillez vérifier votre email avant de vous connecter. Vérifiez votre boîte de réception.'
      );
    }

    // Synchroniser avec le backend pour s'assurer que l'utilisateur existe dans MongoDB
    const idToken = await userCredential.user.getIdToken();
    await syncUserWithBackend(idToken, {});

    return {
      user: userCredential.user,
      message: 'Connexion réussie !'
    };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('Aucun compte associé à cet email');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Mot de passe incorrect');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Email invalide');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Trop de tentatives. Réessayez plus tard.');
    }
    throw error;
  }
};

/**
 * Connexion avec Google
 */
export const loginWithGoogle = async (): Promise<{ user: User; message: string }> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Les comptes Google sont automatiquement vérifiés
    const idToken = await userCredential.user.getIdToken();

    // Extraire le username du displayName ou de l'email
    const username = userCredential.user.displayName ||
                     userCredential.user.email?.split('@')[0] ||
                     'user';

    await syncUserWithBackend(idToken, { username });

    return {
      user: userCredential.user,
      message: 'Connexion avec Google réussie !'
    };
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Connexion annulée');
    } else if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup bloquée. Autorisez les popups pour ce site.');
    }
    throw new Error(error.message || 'Erreur lors de la connexion avec Google');
  }
};

/**
 * Déconnexion
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Erreur lors de la déconnexion');
  }
};

/**
 * Synchroniser l'utilisateur Firebase avec le backend MongoDB
 * Crée ou met à jour l'utilisateur dans la base de données
 */
const syncUserWithBackend = async (
  idToken: string,
  additionalData: { username?: string }
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/users/sync`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(additionalData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erreur lors de la synchronisation');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Erreur de synchronisation backend:', error);
    // Ne pas bloquer la connexion si le backend échoue
    // L'utilisateur sera synchronisé à la prochaine connexion
  }
};

/**
 * Obtenir le token ID de l'utilisateur connecté
 */
export const getCurrentUserToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
    return null;
  }
};

/**
 * Vérifier si l'utilisateur est connecté et son email est vérifié
 */
export const isUserAuthenticated = (): boolean => {
  const user = auth.currentUser;
  return user !== null && user.emailVerified;
};

/**
 * Renvoyer l'email de vérification
 */
export const resendVerificationEmail = async (): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Aucun utilisateur connecté');
  }

  if (user.emailVerified) {
    throw new Error('Email déjà vérifié');
  }

  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    throw new Error(error.message || 'Erreur lors de l\'envoi de l\'email');
  }
};
