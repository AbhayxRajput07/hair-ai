import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export { Card, CardContent };