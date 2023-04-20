import anime from "animejs";
import { useEffect } from "react";

export default function useProgressAnimation(percentage, animeId) {
  useEffect(() => {
    const animeProps = {
      delay: 1000,
      duration: 3000,
    };
    anime({
      rotateZ: [0, (180 * percentage) / 100],
      targets: `#anime_indicator__${animeId}`,
      ...animeProps,
    });
    anime({
      round: 1,
      targets: `#anime_text__${animeId}`,
      textContent: [0, percentage],
      ...animeProps,
      easing: "easeOutElastic(1, 2)",
    });
  }, [percentage, animeId]);
  return null;
}
