import { IconArrowLeftRhombus } from "@tabler/icons-react";
import { clsx } from "clsx";
import { uniqueId } from "lodash-es";
import { useMemo } from "react";
import { describeArc } from "../../../tools/svg.js";
import styles from "./arcProgress.module.css";
import useProgressAnimation from "./useProgressAnimations.js";

export default function ArcProgress({
  className,
  progress,
  text,
  strokeWidth = 2,
  colors = ["#eb5757", "#f2c94c", "#2f80ed", "#6fcf97"],
  segments = 4,
  children,
  ...props
}) {
  // calculate percentage
  const percentage = useMemo(
    () => 100 * (progress[0] / progress[1]),
    [progress]
  );
  const animeId = useMemo(() => uniqueId(), []);
  const angles = useMemo(() => {
    const value = [];
    const parts = Array.from<number>({ length: segments }).fill(100 / segments);
    let startAngle = -90;
    for (let index = 0; index < parts.length; index++) {
      const part = parts[index];
      const nextAngle = startAngle + (180 * part) / 100;
      const endAngle = index === parts.length - 1 ? nextAngle : nextAngle - 7.5;
      value.push([startAngle, endAngle]);
      startAngle = nextAngle;
    }
    return value;
  }, [segments]);

  /*#__PURE__*/ useProgressAnimation(percentage, animeId);

  return (
    <div className={clsx(styles.root, className)} {...props}>
      <svg className={styles.svg} viewBox="0 0 100 50">
        {angles.map(([startAngle, endAngle], index) => (
          <path
            d={describeArc(
              50,
              50 - strokeWidth,
              50 - strokeWidth * 2,
              startAngle,
              endAngle
            )}
            fill="none"
            key={index}
            stroke={colors[index] || "#000"}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
      <div
        id={`anime_indicator__${animeId}`}
        className={clsx(styles.indicator)}
      >
        <IconArrowLeftRhombus />
      </div>
      <div className={styles.content}>
        <div id={`anime_text__${animeId}`} className={clsx(styles.text)}>
          {text || percentage}
        </div>
        {children}
      </div>
    </div>
  );
}
