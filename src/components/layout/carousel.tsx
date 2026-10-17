import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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

const categories: Slide[] = [
  { id: 0, title: 'Cardiologist', color: 'bg-rose-500' },
  { id: 1, title: 'Neurologist', color: 'bg-amber-500' },
  { id: 2, title: 'General', color: 'bg-emerald-500' },

];


// TODO: I NEED TO UNSERTAND THIS LATER, ITS A PREMADE TEMPLATE
export default function Carousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState<boolean>(true);
  const [atEnd, setAtEnd] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);

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
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex flex-col w-[150px] text-center shrink-0 snap-start text-sm space-y-3 border-b-2 transition-all transform duration-300
                  ease-in-out font-semibold mb-[1rem] ${category.id === categoryId ? "text-black border-black" : "text-gray-200 border-gray-200"}`}
              onClick={() => setCategoryId(category.id)}>
              <h1>{category.title}</h1>
            </div>
          ))}
        </div>
        <div
          ref={trackRef}
          onScroll={updateState}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`flex flex-col h-[350px] w-60 shrink-0 snap-start rounded-xl text-2xl space-y-3 active:scale-90 transition-all transform
                duraiton-300 ease-in-out`}
            >
                <div className='relative'>
                    <Image src={"/images/landing-three.jpg"} alt={slide.title} width={1000} height={1000} className="rounded-xl w-full h-[130px]" />
                    
                </div>
                <div className="w-full space-y-1">
                    <div className="flex items-center">
                        <Image src={"/images/landing-one.jpg"} alt={slide.title} width={1000} height={1000} className="rounded-xl w-[25px] h-[25px]" />
                        <div className="flex items-center justify-center self-end -ml-2 w-[10px] h-[10px] rounded-full bg-white">
                            <div className='w-[7px] h-[7px] bg-green-500 rounded-full'></div>
                        </div>
                        <h1 className='text-black text-xs ml-1 font-semibold w-[140px]'>Doc. San Juan G.</h1>
                        <div className='bg-green-500 w-[75px] h-auto text-xs rounded-lg p-[0.3rem]'>
                            <h1 className='text-center font-semibold'>Top Rated</h1>
                        </div>
                    </div>
                    <p className='text-black text-xs tracking-wider leading-5'>I will build you a ready to sell dropshipping shopify store</p>
                    <div className='flex items-center gap-1'>
                      <Image src={"/icon/star.png"} alt='star' width={1000} height={1000} className='w-[12px] h-[12px]' />
                      <p className='text-xs text-black'>4.9</p>
                      <p className='text-xs text-gray-500'>(1k+)</p>
                    </div>
                    <p className='text-xs text-black'>Expertise:</p>
                    <div className='flex flex-wrap gap-2'>
                      {slides.map(() => (
                        <div className='text-xs text-black bg-gray-200 border border-gray-200 rounded-xl p-[0.2rem]'>
                          Cardiology
                        </div>
                      ))}
                    </div>
                </div>
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