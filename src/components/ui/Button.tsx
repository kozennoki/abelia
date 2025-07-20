import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function Button({ 
  href, 
  children, 
  className = '' 
}: ButtonProps) {
  const baseClasses = "bg-primary hover:bg-white text-white hover:text-primary font-medium py-4 px-12 rounded-lg transition-colors duration-500 w-full max-w-xs text-center border border-primary";
  
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  );
}