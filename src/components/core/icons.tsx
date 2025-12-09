import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";

export function PendingIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "16px"}
      height={props.size || "16px"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M4.988 3.711a.749.749 0 0 1-.417-1.374A7.9 7.9 0 0 1 7.455 1.15a.75.75 0 0 1 .287 1.472 6.4 6.4 0 0 0-2.339.962.75.75 0 0 1-.415.126ZM1.88 8.381a.75.75 0 0 1-.738-.891 7.9 7.9 0 0 1 1.204-2.933.75.75 0 1 1 1.246.834 6.5 6.5 0 0 0-.978 2.381.75.75 0 0 1-.735.609ZM7.6 16.864a.7.7 0 0 1-.145-.014 7.9 7.9 0 0 1-2.884-1.187.75.75 0 1 1 .832-1.248 6.4 6.4 0 0 0 2.339.962.75.75 0 0 1-.142 1.486ZM2.971 13.776a.75.75 0 0 1-.624-.333 7.9 7.9 0 0 1-1.204-2.933.75.75 0 1 1 1.473-.282c.164.855.493 1.656.978 2.381a.75.75 0 0 1-.622 1.167ZM13.012 3.711a.75.75 0 0 1-.415-.126 6.4 6.4 0 0 0-2.339-.962c-.406-.079-.672-.473-.593-.879s.475-.668.88-.593a7.9 7.9 0 0 1 2.884 1.187.75.75 0 0 1-.417 1.374ZM16.12 8.381a.75.75 0 0 1-.735-.609 6.4 6.4 0 0 0-.978-2.381.75.75 0 1 1 1.246-.834 7.9 7.9 0 0 1 1.204 2.933.75.75 0 0 1-.738.891ZM10.4 16.864a.75.75 0 0 1-.142-1.486 6.4 6.4 0 0 0 2.339-.962.749.749 0 1 1 .832 1.248 7.9 7.9 0 0 1-2.884 1.187 1 1 0 0 1-.145.014ZM15.029 13.776a.75.75 0 0 1-.622-1.167 6.5 6.5 0 0 0 .978-2.381.75.75 0 1 1 1.473.282 7.9 7.9 0 0 1-1.204 2.933.75.75 0 0 1-.624.333Z"></path>
      </g>
    </svg>
  );
}

export function ReviewingIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8M9 2.5C5.416 2.5 2.5 5.416 2.5 9s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5S12.584 2.5 9 2.5"
      ></path>
    </svg>
  );
}

export function PlannedIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M9 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8M9 2.5C5.416 2.5 2.5 5.416 2.5 9s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5S12.584 2.5 9 2.5"></path>
        <path d="M12.25 12a.74.74 0 0 1-.427-.133l-3.25-2.25A.75.75 0 0 1 8.25 9V4.75a.75.75 0 0 1 1.5 0v3.857l2.927 2.026A.75.75 0 0 1 12.249 12"></path>
      </g>
    </svg>
  );
}

export function InProgressIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <g fill="currentColor">
        <path d="M9 17c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8M9 2.5C5.416 2.5 2.5 5.416 2.5 9s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5S12.584 2.5 9 2.5"></path>
        <path d="M9.294 4.027a.75.75 0 0 0-.794.748V8.94l-2.758 2.758a.75.75 0 0 0 .043 1.1A4.96 4.96 0 0 0 9 14c2.757 0 5-2.243 5-5 0-2.632-2.067-4.816-4.706-4.973Z"></path>
      </g>
    </svg>
  );
}

export function CompletedIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 1C4.589 1 1 4.589 1 9s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m3.843 5.708-4.25 5.5a.75.75 0 0 1-.565.291H8a.75.75 0 0 1-.558-.248l-2.25-2.5a.751.751 0 0 1 1.116-1.004l1.648 1.832 3.701-4.789a.75.75 0 0 1 1.187.917Z"
      ></path>
    </svg>
  );
}

export function ClosedIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 1C4.589 1 1 4.589 1 9s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m3.28 10.22a.75.75 0 0 1-1.06 1.061L9 10.061l-2.22 2.22a.75.75 0 0 1-1.06 0 .75.75 0 0 1 0-1.061L7.94 9 5.72 6.78a.75.75 0 1 1 1.061-1.061l2.22 2.22 2.22-2.22a.75.75 0 1 1 1.061 1.061L10.062 9l2.22 2.22Z"
      ></path>
    </svg>
  );
}

export function CalendarIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5"
      ></path>
      <path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.695 13.7h.009M15.695 16.7h.009M11.996 13.7h.008M11.996 16.7h.008M8.294 13.7h.01M8.294 16.7h.01"
      ></path>
    </svg>
  );
}

export function TrashIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5q-2.97 0-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
      ></path>
    </svg>
  );
}

export function CommentIcon({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m18.47 16.83.39 3.16c.1.83-.79 1.41-1.5.98l-4.19-2.49q-.69 0-1.35-.09A4.86 4.86 0 0 0 13 15.23c0-2.84-2.46-5.14-5.5-5.14-1.16 0-2.23.33-3.12.91-.03-.25-.04-.5-.04-.76C4.34 5.69 8.29 2 13.17 2S22 5.69 22 10.24c0 2.7-1.39 5.09-3.53 6.59"
      ></path>
      <path
        stroke="#292D32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13 15.23c0 1.19-.44 2.29-1.18 3.16-.99 1.2-2.56 1.97-4.32 1.97l-2.61 1.55c-.44.27-1-.1-.94-.61l.25-1.97C2.86 18.4 2 16.91 2 15.23c0-1.76.94-3.31 2.38-4.23.89-.58 1.96-.91 3.12-.91 3.04 0 5.5 2.3 5.5 5.14"
      ></path>
    </svg>
  );
}

export function ReactionEmoji({ ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "1em"}
      height={props.size || "1em"}
      strokeWidth={props.strokeWidth || "2.5"}
      className={cn("h-full w-full", props.className)}
      viewBox="0 0 16 16"
    >
      <path d="M8 1a7 7 0 0 1 7 7 .75.75 0 0 1-1.5 0A5.5 5.5 0 1 0 8 13.5.75.75 0 0 1 8 15 7 7 0 1 1 8 1m4.25 8.5a.75.75 0 0 1 .743.648l.007.102v1.249l1.25.001a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.648.743L14.25 13 13 12.999v1.251a.75.75 0 0 1-1.493.102l-.007-.102v-1.251L10.25 13a.75.75 0 0 1-.743-.648L9.5 12.25a.75.75 0 0 1 .648-.743l.102-.007 1.25-.001V10.25a.75.75 0 0 1 .75-.75M10.475 8a.5.5 0 0 1 .497.553Q10.711 11 8.016 11q-2.692 0-2.982-2.441a.5.5 0 0 1 .438-.556l.03-.002zM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2m4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
    </svg>
  );
}
