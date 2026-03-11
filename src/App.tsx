import React, { useState, useMemo } from 'react';
import { 
  Users, 
  History, 
  Video, 
  ListOrdered, 
  Settings, 
  Search, 
  Grid3X3, 
  Info, 
  Star, 
  Plus, 
  RefreshCw,
  MessageSquare,
  Phone,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact, Category, NavItem } from './types';

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Aaron Copland', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=aaron' },
  { id: '2', name: 'Alban Berg', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alban' },
  { id: '3', name: 'Amy Beach', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=amy' },
  { id: '4', name: 'Barbara Strozzi', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=barbara' },
  { id: '5', name: 'Benjamin Britten', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=benjamin' },
  { id: '6', name: 'Bedřich Smetana', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=bedrich' },
  { id: '7', name: 'Béla Bartók', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=bela' },
  { id: '8', name: 'Rosa Bartolini', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=rosa' },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Contatti');
  const [activeCategory, setActiveCategory] = useState<Category>('Tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    return MOCK_CONTACTS.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  const groupedContacts = useMemo(() => {
    const groups: Record<string, Contact[]> = {};
    filteredContacts.forEach(c => {
      const firstLetter = c.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(c);
    });
    return groups;
  }, [filteredContacts]);

  return (
    <>
      {/* Mobile restriction message */}
      <div className="flex lg:hidden h-screen w-full flex-col items-center justify-center p-8 text-center bg-[#F8F9FA]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-[#FF5722] rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl"
        >
          <Phone size={40} />
        </motion.div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Versione Desktop</h2>
        <p className="text-[#6C757D] text-lg max-w-[260px] leading-relaxed">
          Per usarla sul telefono scarica l'app
        </p>
        <div className="mt-10 flex gap-4">
          <div className="w-32 h-10 bg-black rounded-lg flex items-center justify-center text-white text-xs font-medium">App Store</div>
          <div className="w-32 h-10 bg-black rounded-lg flex items-center justify-center text-white text-xs font-medium">Google Play</div>
        </div>
      </div>

      {/* Main Desktop App */}
      <div className="hidden lg:flex h-screen w-full flex-col overflow-hidden bg-white">
        {/* Top Header Bar */}
        <header className="h-14 flex items-center justify-between border-b border-[#E9ECEF] bg-white shrink-0 pr-4">
          <div className="flex items-center flex-1">
            {/* Logo Area aligned with Sidebar */}
            <div className="w-[72px] flex items-center justify-center shrink-0 h-full">
              <div className="w-8 h-8 bg-black rounded-full" />
            </div>

            <div className="flex items-center gap-8 pl-4 flex-1">
              {/* Global Search */}
              <div className="relative w-[267px]">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#6C757D]">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Cerca o Chiama..." 
                className="w-full h-9 pl-10 pr-10 bg-[#F1F3F5] border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007BFF] transition-all"
              />
              <div className="absolute inset-y-0 right-3 flex items-center text-[#007BFF] cursor-pointer">
                <Grid3X3 size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#F1F3F5] rounded-md text-sm text-[#495057] cursor-pointer">
              <span>390</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Sidebar (Icons) */}
          <aside className="w-[72px] flex flex-col items-center py-6 border-r border-[#E9ECEF] bg-white shrink-0">
            <nav className="flex flex-col gap-8 items-center flex-1">
              <SidebarIcon 
                icon={<Users size={24} />} 
                label="Contatti" 
                active={activeNav === 'Contatti'} 
                onClick={() => setActiveNav('Contatti')} 
              />
              <SidebarIcon 
                icon={<History size={24} />} 
                label="Recenti" 
                active={activeNav === 'Recenti'} 
                onClick={() => setActiveNav('Recenti')} 
              />
              <SidebarIcon 
                icon={<Video size={24} />} 
                label="Meeting" 
                active={activeNav === 'Meeting'} 
                onClick={() => setActiveNav('Meeting')} 
              />
              <SidebarIcon 
                icon={<ListOrdered size={24} />} 
                label="Code" 
                active={activeNav === 'Code'} 
                onClick={() => setActiveNav('Code')} 
              />
            </nav>

            <div className="mt-auto">
              <SidebarIcon 
                icon={<Settings size={24} />} 
                label="Impostazioni" 
                active={activeNav === 'Impostazioni'} 
                onClick={() => setActiveNav('Impostazioni')} 
              />
            </div>
          </aside>

          {/* Category Sidebar */}
          <aside className="w-[300px] flex flex-col border-r border-[#E9ECEF] bg-white shrink-0 relative">
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-1">
                <CategoryItem 
                  icon={<Users size={20} />} 
                  label="Tutti" 
                  active={activeCategory === 'Tutti'} 
                  onClick={() => setActiveCategory('Tutti')} 
                />
                <CategoryItem 
                  icon={<ListOrdered size={20} />} 
                  label="Interni" 
                  active={activeCategory === 'Interni'} 
                  onClick={() => setActiveCategory('Interni')} 
                  showInfo
                />
                <CategoryItem 
                  icon={<Users size={20} />} 
                  label="Condivisi" 
                  active={activeCategory === 'Condivisi'} 
                  onClick={() => setActiveCategory('Condivisi')} 
                  showInfo
                />
                <CategoryItem 
                  icon={<Users size={20} />} 
                  label="Personali" 
                  active={activeCategory === 'Personali'} 
                  onClick={() => setActiveCategory('Personali')} 
                  showInfo
                />
              </div>

              <div className="mt-8 pt-6 border-t border-[#E9ECEF]">
                <CategoryItem 
                  icon={<Star size={20} />} 
                  label="Preferiti" 
                  active={activeCategory === 'Preferiti'} 
                  onClick={() => setActiveCategory('Preferiti')} 
                />
              </div>
            </div>

            <button className="absolute bottom-6 right-6 w-12 h-12 bg-[#007BFF] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0056b3] transition-colors">
              <Plus size={24} />
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-white">
            <header className="h-14 flex items-center justify-between px-6 border-b border-[#E9ECEF] shrink-0">
              <h1 className="text-xl font-medium text-[#1A1A1A]">{activeCategory}</h1>
              
              <div className="flex items-center gap-4">
                <div className="relative w-64">
                  <input 
                    type="text" 
                    placeholder="Cerca..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 pl-4 pr-10 bg-white border border-[#CED4DA] rounded-full text-sm focus:outline-none focus:border-[#007BFF]"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-[#6C757D]">
                    <Search size={16} />
                  </div>
                </div>
                <button className="p-2 text-[#6C757D] hover:text-[#1A1A1A] transition-colors">
                  <RefreshCw size={20} />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6">
              {(Object.entries(groupedContacts) as [string, Contact[]][]).map(([letter, contacts]) => (
                <div key={letter} className="mb-8">
                  <h2 className="text-xs font-semibold text-[#6C757D] uppercase tracking-wider mb-3 px-2">
                    {letter}
                  </h2>
                  <div className="flex flex-col gap-1">
                    {contacts.map(contact => (
                      <ContactRow 
                        key={contact.id} 
                        contact={contact} 
                        isHovered={hoveredContact === contact.id}
                        onHover={() => setHoveredContact(contact.id)}
                        onLeave={() => setHoveredContact(null)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function SidebarIcon({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group transition-colors ${active ? 'text-[#007BFF]' : 'text-[#6C757D] hover:text-[#1A1A1A]'}`}
    >
      <div className={`p-2 rounded-lg transition-colors ${active ? 'bg-[#E7F1FF]' : 'group-hover:bg-[#F8F9FA]'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function CategoryItem({ icon, label, active, onClick, showInfo }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, showInfo?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-[#D0E4FF] text-[#007BFF]' : 'text-[#495057] hover:bg-[#E9ECEF]'}`}
    >
      <span className={active ? 'text-[#007BFF]' : 'text-[#6C757D]'}>{icon}</span>
      <span className="text-sm font-medium flex-1 text-left">{label}</span>
      {showInfo && <Info size={16} className="text-[#007BFF]" />}
    </button>
  );
}

const ContactRow: React.FC<{ 
  contact: Contact; 
  isHovered: boolean; 
  onHover: () => void; 
  onLeave: () => void; 
}> = ({ contact, isHovered, onHover, onLeave }) => {
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 ${isHovered ? 'bg-[#E7F1FF]' : 'bg-[#F1F3F5] hover:bg-[#E9ECEF]'}`}
    >
      <div className="relative shrink-0">
        <img 
          src={contact.avatar} 
          alt={contact.name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${contact.status === 'online' ? 'bg-[#28A745]' : 'bg-[#ADB5BD]'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[#1A1A1A] truncate">{contact.name}</h3>
        <div className="flex items-center gap-1.5 text-[#6C757D]">
          <div className="w-4 h-4 rounded bg-[#DEE2E6] flex items-center justify-center">
            <div className="w-2 h-2 border border-[#6C757D] rounded-xs" />
          </div>
          <span className="text-xs">{contact.department}</span>
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-3 pr-2"
          >
            <ActionButton icon={<Video size={18} />} color="#007BFF" />
            <ActionButton icon={<MessageSquare size={18} />} color="#007BFF" />
            <ActionButton icon={<Phone size={18} />} color="#007BFF" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ActionButton({ icon, color }: { icon: React.ReactNode, color: string }) {
  return (
    <button 
      className="p-2 rounded-full hover:bg-white/50 transition-colors"
      style={{ color }}
    >
      {icon}
    </button>
  );
}
