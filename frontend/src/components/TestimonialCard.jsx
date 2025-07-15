import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function TestimonialCard({
  text,
  author,
  company,
  rating = 5,
  result
}) {
  return (
    <div className="bg-gray-50 border-l-4 border-success rounded-r-xl p-6 transition-all duration-300 hover:shadow-card">
      {/* Estrellas */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-warning' : 'text-gray-200'}`}
          />
        ))}
      </div>

      {/* Testimonio */}
      <blockquote className="text-gray-600 italic mb-4">
        "{text}"
      </blockquote>

      {/* Autor */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-primary-dark">
            {author}
          </div>
          <div className="text-sm text-gray-600">
            {company}
          </div>
        </div>

        {/* Resultado */}
        {result && (
          <div className="bg-success/10 text-success font-semibold px-3 py-1 rounded-full text-sm">
            {result}
          </div>
        )}
      </div>
    </div>
  );
} 