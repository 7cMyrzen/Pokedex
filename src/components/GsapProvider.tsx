"use client";

import { ReactNode, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function GsapProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Enregistrer les plugins GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Configuration globale de GSAP
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    return () => {
      // Nettoyer les instances ScrollTrigger au démontage
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, []);

  return <>{children}</>;
}
