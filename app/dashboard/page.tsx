'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type UserInfo = {
  name?: string;
  email?: string;
  sub?: string;
};

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-[#5cf34f] via-[#02dfed] to-[#00a4c5] ${className}`}
    >
      {children}
    </span>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleApiTest = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setApiStatus('API Request Successful!');
        console.log('API Response:', data);
      } else {
        setApiStatus('API Request Failed');
      }
    } catch (error) {
      setApiStatus('API Request Failed');
      console.error('API Error:', error);
    }
  };

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-t-2 border-[#5cf34f] rounded-full"
        />
      </div>
    );
  }

  const displayName = user?.name || user?.email || 'User';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full py-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-8 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6"
          >
            Welcome, <GradientText>{displayName}</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            You are successfully authenticated via OIDC with Descope
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 max-w-xl mx-auto mt-4"
          >
            Check the cookies for your current domain — you should see{' '}
            <code className="text-[#5cf34f]">id_token</code>,{' '}
            <code className="text-[#5cf34f]">access_token</code>,{' '}
            <code className="text-[#5cf34f]">refresh_token</code>, and{' '}
            <code className="text-[#5cf34f]">expires_in</code>.
          </motion.p>

          <div className="flex flex-col gap-4 items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApiTest}
              className="px-6 py-3 bg-[#00A6B4] hover:bg-[#00A6B4]/80 rounded-lg text-white font-medium"
            >
              Test API Connection
            </motion.button>

            {apiStatus && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${apiStatus.includes('Failed') ? 'text-red-400' : 'text-[#5cf34f]'}`}
              >
                {apiStatus}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-6 py-3 bg-[#5cf34f] hover:bg-[#5cf34f]/80 rounded-lg text-black font-medium"
            >
              Logout
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-[#5cf34f]/50 inline-block"
          >
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{
                  opacity: [1, 0.4, 1],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full bg-[#5cf34f] shadow-[0_0_8px_#5cf34f]"
              />
              <p className="text-sm text-gray-400">
                OIDC Sample App Powered by{' '}
                <a
                  href="https://descope.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5cf34f] hover:underline transition-colors"
                >
                  Descope
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
