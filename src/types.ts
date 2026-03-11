export interface Contact {
  id: string;
  name: string;
  department: string;
  status: 'online' | 'offline' | 'busy';
  avatar: string;
}

export type Category = 'Tutti' | 'Interni' | 'Condivisi' | 'Personali' | 'Preferiti';

export type NavItem = 'Contatti' | 'Recenti' | 'Meeting' | 'Code' | 'Impostazioni';
