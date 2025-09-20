"use client";
import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { useDotButton } from "./EmblaCarouselDotButton";
import "./css/embla.css";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    align: "center",
    containScroll: "trimSnaps",
    duration: 25, // Smoother default duration
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const { selectedIndex } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    []
  );

  // Dynamic background updates with smooth morphing
  useEffect(() => {
    const updateButtonBackgrounds = () => {
      const prevIndex = getPrevSlideIndex();
      const nextIndex = getNextSlideIndex();

      if (prevButtonRef.current) {
        const prevImageUrl = `url(https://picsum.photos/600/350?v=${slides[prevIndex]})`;
        prevButtonRef.current.style.setProperty("--bg-image", prevImageUrl);

        // Create dynamic style rule
        const existingStyle = document.getElementById("prev-button-bg");
        if (existingStyle) existingStyle.remove();

        const style = document.createElement("style");
        style.id = "prev-button-bg";
        style.textContent = `.embla__button--prev::before { background-image: ${prevImageUrl}; }`;
        document.head.appendChild(style);
      }

      if (nextButtonRef.current) {
        const nextImageUrl = `url(https://picsum.photos/600/350?v=${slides[nextIndex]})`;
        nextButtonRef.current.style.setProperty("--bg-image", nextImageUrl);

        // Create dynamic style rule
        const existingStyle = document.getElementById("next-button-bg");
        if (existingStyle) existingStyle.remove();

        const style = document.createElement("style");
        style.id = "next-button-bg";
        style.textContent = `.embla__button--next::before { background-image: ${nextImageUrl}; }`;
        document.head.appendChild(style);
      }
    };

    updateButtonBackgrounds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, slides]);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi, tweenParallax]);

  // Helper functions
  const getPrevSlideIndex = () => {
    return selectedIndex > 0 ? selectedIndex - 1 : slides.length - 1;
  };

  const getNextSlideIndex = () => {
    return selectedIndex < slides.length - 1 ? selectedIndex + 1 : 0;
  };

  // Enhanced click handlers with liquid morphing
  const handlePrevClick = () => {
    if (prevButtonRef.current) {
      // Add morphing animation
      prevButtonRef.current.classList.add(
        "embla__button--morphing",
        "embla__button--pressed"
      );

      setTimeout(() => {
        prevButtonRef.current?.classList.remove("embla__button--morphing");
      }, 800);

      setTimeout(() => {
        prevButtonRef.current?.classList.remove("embla__button--pressed");
      }, 300);
    }
    onPrevButtonClick();
  };

  const handleNextClick = () => {
    if (nextButtonRef.current) {
      // Add morphing animation
      nextButtonRef.current.classList.add(
        "embla__button--morphing",
        "embla__button--pressed"
      );

      setTimeout(() => {
        nextButtonRef.current?.classList.remove("embla__button--morphing");
      }, 800);

      setTimeout(() => {
        nextButtonRef.current?.classList.remove("embla__button--pressed");
      }, 300);
    }
    onNextButtonClick();
  };

  return (
    <div className="embla">
      {/* Navigation layout */}
      <div className="flex items-center justify-center gap-4">
        {/* Previous Slide Snippet */}
        <motion.div
          className="embla__prev-snippet flex-shrink-0"
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3,
          }}
        >
          <div className="embla__snippet">
            <Image
              className="embla__snippet__img"
              src={`https://picsum.photos/600/350?v=${
                slides[getPrevSlideIndex()]
              }`}
              alt="Previous slide preview"
              width={600}
              height={350}
              priority
            />
          </div>
        </motion.div>

        {/* Previous Button */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <PrevButton
            ref={prevButtonRef}
            onClick={handlePrevClick}
            disabled={prevBtnDisabled}
          />
        </motion.div>

        {/* Active Slide */}
        <motion.div
          className="embla__viewport max-w-2xl"
          ref={emblaRef}
          whileHover={{ scale: 1.01 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide embla__slide--single" key={index}>
                <div className="embla__parallax">
                  <div className="embla__parallax__layer">
                    <Image
                      className="embla__slide__img embla__parallax__img"
                      src={`https://picsum.photos/600/350?v=${index}`}
                      alt="Your alt text"
                      width={600}
                      height={350}
                      priority
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div
          className=" flex-shrink-0"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <NextButton
            ref={nextButtonRef}
            onClick={handleNextClick}
            disabled={nextBtnDisabled}
          />
        </motion.div>

        {/* Next Slide Snippet */}
        <motion.div
          className="embla__next-snippet  flex-shrink-0"
          whileHover={{ scale: 1.02, x: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            duration: 0.3,
          }}
        >
          <div className="embla__snippet">
            <Image
              className="embla__snippet__img"
              src={`https://picsum.photos/600/350?v=${
                slides[getNextSlideIndex()]
              }`}
              alt="Next slide preview"
              width={600}
              height={350}
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
