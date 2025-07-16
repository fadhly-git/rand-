import { LenisProvider } from "@/components/lenis-provider";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import LoveMessageBook from "./components/LoveMessageBook";
import { FloatingElements } from "./components/floating-galery-section";
import { CountdownRolodex } from "./components/count-down";

export default function BirthdayWebsite() {
  const { width, height } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [countdownFinished, setCountdownFinished] = useState(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCountdownFinish = () => {
    setCountdownFinished(true);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-amber-200"
      >
        <motion.div
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </motion.div>
    );
  }

  if (!countdownFinished) {
    return (
      <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-amber-200 min-h-screen flex items-center justify-center">
        <CountdownRolodex
          targetDate={new Date("")}
          onFinish={handleCountdownFinish}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-amber-200 min-h-screen relative font-sans overflow-x-hidden">
      <LenisProvider options={{ lerp: 0.05 }}>
        <HeroSection />
        <FloatingElements count={26} />
        <div className="h-[200px] md:h-[300px]" />
        <LoveMessageBook />
        <MusicPlayer />
        <CountdownRolodex targetDate={new Date(Date.now())} />
      </LenisProvider>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300} // Large number for explosion effect
        gravity={0.8} // Faster falling confetti
        recycle={true} // Confetti only appears once
        opacity={1} // Fully visible
        colors={[
          "#f9e0ae",
          "#fccbcb",
          "#e0b07a",
          "#c3bef7",
          "#f7b2ad",
          "#ff6f61",
          "#ffcc00",
        ]}
      />
      <GoldenDustParticles />
    </div>
  );
}

// ===== HERO SECTION =====
const HeroSection = () => (
  <section className="relative flex flex-col items-center justify-center h-[80vh] min-h-[400px] z-10 select-none">
    <motion.h1
      initial={{ opacity: 0, y: 50, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="text-center text-5xl xl:text-7xl font-serif font-extrabold bg-gradient-to-r from-pink-800 via-amber-700 to-yellow-500 text-transparent bg-clip-text drop-shadow-xl"
      style={{
        textShadow:
          "2px 2px 0 #fff8, 0 4px 16px #ffd6b0, 0 1px 0 #ccb187",
      }}
    >
      Happy Birthday, My Love!
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="mt-8 text-xl xl:text-2xl text-amber-900 font-medium drop-shadow text-center max-w-2xl px-4"
    >
      Semoga setiap detik hidupmu dipenuhi kebahagiaan yang tak terhingga. 🤎
    </motion.p>
  </section>
);





// ===== AUDIO =====
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const audioSrc =
    "Die-With-A-Smile.mp3";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-amber-50/70 backdrop-blur-xl rounded-full shadow-2xl px-6 py-3 border border-yellow-800/20 hover:shadow-2xl transition-all">
      <button
        className="focus:outline-none flex items-center gap-2 text-yellow-900 hover:text-amber-700 font-semibold text-lg"
        onClick={handlePlayPause}
        aria-label={isPlaying ? "Pause Song" : "Play Song"}
      >
        <Music className="w-6 h-6" />
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        autoPlay
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

// ===== GOLDEN DUST PARTICLES (extra ambience) =====
const GoldenDustParticles = () => (
  <div className="pointer-events-none fixed inset-0 z-40">
    {[...Array(30)].map((_, i) => (
      <span
        key={i}
        className="absolute block w-2 h-2 rounded-full bg-yellow-200/70 animate-ping"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}
  </div>
);

