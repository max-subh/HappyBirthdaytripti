import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Calendar, MapPin, PartyPopper, Flame, X, Eye, Mail, Gift } from 'lucide-react';
import image1 from '../images/image-1.png';
import image2 from '../images/image-2.jpg';
import image12 from '../images/image-12.jpg';
import image3 from '../images/image-3.jpg';
import image5 from '../images/image-5.jpg';
import image6 from '../images/image-6.jpg';
import image7 from '../images/image-7.jpg';
import image8 from '../images/image-8.png';
import image9 from '../images/image-9.png';
import image10 from '../images/image-10.png';

// =========================================================================
// 💖 1. CUSTOMIZE YOUR DETAILS DIRECTLY HERE
// =========================================================================
const GIRLFRIEND_NAME = "Tripti";
const BOYFRIEND_NAME = "Forever Yours, Subham";

// Set your girlfriend's birthday date & time (Format: YYYY-MM-DDTHH:mm:ss)
// e.g. "2026-10-08T00:00:00"
// Keep this as local time so the countdown matches midnight in the user's timezone.
const BIRTHDAY_DATE = new Date("2026-10-22T00:00:00");
const TRIPTI_BIRTH_DATE = new Date(2006, 9, 22);
const HERO_IMAGES = [image8, image9, image10];

function getAgeOnDate(birthDate: Date, date: Date) {
  let age = date.getFullYear() - birthDate.getFullYear();
  const birthdayThisYear = new Date(date.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (date < birthdayThisYear) age -= 1;
  return age;
}

// First Birthday Message (Edit your message directly here!)
const BIRTHDAY_MESSAGE = {
  headline: "My Love, My Baccha, My Batu 🫶🏻🥹💋",
  paragraphs: [
    "Happy Birthday to the most special person in my life, meri jaan, mera baccha. 🫶🏻❤️ Tum meri life ka woh part ho jise main kabhi khona nahi chahta. I wish I could be with you today, hug you tightly, kiss your forehead, and make you feel how much you mean to me. 🥺💋",
    "Distance chahe kitna bhi ho, mera dil hamesha tumhare paas hi rehta hai, baccha. ❤️ Tumhari smile meri happiness hai, tumhari khushi meri priority hai, aur tumhara saath meri favourite feeling. 🫂💖",
    "I promise to keep loving you, caring for you, and choosing you every single day. I hope tumhari life hamesha happiness, love aur beautiful moments se bhari rahe. 🧿✨",
    "Happy Birthday once again, mera baccha! 🎂💗 I love you more than words can explain. Tum meri aaj ki happiness aur future ki favourite dream ho. 😘❤️",
    "Forever my Life, My batu. 💋🫶🏻"
  ]
};
const LETTER_FULL_TEXT = BIRTHDAY_MESSAGE.paragraphs.join('\n\n');

// Exactly 6 Memories (Put your photo URLs or image paths directly here!)
const MEMORIES = [
  {
    id: 1,
    title: "Always Together 💕",
    date: "August 24",
    location: "Jamsadpur",
    story: "We promise to always stand by each other, no matter how difficult life gets.",
    image: image1,
    gradient: "from-amber-200 via-rose-300 to-rose-900"
  },
  {
    id: 2,
    title: "Distance Won’t Change Us 🌙",
    date: "December 20",
    location: "Jamsadpur",
    story: "We promise that no matter how many miles are between us, our love, trust, and connection will always keep us close.",
    image: image12,
    gradient: "from-amber-100 via-stone-300 to-amber-900"
  },
  {
    id: 3,
    title: "No Matter the Distance ❤️",
    date: "May 10",
    location: "Jamsadpur",
    story: "We promise that no matter how far apart we are, we will always make each other feel loved, valued, and close to our hearts.",
    image: image3,
    gradient: "from-slate-800 via-indigo-950 to-slate-900"
  },
  {
    id: 4,
    title: "To Keep Choosing Each Other ❤️",
    date: "October 30",
    location: "Ghatsila",
    story: "We promise to keep choosing each other, even on the days when things aren’t perfect.",
    image: image7,
    gradient: "from-indigo-950 via-[#1e1b4b] to-[#0f172a]"
  },
  {
    id: 5,
    title: "To Grow Old Together ❤️",
    date: "March 09",
    location: "Ranchi",
    story: "We promise to create countless beautiful memories together and grow old while still loving each other like we do today.",
    image: image5,
    gradient: "from-rose-200 via-pink-300 to-indigo-900"
  },
  {
    id: 6,
    title: "To Be There Through Everything 🫶",
    date: "December 06",
    location: "Ghatsila",
    story: "We promise to celebrate each other’s happiness and support each other through every struggle.",
    image: image6,
    gradient: "from-sky-200 via-amber-200 to-amber-400"
  }
];

// =========================================================================
// 🎉 2. CONFETTI CELEBRATION ANIMATION
// =========================================================================
let confettiInterval: ReturnType<typeof setInterval> | undefined;

function triggerConfetti(repeatSideCannons = true) {
  if (confettiInterval) clearInterval(confettiInterval);
  confettiInterval = undefined;
  confetti.reset();

  const heart = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 57,18 75,56z'
  });
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff'];

  // Big initial explosion
  confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 }, colors, shapes: ['circle', heart] });

  const fireSideCannons = () => {
    confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, shapes: ['circle', heart] });
    confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, shapes: ['circle', heart] });
  };

  if (!repeatSideCannons) {
    fireSideCannons();
    return;
  }

  // Celebratory side cannons
  const end = Date.now() + 3000;
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      if (confettiInterval === interval) confettiInterval = undefined;
      return;
    }
    fireSideCannons();
  }, 250);
  confettiInterval = interval;
}

// =========================================================================
// 🚀 3. MAIN APPLICATION COMPONENT
// =========================================================================
export default function App() {
  // Fold option in message is folded by default as requested
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [typedLetterCharacters, setTypedLetterCharacters] = useState(0);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasBirthdayArrived, setHasBirthdayArrived] = useState(false);
  const hasCelebratedBirthday = useRef(false);
  const hasFiredOpenConfetti = useRef(false);

  // Surprise celebration modal & selected memory
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [extraSurpriseRevealed, setExtraSurpriseRevealed] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [previousHeroSlideIndex, setPreviousHeroSlideIndex] = useState<number | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<typeof MEMORIES[0] | null>(null);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!isLetterOpen) {
      setTypedLetterCharacters(0);
      return;
    }

    let characterIndex = 0;
    let timer: ReturnType<typeof setTimeout>;
    const typeNextCharacter = () => {
      characterIndex += 1;
      setTypedLetterCharacters(characterIndex);

      if (characterIndex >= LETTER_FULL_TEXT.length) return;

      const lastCharacter = LETTER_FULL_TEXT[characterIndex - 1];
      const delay = lastCharacter === '\n'
        ? 90
        : /\s/.test(lastCharacter)
          ? 45
          : /[,.!?;:]/.test(lastCharacter)
            ? 45
            : 10;
      timer = setTimeout(typeNextCharacter, delay);
    };

    timer = setTimeout(typeNextCharacter, 280);
    return () => clearTimeout(timer);
  }, [isLetterOpen]);

  useEffect(() => {
    if (!isSurpriseOpen && !selectedMemory) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (selectedMemory) {
        setSelectedMemory(null);
      } else {
        setIsSurpriseOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSurpriseOpen, selectedMemory]);

  useEffect(() => {
    const nextIndex = (heroSlideIndex + 1) % HERO_IMAGES.length;
    const nextImage = new Image();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const advanceSlide = () => {
      if (cancelled) return;
      setPreviousHeroSlideIndex(heroSlideIndex);
      setHeroSlideIndex(nextIndex);
    };
    const scheduleSlide = () => {
      if (!cancelled) timer = setTimeout(advanceSlide, 3000);
    };
    const handleLoadError = () => {
      console.error(`Unable to load heading slideshow image: ${HERO_IMAGES[nextIndex]}`);
    };

    nextImage.addEventListener('load', scheduleSlide, { once: true });
    nextImage.addEventListener('error', handleLoadError, { once: true });
    nextImage.src = HERO_IMAGES[nextIndex];
    if (nextImage.complete && nextImage.naturalWidth > 0) scheduleSlide();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      nextImage.removeEventListener('load', scheduleSlide);
      nextImage.removeEventListener('error', handleLoadError);
    };
  }, [heroSlideIndex]);

  useEffect(() => {
    if (previousHeroSlideIndex === null) return;

    const timer = setTimeout(() => setPreviousHeroSlideIndex(null), 1500);
    return () => clearTimeout(timer);
  }, [previousHeroSlideIndex]);

  // Countdown timer tick
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let animationFrame = 0;

    function updateCountdown() {
      const diff = BIRTHDAY_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setHasBirthdayArrived(true);
        if (timer) {
          clearInterval(timer);
          timer = undefined;
        }
        if (!hasCelebratedBirthday.current) {
          hasCelebratedBirthday.current = true;
          triggerConfetti(false);
          setIsSurpriseOpen(true);
        }
        return false;
      }
      setHasBirthdayArrived(false);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
      return true;
    }

    const initialDiff = BIRTHDAY_DATE.getTime() - Date.now();
    if (initialDiff <= 0) {
      updateCountdown();
    } else {
      const target = {
        days: Math.floor(initialDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((initialDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((initialDiff / 1000 / 60) % 60),
        seconds: Math.floor((initialDiff / 1000) % 60)
      };
      const startedAt = performance.now();
      const introDuration = 1100;

      const animateIntro = (now: number) => {
        const progress = Math.min((now - startedAt) / introDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setTimeLeft({
          days: Math.round(target.days * easedProgress),
          hours: Math.round(target.hours * easedProgress),
          minutes: Math.round(target.minutes * easedProgress),
          seconds: Math.round(target.seconds * easedProgress)
        });

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateIntro);
        } else if (updateCountdown()) {
          timer = setInterval(updateCountdown, 1000);
        }
      };

      animationFrame = requestAnimationFrame(animateIntro);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (timer) clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (hasFiredOpenConfetti.current) return;
    hasFiredOpenConfetti.current = true;
    triggerConfetti(false);
  }, []);

  const handleCelebrate = () => {
    setCandlesBlown(false);
    setExtraSurpriseRevealed(false);
    triggerConfetti();
    setIsSurpriseOpen(true);
  };

  const handleLike = (id: number, e?: MouseEvent) => {
    e?.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="site-shell min-h-screen bg-[#FAF7F5] text-[#2D2424] font-sans antialiased selection:bg-rose-200">
      {/* 🌸 Floating Hearts in Background */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { left: '6%', delay: '0s', dur: '8s', size: 'w-6 h-6', color: 'text-rose-400' },
          { left: '18%', delay: '3s', dur: '11s', size: 'w-4 h-4', color: 'text-pink-400' },
          { left: '32%', delay: '1s', dur: '9s', size: 'w-7 h-7', color: 'text-rose-500' },
          { left: '50%', delay: '4s', dur: '10s', size: 'w-5 h-5', color: 'text-pink-400' },
          { left: '68%', delay: '2s', dur: '8s', size: 'w-6 h-6', color: 'text-rose-400' },
          { left: '82%', delay: '5s', dur: '12s', size: 'w-5 h-5', color: 'text-pink-500' },
          { left: '94%', delay: '1.5s', dur: '9s', size: 'w-7 h-7', color: 'text-rose-400' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`absolute bottom-0 ${item.color}`}
            style={{
              left: item.left,
              animation: `floatHeart ${item.dur} infinite linear`,
              animationDelay: item.delay,
            }}
          >
            <Heart className={`${item.size} fill-current drop-shadow-sm`} />
          </div>
        ))}
      </div>
      {/* Top Navigation */}
      <header className="site-header sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-stone-200 px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-bold tracking-tight text-stone-900 transition-colors hover:text-rose-700 sm:text-2xl">
          Forever & Always
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <a href="#countdown" className="hover:text-rose-700 transition-colors">Countdown</a>
          <a href="#message" className="hover:text-rose-700 transition-colors">Birthday Message</a>
          <a href="#memories" className="hover:text-rose-700 transition-colors">6 Best Memories</a>
        </nav>

        <button
          onClick={handleCelebrate}
          className="interaction-button inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 sm:px-4"
        >
          <PartyPopper className="w-3.5 h-3.5 text-amber-200" />
          <span className="sm:hidden">Surprise!</span>
          <span className="hidden sm:inline">Surprise Confetti!</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-20 sm:space-y-24">
        <section className="intro-hero relative isolate grid overflow-hidden rounded-[2rem] border border-rose-100/80 bg-white shadow-[0_28px_70px_-42px_rgba(136,19,55,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="intro-copy relative z-10 flex flex-col items-center justify-center px-7 py-10 text-center sm:px-12 sm:py-14 lg:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-rose-50/80 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-700 sm:text-xs">
              <Sparkles className="birthday-sparkle h-3.5 w-3.5" />
              A little celebration of you
            </span>
            <h1 className="mt-6 font-serif text-5xl font-medium leading-[0.95] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
              Happy Birthday,
              <span className="mt-2 block italic text-rose-700">{GIRLFRIEND_NAME}</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600 sm:text-base">
              A little world filled with our sweetest memories, a letter from my heart, and all the love you deserve today.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCelebrate}
                className="interaction-button inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-rose-900/15 sm:text-sm"
              >
                <PartyPopper className="h-4 w-4 text-amber-200" />
                Open your surprise
              </button>
              <a
                href="#memories"
                className="rounded-full border border-stone-200 bg-white/80 px-5 py-3 text-xs font-semibold text-stone-700 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:text-sm"
              >
                Our memories
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-stone-400">
              <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              <span>Made with all my love, just for you</span>
            </div>
          </div>

          <div className="intro-photo-wrap order-first relative aspect-square overflow-hidden bg-rose-50 sm:aspect-4/3 lg:order-last lg:aspect-auto lg:min-h-full">
            {previousHeroSlideIndex !== null && (
              <img
                key={HERO_IMAGES[previousHeroSlideIndex]}
                src={HERO_IMAGES[previousHeroSlideIndex]}
                alt=""
                aria-hidden="true"
                className="intro-photo hero-slide hero-slide-leaving absolute inset-0 h-full w-full object-cover object-[center_42%]"
              />
            )}
            <img
              key={HERO_IMAGES[heroSlideIndex]}
              src={HERO_IMAGES[heroSlideIndex]}
              alt={`${GIRLFRIEND_NAME} birthday photo ${heroSlideIndex + 1}`}
              className="intro-photo hero-slide hero-slide-active absolute inset-0 h-full w-full object-cover object-[center_42%]"
            />
          </div>
        </section>

        {/* ⏰ COUNTDOWN CLOCK SECTION */}
        <section id="countdown" className="section-arrive scroll-mt-24 text-center pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-medium mb-4">
            <Sparkles className="birthday-sparkle w-3.5 h-3.5 text-rose-600" />
            <span>Counting Down to Your Special Day</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-stone-900 font-normal tracking-tight">
            Happy Birthday, <span className="italic text-rose-700">{GIRLFRIEND_NAME}</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            A little world made just for you, filled with our sweetest memories, endless love, and a surprise to make your special day unforgettable.
          </p>

          {/* Countdown Clock Box */}
          <div className="countdown-panel mt-8 max-w-2xl mx-auto rounded-3xl bg-linear-to-b from-stone-900 to-[#1c1917] p-6 sm:p-8 text-white shadow-2xl border border-stone-800">
            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs uppercase tracking-widest font-semibold mb-6">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
              <span>Countdown to Midnight</span>
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-pulse" />
            </div>

            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto mb-6">
              {[
                { label: 'Days', val: pad(timeLeft.days) },
                { label: 'Hours', val: pad(timeLeft.hours) },
                { label: 'Minutes', val: pad(timeLeft.minutes) },
                { label: 'Seconds', val: pad(timeLeft.seconds) },
              ].map(item => (
                <div key={item.label} className="countdown-unit rounded-2xl border border-stone-700/60 bg-stone-800/80 p-3 text-center sm:p-4">
                  <div key={item.val} className="animate-countdown-tick font-mono text-2xl sm:text-4xl font-bold text-amber-200 tabular-nums">
                    {item.val}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {hasBirthdayArrived && (
              <div className="birthday-age-reveal mb-6 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-200">It’s your day!</p>
                <p className="mt-1 font-serif text-2xl text-amber-100 sm:text-3xl">
                  {GIRLFRIEND_NAME} turns {getAgeOnDate(TRIPTI_BIRTH_DATE, BIRTHDAY_DATE)} today
                </p>
                <p className="mt-1 text-xs text-stone-300">Wishing you the happiest birthday and a beautiful year ahead.</p>
              </div>
            )}

          </div>
        </section>

        {/* 💌 FIRST BIRTHDAY MESSAGE (FOLDED BY DEFAULT) */}
        <section id="message" className="section-arrive scroll-mt-24">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold">From My Heart</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">First Birthday Message</h2>
            <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
              Tap the sealed envelope below to open and unfold your birthday letter.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {!isLetterOpen ? (
              /* FOLDED ENVELOPE (DEFAULT STATE) */
              <div
                role="button"
                tabIndex={0}
                aria-label="Open the sealed birthday letter"
                onClick={() => {
                  setIsLetterOpen(true);
                  triggerConfetti(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setIsLetterOpen(true);
                    triggerConfetti(false);
                  }
                }}
                className="sealed-envelope w-full cursor-pointer rounded-3xl border border-amber-200/80 bg-[#FDF9F5] p-8 text-center shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500 sm:p-12"
              >
                <div className="envelope-seal w-16 h-16 mx-auto mb-4 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-stone-800">A Sealed Birthday Envelope</h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">Sealed with wax & endless love. Tap to unseal and read!</p>
                <span className="inline-block mt-4 text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
                  Tap to Unfold Letter ✨
                </span>
              </div>
            ) : (
              /* UNFOLDED LETTER STATE */
              <div className="letter-paper rounded-3xl bg-[#FAF6F0] border border-[#E8DDD0] p-6 sm:p-12 shadow-xl paper-texture relative animate-letter-unfold">
                <div
                  className="letter-content-reveal flex justify-between items-center border-b border-stone-200 pb-4 mb-6"
                  style={{ animationDelay: '140ms' }}
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase text-stone-400">Written By asU</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-rose-950 font-medium">{BIRTHDAY_MESSAGE.headline}</h3>
                  </div>

                  <button
                    onClick={() => setIsLetterOpen(false)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs cursor-pointer transition-colors"
                  >
                    Fold Envelope
                  </button>
                </div>

                <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base font-normal">
                  {BIRTHDAY_MESSAGE.paragraphs.map((para, i) => {
                    const paragraphStart = BIRTHDAY_MESSAGE.paragraphs
                      .slice(0, i)
                      .reduce((total, previous) => total + previous.length + 2, 0);
                    const visibleText = LETTER_FULL_TEXT.slice(
                      paragraphStart,
                      Math.min(paragraphStart + para.length, typedLetterCharacters)
                    );

                    return visibleText ? <p key={i}>{visibleText}</p> : null;
                  })}
                  {typedLetterCharacters >= LETTER_FULL_TEXT.length && (
                    <div className="letter-content-reveal pt-6 border-t border-stone-200 flex justify-between items-end">
                      <div>
                        <p className="italic font-serif text-xs text-stone-400">Forever and always,</p>
                        <p className="font-serif italic text-2xl text-rose-800 mt-1">{BOYFRIEND_NAME}</p>
                      </div>
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 📸 6 BEST MEMORIES ALBUM (NO CATEGORIES) */}
        <section id="memories" className="section-arrive scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-rose-600 font-semibold">Our Journey Together</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-1">Our 6 Best Memories</h2>
            <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
              Six moments frozen in time. Tap any polaroid to view the full memory story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MEMORIES.map((mem) => (
              <div
                key={mem.id}
                role="button"
                tabIndex={0}
                aria-label={`View memory: ${mem.title}`}
                onClick={() => setSelectedMemory(mem)}
                onKeyDown={(event) => {
                  if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    setSelectedMemory(mem);
                  }
                }}
                className="memory-card group relative cursor-pointer rounded-2xl border border-[#EBE3D7] bg-[#FCFAF7] p-4 pb-6 polaroid-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
                style={{ animationDelay: `${(mem.id - 1) * 90}ms` }}
              >
                {/* Washi tape aesthetic */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-100/80 border-y border-amber-300/40 opacity-75 shadow-xs pointer-events-none" />

                {/* Memory Photo */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-900 shadow-inner">
                  <div className={`absolute inset-0 z-0 bg-linear-to-br ${mem.gradient}`} />
                  <img
                    src={mem.image}
                    alt={mem.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                    className="relative z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-900/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-900/80 text-xs">
                      <Eye className="w-3.5 h-3.5 text-rose-300" />
                      <span>Read Story</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono mb-1">
                    <span className="flex items-center gap-1 text-stone-500">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>{mem.date}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-500">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span className="truncate max-w-30">{mem.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-stone-900 font-medium group-hover:text-rose-700 transition-colors line-clamp-1">
                    {mem.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {mem.story}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-400">Memory #{mem.id}</span>

                    <button
                      type="button"
                      onClick={(e) => handleLike(mem.id, e)}
                      aria-pressed={Boolean(likedMap[mem.id])}
                      aria-label={`${likedMap[mem.id] ? 'Unlike' : 'Like'} ${mem.title}`}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs cursor-pointer transition-colors ${likedMap[mem.id] ? 'bg-rose-100 text-rose-700 font-semibold' : 'bg-stone-100 hover:bg-rose-50 text-stone-600'
                        }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedMap[mem.id] ? 'liked-heart-pop fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums font-mono text-[11px]">{likedMap[mem.id] ? 1 : 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-stone-200 bg-[#FAF7F5] py-8 text-center text-xs text-stone-500">
        <p className="font-serif text-base text-stone-800">Made with all my love for {GIRLFRIEND_NAME}</p>
        <p className="mt-1 text-stone-400">Happy Birthday Baccha😘</p>
      </footer>

      {/* 🎂 BIRTHDAY CAKE & CONFETTI SURPRISE MODAL */}
      {isSurpriseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="birthday-surprise-title"
            className="animate-pop-modal relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-3xl border border-rose-500/30 bg-linear-to-b from-[#251A1D] via-[#1C1618] to-[#120E10] p-6 text-center text-white shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setIsSurpriseOpen(false)}
              aria-label="Close birthday surprise"
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
              <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
              <span>Surprise! Happy Birthday!</span>
            </div>

            <h2 id="birthday-surprise-title" className="font-serif text-3xl sm:text-4xl font-medium text-white mb-1">
              Happy Birthday, {GIRLFRIEND_NAME}!
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto mb-6">
              May every wish you hold close to your heart come true today.
            </p>

            {/* 3D Birthday Cake */}
            <div className="py-4 max-w-xs mx-auto">
              <div className="flex justify-center items-end gap-5 mb-2">
                {[0, 1, 2].map(idx => (
                  <div key={idx} className="flex flex-col items-center">
                    {!candlesBlown ? (
                      <div
                        className="animate-candle"
                        style={{
                          animationDelay: `${idx * 170}ms`,
                          animationDuration: `${1.25 + idx * 0.17}s`,
                        }}
                      />
                    ) : (
                      <div
                        key={`smoke-${idx}`}
                        className="candle-smoke"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      />
                    )}
                    <div className="w-3 h-10 bg-linear-to-b from-rose-200 to-rose-400 rounded-t-sm" />
                  </div>
                ))}
              </div>
              <div className="w-32 h-10 mx-auto rounded-t-xl bg-linear-to-r from-pink-300 via-rose-200 to-pink-300 border-b border-pink-400/40" />
              <div className="w-44 h-12 mx-auto rounded-t-lg rounded-b-xl bg-stone-800 border border-stone-600/50 flex items-center justify-center">
                <span className="font-serif italic text-[11px] text-amber-200/90">Made With All My Love</span>
              </div>
              <div className="w-52 h-2.5 mx-auto bg-stone-500 rounded-full -mt-0.5" />
            </div>

            <div className="mt-6">
              {!candlesBlown ? (
                <button
                  onClick={() => {
                    setCandlesBlown(true);
                    triggerConfetti(false);
                  }}
                  className="interaction-button px-6 py-2.5 rounded-full bg-linear-to-r from-amber-400 via-rose-500 to-pink-500 text-stone-950 font-semibold text-xs shadow-lg cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 inline mr-1 fill-amber-950" />
                  Make a Wish & Blow Out Candles!
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-amber-200 text-xs">✨ Your wish has been sealed in the stars!</p>
                  {!extraSurpriseRevealed ? (
                    <button
                      onClick={() => {
                        setExtraSurpriseRevealed(true);
                        triggerConfetti(false);
                      }}
                      className="interaction-button mx-auto flex items-center gap-2 rounded-full border border-amber-200/30 bg-white/10 px-5 py-2.5 text-xs font-semibold text-amber-100 shadow-md transition-colors hover:bg-white/15"
                    >
                      <Gift className="h-4 w-4 text-amber-300" />
                      Open one more surprise
                    </button>
                  ) : (
                    <div className="extra-surprise mx-auto max-w-sm rounded-2xl border border-rose-200/20 bg-rose-100/10 px-5 py-4">
                      <Heart className="mx-auto mb-2 h-5 w-5 fill-rose-300 text-rose-300" />
                      <p className="font-serif text-lg text-amber-100">My favorite person</p>
                      <p className="mt-1 text-xs leading-relaxed text-stone-200">
                        My favorite place will always be wherever I get to see you smile. Happy Birthday, Tripti. I love you endlessly.
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => setIsSurpriseOpen(false)}
                    className="interaction-button mx-auto block rounded-full bg-rose-600 px-5 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-rose-700"
                  >
                    ← Back to Celebration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🖼️ MEMORY LIGHTBOX MODAL */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-fade-in">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-lightbox-title"
            className="animate-pop-modal relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex flex-col overflow-y-auto rounded-3xl border border-stone-300 bg-[#FAF7F2] shadow-2xl sm:flex-row"
          >
            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              aria-label="Close memory"
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-stone-900/60 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full sm:w-1/2 aspect-4/3 sm:aspect-auto min-h-55 bg-stone-950 relative">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-linear-to-br ${selectedMemory.gradient} -z-10`} />
            </div>

            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400">{selectedMemory.date} · {selectedMemory.location}</span>
                <h3 id="memory-lightbox-title" className="font-serif text-2xl text-stone-900 mt-1 mb-3">{selectedMemory.title}</h3>
                <p className="text-stone-700 text-sm leading-relaxed">{selectedMemory.story}</p>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-4 flex justify-between items-center">
                <span className="text-xs text-stone-400">Memory #{selectedMemory.id}</span>
                <button
                  type="button"
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  aria-pressed={Boolean(likedMap[selectedMemory.id])}
                  aria-label={`${likedMap[selectedMemory.id] ? 'Unlike' : 'Like'} ${selectedMemory.title}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs cursor-pointer font-medium"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[selectedMemory.id] ? 'fill-rose-500' : ''}`} />
                  <span>{likedMap[selectedMemory.id] ? 1 : 0} Loves</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
