// components/Breadcrumb.tsx
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  logo?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex gap-1 items-center bg-primary p-3 text-white rounded-lg">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} legacyBehavior>
                <a className="flex items-center text-white hover:text-gray-200">
                  {item.logo && (
                    <span className="mr-2">
                      {item.logo}
                    </span>
                  )}
                  {item.label}
                </a>
              </Link>
            ) : (
              <span className="flex items-center text-gray-200">
                {item.logo && <span className="mr-2">{item.logo}</span>}
                {item.label}
              </span>
            )}
            {/* Render the separator only if it's not the last breadcrumb item */}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// The separator that will only show between breadcrumb items
const BreadcrumbSeparator = () => <span className="mx-2 text-gray-200">/</span>;

export default Breadcrumb;
