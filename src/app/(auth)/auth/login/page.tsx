"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "@/utils/Axios";
import { User } from "@/lib/definitions";
import {motion} from "motion/react";
import AnimatedBg from "@/components/ui/backgroud/AnimatedBg";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // No need for apiUrl, Axios already has baseURL
      const data: User = await Axios.post("/login", { email, password });

      const targetRoute = data?.role === "admin" ? "/admin/" : "/";
      router.replace(targetRoute);
    } catch (err: unknown) {
      const message = err instanceof Error
        ? err.message
        : 'Failed to create user';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  return (
    <AnimatedBg>
      <div className="flex min-h-screen text-white items-center justify-center ">
          
        <form
          onSubmit={handleSubmit}
          className="bg-black/30 relative border border-white/50  rounded-2xl max-w-smbg-(--color-foreground)/80 backdrop-blur-md p-8 z-10  shadow-md w-full max-w-sm"
           onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - rect.left -20, y: e.clientY - rect.top -20});
        }}
        onMouseEnter={() => setIsInside(true)}
        onMouseLeave={() => setIsInside(false)}
        >
          {isInside && (
         <motion.div
          className="absolute w-3 h-3 bg-cyan-400 rounded-full pointer-events-none 
          blur-[40px] shadow-[0_0_160px_40px_rgb(34,211,238)] z-50"
          animate={{ x: pos.x - 8, y: pos.y - 8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />

        )}
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          {error && (
            <div className="mb-4  text-red-600 text-sm text-center">{error}</div>
          )}
          <div className="mb-4 py-2 relative">
            <input
              type="email"
              id="email"
              className="peer w-full border px-3 py-3 rounded outline-none focus:border-cyan-400 focus:border-2 transition-all duration-200"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              autoComplete="username"
            />
            <label
              htmlFor="email"
              className="absolute left-3 text-gray-400 text-sm transition-all duration-200
     peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:backdrop-blur-3xl peer-focus:bg-cyan-400/60 rounded-full p-1.5
     peer-focus:top-0 peer-focus:-translate-y-1/4 peer-focus:text-sm peer-focus:text-white peer-focus:text-shadow-md peer-focus:text-shadow-black"
            >
              Email
            </label>
          </div>

          <div className="mb-6 py-2 relative">
            <div className="relative mb-4">
              <input
                type="password"
                id="password"
                className="peer w-full border px-3  py-4 rounded outline-none 
    focus:border-cyan-400 focus:border-2 transition-all duration-200"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 text-gray-400 text-sm transition-all duration-200
     peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:backdrop-blur-3xl peer-focus:bg-cyan-400/60 rounded-full p-1.5
     peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-white peer-focus:text-shadow-md peer-focus:text-shadow-black" 
              >
                Password
              </label>
            </div>
          </div>

            <button
              type="submit"
              className="w-full bg-primary border border-blue-800 text-white py-2 rounded font-semibold 
  transition ease-in duration-300 hover:cursor-pointer relative
  hover:shadow-[0_0_14px_5px_rgb(103,232,249)]"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>


        </form>
      </div>
    </AnimatedBg>
  );
}