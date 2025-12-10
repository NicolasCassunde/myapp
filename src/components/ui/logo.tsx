import { motion, SVGMotionProps } from "motion/react";

interface LogoProps extends Omit<
  SVGMotionProps<SVGSVGElement>,
  "initial" | "animate" | "transition"
> {
  variant?: "blue" | "orange" | "green" | "purple" | "pink";
  blinking?: boolean;
  delay?: number;
}

function LogoBase({
  variant = "blue",
  blinking = false,
  delay = 0,
  className,
  ...props
}: LogoProps) {
  const colors: Record<string, string> = {
    blue: "var(--color-primary)",
    orange: "#FF7809",
    green: "#2EFF09",
    purple: "#A009FF",
    pink: "#FF09C1",
  };

  const fillColor = colors[variant] || colors.blue;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Camada 1"
      viewBox="0 0 56 44.33"
      className={className}
      width={props.width || 56}
      height={props.height || 44.33}
      {...props}
    >
      <path
        fill={fillColor}
        fillRule="evenodd"
        d="M28.26.02c-2.39.09-5.13.49-6.55.95C11.65 4.23 3.46 13.26.74 24.09c-1.8 7.17-.22 14.68 3.76 17.92 2.07 1.69 5.47 2.6 8.34 2.25 4.53-.56 7.95-3.36 10.6-8.71l.36-.72-.02.22c-.31 3.44 1.43 6.71 4.33 8.13 4.71 2.3 10.58-.31 12.83-5.7l.13-.31.02.33c.15 2.84 1.84 4.77 4.57 5.21 9.01 1.47 13.55-14.77 7.79-27.89-2.16-4.92-5.89-9.3-9.66-11.33C39.31 1.06 33.7-.19 28.26.02"
      ></path>
      <motion.path
        fill="#fff"
        animate={{
          x: [0, -1, 1, 0],
          scaleY: [1, 1, 1, 0.1, 1],
        }}
        transition={{
          x: {
            duration: 1.5,
            times: [0, 0.3, 0.6, 1],
            ease: [0.23, 1, 0.32, 1],
            repeat: Infinity,
            repeatDelay: 2,
            bounce: 0,
          },
          scaleY: {
            duration: 0.3,
            delay: 1.2,
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 3,
            bounce: 0,
          },
        }}
        d="M46.51 15.11c1.39 2.14 1.43 4.58.09 5.45s-3.56-.15-4.95-2.29-1.43-4.58-.09-5.45 3.56.15 4.95 2.29M36.33 13.84c1.39 2.14 1.43 4.58.09 5.45s-3.56-.15-4.95-2.29-1.43-4.58-.09-5.45 3.56.15 4.95 2.29"
      ></motion.path>
    </motion.svg>
  );
}

export const Logo = motion.create(LogoBase);
