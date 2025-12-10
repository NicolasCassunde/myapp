import { motion } from "motion/react";

import { H3 } from "./typography";
import { Logo } from "./logo";
import { TextShimmer } from "./text-shimmer";

interface LoaderProps {
  title?: string;
  shimmerText?: string;
}

export function Loader({
  title = "Loading your data",
  shimmerText = "This won’t take long",
}: LoaderProps) {
  const icons = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          {" "}
          <path
            fill="#A509FF"
            d="m13.3 8.11 1.32 2.64c.18.36.66.72 1.06.78l2.39.4c1.53.26 1.89 1.36.79 2.46L17 16.25c-.31.31-.49.92-.39 1.36l.53 2.31c.42 1.82-.55 2.53-2.16 1.58l-2.24-1.33c-.41-.24-1.07-.24-1.48 0L9.02 21.5c-1.61.95-2.58.24-2.16-1.58l.53-2.31c.1-.43-.08-1.04-.39-1.36l-1.86-1.86c-1.1-1.1-.74-2.21.79-2.46l2.39-.4c.4-.07.88-.42 1.06-.78l1.32-2.64c.71-1.43 1.89-1.43 2.6 0"
          ></path>{" "}
          <path
            stroke="#A509FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6 9V2M18 9V2M12 4V2"
          ></path>{" "}
        </svg>
      ),
      rotate: 0,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="19"
          fill="none"
          viewBox="0 0 21 19"
        >
          {" "}
          <path
            fill="#FF0909"
            d="M9.08 18.784c-.355.06-.907-.038-1.22-.215C5.174 17.09-.49 11.898.726 5.004 1.263 1.961 4.149-.069 7.173.464a5.52 5.52 0 0 1 3.983 2.977 5.53 5.53 0 0 1 4.762-1.434c3.023.533 5.041 3.427 4.505 6.47-1.216 6.894-8.314 9.836-11.342 10.307"
          ></path>{" "}
        </svg>
      ),
      rotate: -10,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 30 30"
        >
          {" "}
          <g clipPath="url(#a)">
            {" "}
            <path
              fill="#FB09FF"
              d="m10.643 21.597.388-1.449-4.83-1.294a1.96 1.96 0 0 1-1.209-.935 1.96 1.96 0 0 1-.205-1.515 2.014 2.014 0 0 1 2.263-1.453c.061.006.119.021.187.04l14.488 3.882c.068.018.126.033.181.058.454.163.805.475 1.029.876.292.493.357 1.1.148 1.686-.358.991-1.475 1.49-2.5 1.215l-4.722-1.266-.389 1.45a2.5 2.5 0 0 1-4.83-1.295"
            ></path>{" "}
            <path
              fill="#FB09FF"
              d="m24.624 10.642-2.718 8.29c-.055-.026-.113-.041-.18-.06L7.235 14.99a1 1 0 0 0-.186-.04l1.79-8.537a2.996 2.996 0 0 1 3.733-2.416L22.6 6.684a2.996 2.996 0 0 1 2.024 3.958"
            ></path>{" "}
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m13.713 4.303-1.294 4.83M17.588 5.34l-.518 1.933"
            ></path>{" "}
          </g>{" "}
          <defs>
            {" "}
            <clipPath id="a">
              {" "}
              <path
                fill="#fff"
                d="m6.514.303 23.182 6.211-6.212 23.183L.302 23.485z"
              ></path>{" "}
            </clipPath>{" "}
          </defs>{" "}
        </svg>
      ),
      rotate: -15,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 32 32"
        >
          {" "}
          <path
            fill="#FFD209"
            d="m25.612 17.838-2.35 3.593c-2.025 3.105-4.084 3.909-6.913 2.56a10.5 10.5 0 0 1-1.43-.808l-1.442-.95c-3.58-2.357-4.088-4.734-1.737-8.327l2.354-3.602c.479-.73.957-1.343 1.448-1.814 1.927-1.874 4.02-1.804 6.888.08l1.435.938c3.603 2.354 4.097 4.737 1.747 8.33"
          ></path>{" "}
          <path
            fill="#FFD209"
            d="M16.347 23.991c-.726.183-1.579.245-2.577.211l-1.663-.052c-4.168-.155-5.766-1.875-5.62-6.047l.148-4.15c.155-4.168 1.869-5.778 6.037-5.623l1.663.051c.43.018.834.048 1.205.11-.49.47-.969 1.083-1.448 1.814l-2.354 3.602c-2.35 3.592-1.842 5.97 1.738 8.326l1.441.95q.746.495 1.43.808"
          ></path>{" "}
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m17.79 12.959 4.136 2.814M15.543 16.26l2.472 1.687"
          ></path>{" "}
        </svg>
      ),
      rotate: -20,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 28 28"
        >
          {" "}
          <path
            fill="#FF9409"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M24.96 7.668c-2.183 3.514-6.89 7.984-10.521 9.974l-2.214 1.214a3.6 3.6 0 0 1-.847.308c.032-.178.056-.376.06-.569.037-.846-.201-1.68-.745-2.456-.551-.788-1.3-1.326-2.117-1.582-.196-.045-.389-.099-.59-.114.163-.286.38-.542.629-.742l1.878-1.67C13.595 9.3 19.43 6.389 23.467 5.547c.619-.114 1.152.142 1.443.57.31.43.388 1.022.05 1.552"
          ></path>{" "}
          <path
            fill="#FF9409"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M11.379 19.164a4.17 4.17 0 0 1-1.704 2.695c-.707.494-1.597.764-2.595.72l-2.47-.161a2.114 2.114 0 0 1-1.886-2.719l.693-2.376c.617-2.115 2.662-3.176 4.58-2.878.198.025.403.07.589.114a4.03 4.03 0 0 1 2.117 1.582c.544.776.782 1.61.745 2.456-.023.189-.037.38-.07.567"
          ></path>{" "}
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15.677 16.723a4.733 4.733 0 0 0-3.837-5.48"
          ></path>{" "}
        </svg>
      ),
      rotate: -10,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 30 30"
        >
          {" "}
          <path
            fill="#0976FF"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m12.026 8.322 8.933-.536c4.01-.24 5.47 2.304 3.267 5.659l-4.93 7.468c-3.314 5.023-6.327 4.216-6.685-1.791l-.159-2.652-2.217-1.463c-5.023-3.314-4.218-6.318 1.791-6.685"
          ></path>{" "}
          <path fill="#0976FF" d="m12.747 16.104 4.387-2.54z"></path>{" "}
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m12.747 16.104 4.387-2.54"
          ></path>{" "}
        </svg>
      ),
      rotate: -15,
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="none"
          viewBox="0 0 32 32"
        >
          {" "}
          <path
            fill="#2BE622"
            d="m25.704 18.574 1.436-3.947c1.197-3.289.36-5.083-2.929-6.28L20.265 6.91c-3.29-1.197-5.084-.36-6.28 2.929l-.377 1.034 2.913 1.06c3.289 1.197 4.126 2.991 2.929 6.28l-1.06 2.913 1.033.377c3.289 1.197 5.083.36 6.28-2.93"
          ></path>{" "}
          <path
            fill="#2BE622"
            d="m18.012 22.16 1.436-3.947c1.198-3.289.36-5.083-2.928-6.28l-3.947-1.437c-3.289-1.197-5.083-.36-6.28 2.929l-1.437 3.947c-1.197 3.288-.36 5.083 2.929 6.28l3.947 1.436c3.289 1.197 5.083.36 6.28-2.928"
          ></path>{" "}
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m9.41 16.794 1.165 2.5 4.989-2.335"
          ></path>{" "}
        </svg>
      ),
      rotate: -20,
    },
  ];
  const radius = 80;
  const center = radius;

  return (
    <div className="flex items-center justify-center h-screen relative flex-col w-full">
      <div className="w-40 h-40 relative flex items-center justify-center">
        <motion.div
          className="absolute w-full h-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: [0.785, 0.135, 0.15, 0.86],
            duration: 3,
          }}
        >
          {icons.map((icon, index) => {
            const angle = (index / icons.length) * 2 * Math.PI - Math.PI / 2;
            const x = center + radius * Math.cos(angle) - 15;
            const y = center + radius * Math.sin(angle) - 15;
            return (
              <motion.div
                key={index}
                className="absolute w-8 h-8"
                style={{ left: x, top: y }}
                animate={{ rotate: icon.rotate }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                {icon.svg}
              </motion.div>
            );
          })}
        </motion.div>
        <Logo />
      </div>
      <H3 className="mt-6">{title}</H3>
      <TextShimmer>{shimmerText}</TextShimmer>
    </div>
  );
}
