export function Avatar({ src, alt }: { src?: string; alt?: string }) {
  return (
    <img
      src={src || "/vercel.svg"}
      alt={alt || "avatar"}
      className="h-10 w-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
    />
  );
}


