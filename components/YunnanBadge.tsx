interface YunnanBadgeProps {
  text: string;
}

export default function YunnanBadge({ text }: YunnanBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" />
      </svg>
      {text}
    </span>
  );
}
