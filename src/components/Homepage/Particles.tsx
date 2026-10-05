import {useEffect, useRef, useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {useHomepageCopy} from './copy';
import styles from './styles.module.css';

export default function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);
  const {colorMode} = useColorMode();
  const copy = useHomepageCopy();
  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext('2d');
    if (!element || !ctx || !window.IntersectionObserver || !window.ResizeObserver) return;
    const media = window.matchMedia(
      '(min-width: 997px) and (prefers-reduced-motion: no-preference) and (forced-colors: none)',
    );
    let frame = 0,
      visible = false,
      width = 0,
      height = 0,
      last = 0,
      time = 0;
    const particles = Array.from({length: 96}, (_, i) => ({
      phase: (i / 96) * Math.PI * 2,
      lane: i % 3,
      radius: 0.65 + (i % 4) * 0.25,
    }));
    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    }
    function draw(now: number) {
      frame = requestAnimationFrame(draw);
      if (last && now - last < 1000 / 30) return;
      time += last ? Math.min(now - last, 80) / 1000 : 0;
      last = now;
      ctx!.clearRect(0, 0, width, height);
      ctx!.strokeStyle = colorMode === 'dark' ? 'rgba(82,196,208,.12)' : 'rgba(13,100,126,.12)';
      for (let lane = 0; lane < 3; lane++) {
        ctx!.beginPath();
        ctx!.ellipse(
          width * 0.71,
          height * 0.52,
          width * (0.36 + lane * 0.035),
          height * (0.28 + lane * 0.055),
          -0.24,
          0,
          Math.PI * 2,
        );
        ctx!.stroke();
      }
      ctx!.fillStyle = colorMode === 'dark' ? '#5ccee0' : '#247f99';
      for (const p of particles) {
        const angle = p.phase + time * 0.045;
        const x = Math.cos(angle) * width * (0.36 + p.lane * 0.035);
        const y = Math.sin(angle) * height * (0.28 + p.lane * 0.055);
        ctx!.beginPath();
        ctx!.arc(
          width * 0.71 + x * 0.971 + y * 0.238,
          height * 0.52 - x * 0.238 + y * 0.971,
          p.radius,
          0,
          Math.PI * 2,
        );
        ctx!.fill();
      }
    }
    function sync() {
      setAvailable(media.matches);
      const running = media.matches && !paused && visible && !document.hidden;
      element!.dataset.motion = running ? 'running' : 'stopped';
      if (running && !frame) frame = requestAnimationFrame(draw);
      else if (!running) stop();
      if (!media.matches) ctx!.clearRect(0, 0, width, height);
    }
    function resize() {
      const bounds = element!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element!.width = Math.round(width * dpr);
      element!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    }
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    const size = new ResizeObserver(resize);
    intersection.observe(element);
    size.observe(element);
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    resize();
    return () => {
      stop();
      intersection.disconnect();
      size.disconnect();
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused, colorMode]);
  return (
    <>
      <canvas ref={canvas} className={styles.particles} aria-hidden="true" />
      {available && (
        <button
          className={styles.motionButton}
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={!paused}
          aria-label={paused ? copy.play : copy.pause}
        >
          <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {copy.motion}
        </button>
      )}
    </>
  );
}
