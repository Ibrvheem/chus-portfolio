"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
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
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

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
          tweenNode.style.transform = `translateX(${translate}%)`;
        });
      });
    },
    []
  );

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
  }, [emblaApi, tweenParallax]);

  // Helper function to get the previous slide index
  const getPrevSlideIndex = () => {
    return selectedIndex > 0 ? selectedIndex - 1 : slides.length - 1;
  };

  // Helper function to get the next slide index
  const getNextSlideIndex = () => {
    return selectedIndex < slides.length - 1 ? selectedIndex + 1 : 0;
  };

  // Animation variants
  const snippetVariants = {
    initial: { scale: 0.8, opacity: 0, x: 20 },
    animate: { scale: 1, opacity: 0.6, x: 0 },
    hover: { scale: 1.05, opacity: 0.8 },
    exit: { scale: 0.8, opacity: 0, x: -20 },
  };

  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
  };

  const slideVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  };

  return (
    <motion.div
      className="embla"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Navigation layout */}
      <div className="flex items-center justify-center gap-4">
        {/* Previous Slide Snippet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`prev-${getPrevSlideIndex()}`}
            className="embla__prev-snippet flex-shrink-0"
            variants={snippetVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="embla__snippet">
              <motion.img
                className="embla__snippet__img"
                src={`https://picsum.photos/600/350?v=${
                  slides[getPrevSlideIndex()]
                }`}
                alt="Previous slide preview"
                layoutId={`snippet-prev-${getPrevSlideIndex()}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous Button */}
        <motion.div
          className="flex-shrink-0"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        </motion.div>

        {/* Active Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            className="embla__viewport max-w-2xl"
            ref={emblaRef}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="embla__container">
              {slides.map((index) => (
                <div className="embla__slide embla__slide--single" key={index}>
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <motion.img
                        className="embla__slide__img embla__parallax__img"
                        src={`https://picsum.photos/600/350?v=${index}`}
                        alt="Your alt text"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <motion.div
          className="flex-shrink-0"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          whileTap="tap"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
        >
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </motion.div>

        {/* Next Slide Snippet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`next-${getNextSlideIndex()}`}
            className="embla__next-snippet flex-shrink-0"
            variants={snippetVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="embla__snippet">
              <motion.img
                className="embla__snippet__img"
                src={`https://picsum.photos/600/350?v=${
                  slides[getNextSlideIndex()]
                }`}
                alt="Next slide preview"
                layoutId={`snippet-next-${getNextSlideIndex()}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <motion.div
        className="embla__dots justify-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {scrollSnaps.map((_, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <DotButton
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EmblaCarousel;
