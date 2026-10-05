import type {ClientModule} from '@docusaurus/types';

let entrance: Animation | undefined;
let removeMediaListeners: (() => void) | undefined;
let cancelDeparture: (() => void) | undefined;
const motionAllowed = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)').matches;

function content() {
  return document.querySelector<HTMLElement>('.theme-layout-main');
}

const routeMotion: ClientModule = {
  onRouteUpdate({location, previousLocation}) {
    if (!previousLocation || previousLocation.pathname === location.pathname) return undefined;
    entrance?.cancel();
    removeMediaListeners?.();
    cancelDeparture?.();
    const element = content();
    if (!element?.animate || !motionAllowed()) return undefined;
    // Docusaurus retains the old page while preloading. Never hide it completely
    // or hold up navigation, including when a request is slow or fails.
    const exit = element.animate([{opacity: 1}, {opacity: 0.72}], {
      duration: 140,
      easing: 'ease-out',
      fill: 'forwards',
    });
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)');
    const cancel = () => {
      if (media.matches) exit.cancel();
    };
    media.addEventListener('change', cancel);
    const cleanup = () => {
      exit.cancel();
      media.removeEventListener('change', cancel);
    };
    cancelDeparture = cleanup;
    return cleanup;
  },
  onRouteDidUpdate({location, previousLocation}) {
    if (!previousLocation || previousLocation.pathname === location.pathname) return;
    cancelDeparture?.();
    const element = content();
    if (!element?.animate || !motionAllowed()) return;
    entrance = element.animate(
      [
        {opacity: 0.35, transform: 'translateY(8px)'},
        {opacity: 1, transform: 'none'},
      ],
      {duration: 280, easing: 'cubic-bezier(.2,.75,.25,1)'},
    );
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (forced-colors: active)');
    const cancel = () => {
      if (media.matches) entrance?.cancel();
    };
    media.addEventListener('change', cancel);
    removeMediaListeners = () => media.removeEventListener('change', cancel);
    entrance.finished.then(removeMediaListeners, removeMediaListeners);
  },
};
export default routeMotion;
