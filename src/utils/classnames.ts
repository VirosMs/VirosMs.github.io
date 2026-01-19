/**
 * Utilidad para combinar clases de Tailwind CSS
 * Permite combinar clases condicionalmente
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
