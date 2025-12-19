"use client";

import { useState, useEffect } from "react";

export const useAutoSlide = (
  itemCount: number,
  interval: number = 5000
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (itemCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % itemCount);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  const goTo = (index: number) => setCurrentIndex(index);

  return { currentIndex, next, prev, goTo };
};

