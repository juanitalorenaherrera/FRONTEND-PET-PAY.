
/**
 * Define la estructura de un objeto de usuario en toda la aplicación.
 * Esta es la fuente única de verdad para este tipo de dato.
 */
export interface User {
  id: string | number; // Usamos el tipo más flexible para ser compatible con la API
  name: string;
  email: string;
  role: 'owner' | 'sitter' | 'admin';
  token: string;
  accountId: number;
}
