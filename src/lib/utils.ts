import { ClassValue, clsx } from "clsx";

/**
 * Merges class names with clsx.
 * @param inputs List of class values (strings, objects, arrays)
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}
