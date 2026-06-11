"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

const HERO_NAME = "Rafa Soelistiono";

export default function ScrambleHero() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrambleTextPlugin);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const headline = rootRef.current?.querySelector(".scramble-name");

      if (prefersReducedMotion) {
        if (headline) headline.textContent = HERO_NAME;
        gsap.set([".scramble-abstract", ".scramble-summary", ".scramble-cta"], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });

      timeline
        .fromTo(
          ".abstract-track",
          { autoAlpha: 0, scaleX: 0 },
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.92,
            stagger: 0.09,
          },
        )
        .fromTo(
          ".abstract-node",
          { autoAlpha: 0, scale: 0.2 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.68,
            stagger: 0.08,
          },
          "-=0.55",
        )
        .to(
          headline,
          {
            duration: 4.2,
            scrambleText: {
              text: HERO_NAME,
              chars: "upperAndLowerCase",
              speed: 0.14,
              revealDelay: 0.78,
              delimiter: "",
            },
          },
          "-=0.25",
        )
        .fromTo(
          ".scramble-summary",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.72 },
          "-=0.55",
        )
        .fromTo(
          ".scramble-cta",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
          "-=0.42",
        );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div className="scramble-hero-layout" ref={rootRef}>
      <div className="scramble-hero-main">
        <div className="scramble-abstract" aria-hidden="true">
          <span className="abstract-track abstract-track-long" />
          <span className="abstract-track abstract-track-mid" />
          <span className="abstract-node abstract-node-a" />
          <span className="abstract-track abstract-track-short" />
          <span className="abstract-node abstract-node-b" />
        </div>
        <h1 className="scramble-headline" id="hero-title">
          <span className="scramble-name">{HERO_NAME}</span>
        </h1>
        <p className="scramble-summary">
          Computer Science student at Universitas Indonesia focused on backend systems, full-stack
          delivery, CI/CD-enabled teamwork, and robotics experiments.
        </p>
        <a className="text-link scramble-cta" href="/contact">
          Start a conversation
        </a>
      </div>
    </div>
  );
}
