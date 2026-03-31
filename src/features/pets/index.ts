// features/pets/index.ts

/**
 * API Pública de la Feature "Pets"
 * ---------------------------------
 * Este archivo define qué partes de la feature son accesibles
 * para el resto de la aplicación.
 */

// 1. El componente principal de la página.
//    Este es el único componente que el router de la aplicación necesita conocer.
export { PetsViewContent } from './view/PetsView';

// 2. El proveedor de contexto.
//    Se exporta principalmente para poder usarlo en entornos de prueba (como Storybook o Jest)
//    donde necesitemos envolver componentes de forma aislada.
export { usePetsStore } from '@/store/PetStore';

// 3. Los tipos de datos.
//    Exportamos todos los tipos para que otras features (ej. Bookings) puedan
//    entender y trabajar con la estructura de datos de las mascotas.
export * from './types';
