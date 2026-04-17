import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, ChevronDown, Play, Pause } from "lucide-react";

const SONG_URL = "/Peak.mp3";

const photos = [
  { id: 1, src: "https://iili.io/BU693Vs.jpg", rotate: -2 },
  { id: 2, src: "https://iili.io/BU69FiG.jpg", rotate: 3 },
  { id: 3, src: "https://iili.io/BU69JDX.jpg", rotate: -1 },
  { id: 4, src: "https://iili.io/BU69fff.jpg", rotate: 2 },
  { id: 5, src: "https://iili.io/BU69ql4.jpg", rotate: -3 },
];

function VinylDisc() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("ended", onEnded);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
      } catch (err) {
        console.error("Unable to play audio:", err);
      }
    } else {
      el.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      className="absolute top-6 right-6 z-20 flex items-center gap-3"
    >
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />

      <div className="hidden sm:flex flex-col items-end leading-tight select-none">
        <span className="font-serif text-sm text-foreground">Our Song</span>
        <motion.span
          key={playing ? "playing" : "paused"}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
        >
          {playing ? "Now playing" : "Tap to play"}
        </motion.span>
      </div>

      <button
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={playing ? "Pause song" : "Play song"}
        data-testid="button-play-song"
        className="relative w-14 h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Soft halo */}
        <motion.span
          aria-hidden
          className="absolute -inset-2 rounded-full bg-primary/30 blur-xl"
          animate={{
            opacity: playing ? [0.35, 0.6, 0.35] : 0.12,
            scale: playing ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Vinyl body */}
        <motion.span
          aria-hidden
          animate={{ rotate: playing ? 360 : 0 }}
          transition={
            playing
              ? { duration: 4, repeat: Infinity, ease: "linear" }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="absolute inset-0 rounded-full shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] block"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #3a3a3a 0%, #111 55%, #000 100%)",
          }}
        >
          {/* grooves */}
          <span className="absolute inset-[6%] rounded-full border border-white/[0.05]" />
          <span className="absolute inset-[14%] rounded-full border border-white/[0.05]" />
          <span className="absolute inset-[22%] rounded-full border border-white/[0.04]" />
          <span className="absolute inset-[30%] rounded-full border border-white/[0.03]" />

          {/* Light sheen */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />

          {/* Center label */}
          <span className="absolute inset-[34%] rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-background/80" />
          </span>
        </motion.span>

        {/* Play / pause overlay */}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ opacity: hovered || !playing ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center rounded-full pointer-events-none"
        >
          <span className="w-7 h-7 rounded-full bg-background/85 backdrop-blur-sm flex items-center justify-center shadow-md">
            {playing ? (
              <Pause size={12} className="text-foreground fill-foreground" />
            ) : (
              <Play size={12} className="text-foreground fill-foreground translate-x-[1px]" />
            )}
          </span>
        </motion.span>
      </button>
    </motion.div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <motion.section
        ref={containerRef}
        className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background"
      >
        <motion.div
          style={{ y, opacity }}
          className="text-center z-10 px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-sm tracking-[0.2em] text-muted-foreground uppercase mb-6"
          >
            Celebrating Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-primary font-light tracking-tight mb-4"
          >
            Six Months
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-script text-4xl md:text-5xl text-accent-foreground mt-4"
          >
            And counting
          </motion.p>
        </motion.div>

        {/* Soft Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5 blur-[2px]"
              style={{
                width: Math.random() * 40 + 10 + "px",
                height: Math.random() * 40 + 10 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Vinyl disc — click to play our song */}
        <VinylDisc />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}

function Gallery() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-background">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Memory Wall</h2>
        <div className="w-12 h-[1px] bg-primary/30 mx-auto mt-8" />
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="break-inside-avoid"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-card p-4 pb-6 rounded-sm shadow-xl hover:shadow-2xl border border-border"
              style={{ transform: `rotate(${photo.rotate}deg)` }}
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-muted">
                <img
                  src={photo.src}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Message() {
  return (
    <section className="py-32 px-4 relative flex justify-center items-center overflow-hidden bg-muted/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="flex justify-center mb-12">
          <Heart className="text-primary/40 w-8 h-8" strokeWidth={1} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-8"
        >
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            My dearest,
          </p>
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            They say time goes by so fast when you're doing something you enjoy... that's clearly the case here. Half a year with you already and somehow it still feels like it just started… but in the best way. Being with you has honestly been so easy and fun, and I really enjoy the moments we spend together.
          </p>
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            You’ve become such an important part of my life no doubt,  without me even realizing when it happened. From our random conversations to the way you make me laugh, to the way you comfort me, you just  make everything better.
          </p>
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            One thing I really love is how much we’ve grown since day one. It’s not just about feelings anymore, it’s how we understand each other better, how we handle things, and how we keep choosing each other even in the small moments. Watching us become stronger and more comfortable together has honestly been one of my favorite parts of this.
          </p>
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            I’m really glad I get to do this with you my love, and I’m looking forward to making more memories, more jokes, and more everything with you
          </p>
          <p className="font-serif text-xl md:text-2xl leading-loose text-foreground">
            Six months down, and I’m still very much into you...maybe even more than when we started (definitely more😂).
            I’m really glad I get to call you mine.
            Still choosing you… and I don’t plan on stopping anytime soon ❤️
            I love you so much my princess ❤️
          </p>

          <div className="pt-12">
            <p className="font-script text-4xl text-primary">
              Your boyfriend ❤️
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-primary/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-primary/20 rounded-br-3xl pointer-events-none" />
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary/20 selection:text-primary">
      <Hero />
      <Gallery />
      <Message />
    </main>
  );
}
