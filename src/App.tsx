import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Calendar, MapPin, PartyPopper, Flame, X, Eye, Mail } from 'lucide-react';
import image1 from '../images/image-1.png';
import image2 from '../images/image-2.jpg';
import image3 from '../images/image-3.jpg';
import image5 from '../images/image-5.jpg';
import image6 from '../images/image-6.jpg';
import image7 from '../images/image-7.jpg';

// =========================================================================
// 💖 1. CUSTOMIZE YOUR DETAILS DIRECTLY HERE
// =========================================================================
const GIRLFRIEND_NAME = "Tripti";
const BOYFRIEND_NAME = "Forever Yours, Subham";

// Set your girlfriend's birthday date & time (Format: YYYY-MM-DDTHH:mm:ss)
// e.g. "2026-10-08T00:00:00"
const BIRTHDAY_DATE = new Date("2026-10-22T00:00:00").toISOString();

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
    date: "August 24",
    location: "Jamsadpur",
    story: "We promise that no matter how many miles are between us, our love, trust, and connection will always keep us close.",
    image: image2,
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
function triggerConfetti() {
  const heart = confetti.shapeFromPath({
    path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 57,18 75,56z'
  });
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff'];

  // Big initial explosion
  confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 }, colors, shapes: ['circle', heart] });

  // Celebratory side cannons
  const end = Date.now() + 3000;
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval);
    confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, shapes: ['circle', heart] });
    confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, shapes: ['circle', heart] });
  }, 250);
}

// =========================================================================
// 🚀 3. MAIN APPLICATION COMPONENT
// =========================================================================
export default function App() {
  // Fold option in message is folded by default as requested
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasTriggeredZero, setHasTriggeredZero] = useState(false);

  // Surprise celebration modal & selected memory
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<typeof MEMORIES[0] | null>(null);
  const [likes, setLikes] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  // Countdown timer tick
  useEffect(() => {
    function updateCountdown() {
      const diff = new Date(BIRTHDAY_DATE).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!hasTriggeredZero) {
          setHasTriggeredZero(true);
          triggerConfetti();
          setIsSurpriseOpen(true);
        }
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [hasTriggeredZero]);

  // Website open hote hi automatically confetti blast hoga
  // useEffect(() => {
  //   triggerConfetti();
  // }, []);

  const handleCelebrate = () => {
    triggerConfetti();
    setIsSurpriseOpen(true);
  };

  const handleLike = (id: number, e?: MouseEvent) => {
    e?.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
    setLikes(prev => ({ ...prev, [id]: prev[id] + (likedMap[id] ? -1 : 1) }));
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#2D2424] font-sans antialiased selection:bg-rose-200">
      {/* 🌸 Floating Hearts in Background */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <style>{`
          @keyframes floatHeart {
            0% {
              transform: translateY(105vh) scale(0.7);
              opacity: 0;
            }
            15% {
              opacity: 0.7;
            }
            85% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-15vh) scale(1.2);
              opacity: 0;
            }
          }
        `}</style>

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
      <header className="sticky top-0 z-40 bg-[#FAF7F5]/90 backdrop-blur-md border-b border-stone-200 px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-stone-900 hover:text-rose-700 transition-colors">
          Forever & Always
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-600">
          <a href="#countdown" className="hover:text-rose-700 transition-colors">Countdown</a>
          <a href="#message" className="hover:text-rose-700 transition-colors">Birthday Message</a>
          <a href="#memories" className="hover:text-rose-700 transition-colors">6 Best Memories</a>
        </nav>

        <button
          onClick={handleCelebrate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
        >
          <PartyPopper className="w-3.5 h-3.5 text-amber-200" />
          <span>Surprise Confetti!</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        {/* ⏰ COUNTDOWN CLOCK SECTION */}
        <section id="countdown" className="text-center pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Counting Down to Your Special Day</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-stone-900 font-normal tracking-tight">
            Happy Birthday, <span className="italic text-rose-700">{GIRLFRIEND_NAME}</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            A little world made just for you, filled with our sweetest memories, endless love, and a surprise to make your special day unforgettable.
          </p>

          {/* Countdown Clock Box */}
          <div className="mt-8 max-w-2xl mx-auto rounded-3xl bg-linear-to-b from-stone-900 to-[#1c1917] p-6 sm:p-8 text-white shadow-2xl border border-stone-800">
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
                <div key={item.label} className="bg-stone-800/80 rounded-2xl p-3 sm:p-4 border border-stone-700/60 text-center">
                  <div className="font-mono text-2xl sm:text-4xl font-bold text-amber-200 tabular-nums">
                    {item.val}
                  </div>
                  <div className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCelebrate}
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium text-xs shadow-lg cursor-pointer transition-all"
            >
              Trigger Birthday Surprise Now!
            </button>
          </div>
        </section>

        {/* 💌 FIRST BIRTHDAY MESSAGE (FOLDED BY DEFAULT) */}
        <section id="message" className="scroll-mt-20">
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
                onClick={() => {
                  setIsLetterOpen(true);
                  triggerConfetti();
                }}
                className="cursor-pointer p-8 sm:p-12 rounded-3xl bg-[#FDF9F5] border border-amber-200/80 shadow-md text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md">
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
              <div className="rounded-3xl bg-[#FAF6F0] border border-[#E8DDD0] p-6 sm:p-12 shadow-xl paper-texture relative animate-letter-unfold">
                <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
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
                  {BIRTHDAY_MESSAGE.paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <div className="pt-6 border-t border-stone-200 flex justify-between items-end">
                    <div>
                      <p className="italic font-serif text-xs text-stone-400">Forever and always,</p>
                      <p className="font-serif italic text-2xl text-rose-800 mt-1">{BOYFRIEND_NAME}</p>
                    </div>
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 📸 6 BEST MEMORIES ALBUM (NO CATEGORIES) */}
        <section id="memories" className="scroll-mt-20">
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
                onClick={() => setSelectedMemory(mem)}
                className="group relative bg-[#FCFAF7] p-4 pb-6 rounded-2xl polaroid-shadow border border-[#EBE3D7] transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                {/* Washi tape aesthetic */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-amber-100/80 border-y border-amber-300/40 opacity-75 shadow-xs pointer-events-none" />

                {/* Memory Photo */}
                <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-900 shadow-inner">
                  <img
                    src={mem.image}
                    alt={mem.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if direct URL fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Styled fallback container behind img */}
                  <div className={`absolute inset-0 bg-linear-to-br ${mem.gradient} -z-10`} />

                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
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
                      onClick={(e) => handleLike(mem.id, e)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs cursor-pointer transition-colors ${likedMap[mem.id] ? 'bg-rose-100 text-rose-700 font-semibold' : 'bg-stone-100 hover:bg-rose-50 text-stone-600'
                        }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedMap[mem.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums font-mono text-[11px]">{likes[mem.id]}</span>
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
          <div className="relative w-full max-w-lg bg-linear-to-b from-[#251A1D] via-[#1C1618] to-[#120E10] text-white rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl text-center">
            <button
              onClick={() => setIsSurpriseOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
              <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
              <span>Surprise! Happy Birthday!</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white mb-1">
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
                      <div className="w-3.5 h-5 rounded-full bg-linear-to-t from-rose-500 via-amber-300 to-amber-100 animate-candle shadow-[0_0_12px_rgba(251,191,36,0.9)] mb-1" />
                    ) : (
                      <div className="w-1.5 h-3 bg-stone-400/50 rounded-full mb-1 animate-pulse" />
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
                    triggerConfetti();
                  }}
                  className="px-6 py-2.5 rounded-full bg-linear-to-r from-amber-400 via-rose-500 to-pink-500 text-stone-950 font-semibold text-xs shadow-lg cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 inline mr-1 fill-amber-950" />
                  Make a Wish & Blow Out Candles!
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-amber-200 text-xs">✨ Your wish has been sealed in the stars!</p>
                  <button
                    onClick={() => setIsSurpriseOpen(false)}
                    className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-md"
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
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-stone-300 flex flex-col sm:flex-row">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-stone-900/60 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full sm:w-1/2 aspect-4/3 sm:aspect-auto min-h-55 bg-stone-950 relative">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-linear-to-br ${selectedMemory.gradient} -z-10`} />
            </div>

            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-stone-400">{selectedMemory.date} · {selectedMemory.location}</span>
                <h3 className="font-serif text-2xl text-stone-900 mt-1 mb-3">{selectedMemory.title}</h3>
                <p className="text-stone-700 text-sm leading-relaxed">{selectedMemory.story}</p>
              </div>

              <div className="pt-4 border-t border-stone-200 mt-4 flex justify-between items-center">
                <span className="text-xs text-stone-400">Memory #{selectedMemory.id}</span>
                <button
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs cursor-pointer font-medium"
                >
                  <Heart className={`w-3.5 h-3.5 ${likedMap[selectedMemory.id] ? 'fill-rose-500' : ''}`} />
                  <span>{likes[selectedMemory.id]} Loves</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
