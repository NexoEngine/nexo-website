import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes with clsx behavior', () => {
    expect(cn('base', 'conditional-true', false)).toBe('base conditional-true');
  });

  it('should override conflicting classes with tailwind-merge behavior', () => {
    expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
    expect(cn('p-4', 'px-2 py-2')).toBe('p-4 px-2 py-2');
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle various input types (arrays, objects)', () => {
    expect(cn(['arr-class1', 'arr-class2'], { 'obj-class-true': true, 'obj-class-false': false })).toBe('arr-class1 arr-class2 obj-class-true');
  });

  it('should return empty string for no inputs or all falsy inputs', () => {
    expect(cn()).toBe('');
    expect(cn(null, undefined, false)).toBe('');
  });
}); 