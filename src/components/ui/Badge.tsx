import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { componentVariants } from "@/lib/design-system";
import { Difficulty } from "@/types";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | keyof typeof componentVariants.badge.variants
    | Difficulty
    | "default";
  size?: keyof typeof componentVariants.badge.sizes;
  dot?: boolean;
}

/**
 * Badge Component
 * Displays status, difficulty, or category labels
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClass =
      componentVariants.badge.variants[
        variant as keyof typeof componentVariants.badge.variants
      ] || componentVariants.badge.variants.default;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border font-medium",
          "transition-colors duration-200",
          componentVariants.badge.sizes[size],
          variantClass,
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className="h-1.5 w-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Difficulty-specific badge with icon
export interface DifficultyBadgeProps extends Omit<BadgeProps, "variant"> {
  difficulty: Difficulty;
}

export const DifficultyBadge = forwardRef<HTMLSpanElement, DifficultyBadgeProps>(
  ({ difficulty, ...props }, ref) => {
    const icons = {
      Easy: (
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      Medium: (
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      Hard: (
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    return (
      <Badge ref={ref} variant={difficulty} {...props}>
        {icons[difficulty]}
        {difficulty}
      </Badge>
    );
  }
);

DifficultyBadge.displayName = "DifficultyBadge";
