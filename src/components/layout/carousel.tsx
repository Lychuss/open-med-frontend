import { useCallback, useEffect, useRef, useState } from 'react';

type Slide = {
  id: number;
  title: string;
  color: string;
};

const slides: Slide[] = [
  { id: 1, title: 'Slide 1', color: 'bg-rose-500' },
  { id: 2, title: 'Slide 2', color: 'bg-amber-500' },
  { id: 3, title: 'Slide 3', color: 'bg-emerald-500' },
  { id: 4, title: 'Slide 4', color: 'bg-sky-500' },
  { id: 5, title: 'Slide 5', color: 'bg-violet-500' },
];


// TODO: I NEED TO UNSERTAND THIS LATER, ITS A PREMADE TEMPLATE
export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState<boolean>(true);
  const [atEnd, setAtEnd] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const getStep = (track: HTMLDivElement): number => {
    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return firstCard.offsetWidth + gap;
  };

  const updateState = useCallback((): void => {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep(track);
    setAtStart(track.scrollLeft <= 0);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
    if (step > 0) {
      setActiveIndex(Math.round(track.scrollLeft / step));
    }
  }, []);

  useEffect(() => {
    updateState();
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, [updateState]);

  const scrollByOne = (direction: 1 | -1): void => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * getStep(track), behavior: 'smooth' });
  };

  const scrollToIndex = (index: number): void => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * getStep(track), behavior: 'smooth' });
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          onScroll={updateState}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`${slide.color} flex h-56 w-72 shrink-0 snap-start items-center justify-center rounded-xl text-2xl font-bold text-white`}
            >
              {slide.title}
            </div>
          ))}
        </div>

        {/* Prev */}
        {/* <button
          type="button"
          onClick={() => scrollByOne(-1)}
          disabled={atStart}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button> */}

        {/* Next */}
        {/* <button
          type="button"
          onClick={() => scrollByOne(1)}
          disabled={atEnd}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button> */}
      </div>
    </div>
  );
}