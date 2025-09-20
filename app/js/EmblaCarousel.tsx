"use client";
import React, { useCallback, useEffect, useRef } from "react";
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
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

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

  // Update button backgrounds and trigger smooth slide animation
  useEffect(() => {
    const updateButtonBackgrounds = () => {
      const prevIndex = getPrevSlideIndex();
      const nextIndex = getNextSlideIndex();

      if (prevButtonRef.current) {
        const prevImageUrl = `url(https://picsum.photos/600/350?v=${slides[prevIndex]})`;
        prevButtonRef.current.style.setProperty("--bg-image", prevImageUrl);

        // Set the background on the pseudo-element
        const sheet = document.styleSheets[0];
        const rule = `.embla__button--prev::before { background-image: ${prevImageUrl}; }`;
        try {
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          // Rule might already exist, that's okay
        }
      }

      if (nextButtonRef.current) {
        const nextImageUrl = `url(https://picsum.photos/600/350?v=${slides[nextIndex]})`;
        nextButtonRef.current.style.setProperty("--bg-image", nextImageUrl);

        // Set the background on the pseudo-element
        const sheet = document.styleSheets[0];
        const rule = `.embla__button--next::before { background-image: ${nextImageUrl}; }`;
        try {
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          // Rule might already exist, that's okay
        }
      }
    };

    updateButtonBackgrounds();
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
  }, [emblaApi, tweenParallax]);

  // Helper function to get the previous slide index
  const getPrevSlideIndex = () => {
    return selectedIndex > 0 ? selectedIndex - 1 : slides.length - 1;
  };

  // Helper function to get the next slide index
  const getNextSlideIndex = () => {
    return selectedIndex < slides.length - 1 ? selectedIndex + 1 : 0;
  };

  // Enhanced click handlers with smooth slide animation
  const handlePrevClick = () => {
    if (prevButtonRef.current) {
      prevButtonRef.current.classList.add(
        "embla__button--sliding",
        "embla__button--prev"
      );
      setTimeout(() => {
        prevButtonRef.current?.classList.remove("embla__button--sliding");
      }, 800);
    }
    onPrevButtonClick();
  };

  const handleNextClick = () => {
    if (nextButtonRef.current) {
      nextButtonRef.current.classList.add(
        "embla__button--sliding",
        "embla__button--next"
      );
      setTimeout(() => {
        nextButtonRef.current?.classList.remove("embla__button--sliding");
      }, 800);
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
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="embla__snippet">
            <img
              className="embla__snippet__img"
              src={`https://picsum.photos/600/350?v=${
                slides[getPrevSlideIndex()]
              }`}
              alt="Previous slide preview"
            />
          </div>
        </motion.div>

        {/* Previous Button */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <PrevButton
            ref={prevButtonRef}
            onClick={handlePrevClick}
            disabled={prevBtnDisabled}
          />
        </motion.div>

        {/* Active Slide */}
        <div className="embla__viewport max-w-2xl" ref={emblaRef}>
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
        </div>

        {/* Next Button */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <NextButton
            ref={nextButtonRef}
            onClick={handleNextClick}
            disabled={nextBtnDisabled}
          />
        </motion.div>

        {/* Next Slide Snippet */}
        <motion.div
          className="embla__next-snippet flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="embla__snippet">
            <img
              className="embla__snippet__img"
              src={`https://picsum.photos/600/350?v=${
                slides[getNextSlideIndex()]
              }`}
              alt="Next slide preview"
            />
          </div>
        </motion.div>
      </div>

      {/* Dots Navigation */}
      <div className="embla__dots justify-center mt-6">
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
      </div>
    </div>
  );
};

export default EmblaCarousel;
