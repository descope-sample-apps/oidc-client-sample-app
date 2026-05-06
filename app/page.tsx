"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client_id } from "./utils";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#02dfed]/20 to-[#5cf34f]/20 blur-3xl"
        animate={{
          x: ["-20%", "5%", "-10%"],
          y: ["5%", "-20%", "10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "60%" }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-[#00A6B4]/15 blur-3xl"
        animate={{
          x: ["10%", "-15%", "5%"],
          y: ["-10%", "15%", "-5%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ top: "50%", left: "25%" }}
      />

      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-[#5cf34f]/20 blur-2xl"
        animate={{
          x: ["-5%", "10%", "-15%"],
          y: ["10%", "-10%", "5%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ top: "70%", left: "70%" }}
      />
    </div>
  );
};

function generateCodeVerifier() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const charactersLength = characters.length;

  for (let i = 0; i < 128; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

async function generateCodeChallenge(verifier: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration guard
    setMounted(true);
  }, []);

  const getAuthUrl = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    let baseURL = "api.descope.com";
    if (
      process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.length >= 32
    ) {
      const localURL = process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID.substring(
        1,
        5,
      );
      baseURL = [baseURL.slice(0, 4), localURL, ".", baseURL.slice(4)].join("");
    }

    const redirect_uri = window.location.origin + "/api/auth/callback";
    return `https://${baseURL}/oauth2/v1/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid profile&code_challenge=${codeChallenge}&code_challenge_method=S256&state=${codeVerifier}`;
  };

  const onSignIn = async () => {
    setLoading(true);
    const authUrl = await getAuthUrl();
    window.location.href = authUrl;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-black via-black to-blue-950/20 opacity-70" />

      <FloatingShapes />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5cf34f] via-[#02dfed] to-[#00a4c5]">
            Authenticate with Descope
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Welcome to the OIDC Sample App
        </p>

        <div className="flex flex-col gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSignIn}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-[#00A6B4] via-[#3DEFE9] to-[#5cf34f] px-8 py-3 text-base font-medium text-black shadow-lg border border-[#00A6B4] backdrop-blur-sm w-48 cursor-pointer disabled:opacity-60"
          >
            {loading ? "Redirecting…" : "Login via OIDC"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              window.open(
                "https://github.com/descope-sample-apps/oidc-client-sample-app",
                "_blank",
              )
            }
            className="rounded-xl bg-black border border-[#5cf34f]/50 px-8 py-3 text-base font-medium text-white shadow-lg backdrop-blur-sm w-48 cursor-pointer"
          >
            View on GitHub
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-[#5cf34f]/50 inline-block"
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
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-[#5cf34f] shadow-[0_0_8px_#5cf34f]"
            />
            <p className="text-sm text-gray-400">
              OIDC Sample App Powered by{" "}
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
  );
}
