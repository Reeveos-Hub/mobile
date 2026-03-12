import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { AuthProvider } from './lib/AuthContext';
import { SplashScreen } from './components/SplashScreen';
import { router } from './routes';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
