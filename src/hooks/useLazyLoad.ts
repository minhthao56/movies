import { useEffect, useRef, useState } from "react";

export default function useLazyLoad({ threshold }: { threshold: number }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const ref = useRef(null);

  useEffect(() => {
    const lazyObserver = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries?.[0]?.isIntersecting;
        setIsVisible(isIntersecting);
        if (isIntersecting) lazyObserver.unobserve(entries[0].target);
      },
      { threshold }
    );
    if (ref.current) lazyObserver.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current && lazyObserver.unobserve(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isVisible, ref };
}
