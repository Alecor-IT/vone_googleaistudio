import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  ChevronDown,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  MoreVertical,
  X,
  Contact as ContactIcon,
  Headset
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact, Category, NavItem, Call, CallType } from './types';

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

const MOCK_CALLS: Call[] = [
  { id: '1', contact: { id: 'c1', name: 'Élisabeth Jacquet de La Guerre', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=elisabeth' }, type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 390' },
  { id: '2', contact: { id: 'c2', name: 'Nadia Boulanger', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=nadia' }, type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 390 al tuo interno' },
  { id: '3', contact: { id: 'c3', name: 'Antonio Vivaldi', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=antonio' }, type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 390' },
  { id: '4', contact: { id: 'c4', name: 'Lili Boulanger', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=lili' }, type: 'outgoing', timestamp: 'ven 23-05 23:34', internalInfo: 'da 390 al tuo interno' },
  { id: '5', contact: { id: 'c5', name: 'Nadia Boulanger', department: 'Marketing', status: 'busy', avatar: 'https://i.pravatar.cc/150?u=nadia' }, type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 390 al tuo interno' },
  { id: '6', contact: { id: 'c6', name: 'Leonard Bernstein', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=leonard' }, type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 390' },
  { id: '7', contact: { id: 'c7', name: 'John Cage', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=john' }, type: 'outgoing', timestamp: 'ven 23-05 23:34', internalInfo: 'da 390 al tuo interno' },
  { id: '8', contact: { id: 'c8', name: 'Galina Ustvolskaya', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=galina' }, type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 390' },
  { id: '9', contact: { id: 'c9', name: 'Rosa Bartolini', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=rosa' }, type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 390 al tuo interno' },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Contatti');
  const [activeCategory, setActiveCategory] = useState<Category>('Tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [activeCallFilter, setActiveCallFilter] = useState<'Tutte' | 'In uscita' | 'In entrata' | 'Perse'>('Tutte');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [hoveredRecent, setHoveredRecent] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchExpanded]);

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

  const filteredCalls = useMemo(() => {
    if (activeCallFilter === 'Tutte') return MOCK_CALLS;
    if (activeCallFilter === 'In uscita') return MOCK_CALLS.filter(c => c.type === 'outgoing');
    if (activeCallFilter === 'In entrata') return MOCK_CALLS.filter(c => c.type === 'incoming');
    if (activeCallFilter === 'Perse') return MOCK_CALLS.filter(c => c.type === 'missed');
    return MOCK_CALLS;
  }, [activeCallFilter]);

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
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Versione per Mobile</h2>
        <p className="text-[#6C757D] text-lg max-w-[260px] leading-relaxed">
          Per usarla sul telefono scarica l'app dallo store
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
              <div className="relative" ref={searchRef}>
                <div className={`relative transition-all duration-300 ${isSearchExpanded ? 'w-[500px]' : 'w-[267px]'}`}>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#6C757D]">
                    <Search size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Cerca o Chiama..." 
                    onFocus={() => setIsSearchExpanded(true)}
                    className={`w-full h-9 pl-10 pr-10 bg-[#F1F3F5] border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#007BFF] transition-all ${isSearchExpanded ? 'bg-white shadow-md' : ''}`}
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center text-[#007BFF] cursor-pointer">
                    <Grid3X3 size={18} />
                  </div>
                </div>

                <AnimatePresence>
                  {isSearchExpanded && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-11 left-0 w-[500px] bg-white rounded-xl shadow-2xl border border-[#E9ECEF] z-50 overflow-hidden flex"
                    >
                      {/* Recent Searches */}
                      <div className="w-[320px] border-r border-[#E9ECEF] p-4">
                        <h4 className="text-[11px] font-semibold text-[#6C757D] uppercase tracking-wider mb-4">Ricerche recenti</h4>
                        <div className="flex flex-col gap-1">
                          {[
                            { name: 'Giulia Montessori', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=giulia' },
                            { name: 'Marianna Felici', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=marianna' },
                            { name: 'Alessandro Goretti', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=alessandro' },
                            { name: 'Matteo Verdini', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=matteo' },
                            { name: 'Francesca Berti', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=francesca' },
                            { name: 'Roberto Bianchi', sub: 'Sales - 2 numeri', avatar: 'https://i.pravatar.cc/150?u=roberto' },
                          ].map((item, i) => (
                            <div 
                              key={i} 
                              onMouseEnter={() => setHoveredRecent(i)}
                              onMouseLeave={() => setHoveredRecent(null)}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${hoveredRecent === i ? 'bg-[#E7F1FF]' : 'hover:bg-[#F8F9FA]'}`}
                            >
                              <div className="relative shrink-0">
                                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28A745] rounded-full border-2 border-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.name}</p>
                                <p className="text-[11px] text-[#6C757D]">{item.sub}</p>
                              </div>
                              {hoveredRecent === i && (
                                <div className="flex items-center gap-2 text-[#007BFF]">
                                  <Video size={14} />
                                  <MessageSquare size={14} />
                                  <Phone size={14} />
                                  <X size={14} className="text-[#6C757D] ml-1" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Dial Pad */}
                      <div className="flex-1 bg-white p-4 flex flex-col items-center">
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          {[
                            { n: '1', l: '' }, { n: '2', l: 'ABC' }, { n: '3', l: 'DEF' },
                            { n: '4', l: 'GHI' }, { n: '5', l: 'JKL' }, { n: '6', l: 'MNO' },
                            { n: '7', l: 'PQRS' }, { n: '8', l: 'TUV' }, { n: '9', l: 'WXYZ' },
                            { n: '*', l: '' }, { n: '0', l: '+' }, { n: '#', l: '' }
                          ].map((btn, i) => (
                            <button 
                              key={i} 
                              className="w-10 h-10 bg-[#F1F3F5] rounded-lg flex flex-col items-center justify-center hover:bg-[#E9ECEF] transition-colors"
                            >
                              <span className="text-sm font-bold text-[#1A1A1A] leading-none">{btn.n}</span>
                              {btn.l && <span className="text-[7px] text-[#6C757D] font-bold mt-0.5">{btn.l}</span>}
                            </button>
                          ))}
                        </div>
                        <button className="w-10 h-12 bg-[#28A745] text-white rounded-lg flex items-center justify-center shadow-md hover:bg-[#218838] transition-colors">
                          <Phone size={20} fill="currentColor" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <aside className="w-[72px] flex flex-col items-center py-4 border-r border-[#E9ECEF] bg-white shrink-0">
            <nav className="flex flex-col gap-8 items-center flex-1">
              <SidebarIcon 
                icon={<ContactIcon size={20} />} 
                label="Contatti" 
                active={activeNav === 'Contatti'} 
                onClick={() => setActiveNav('Contatti')} 
              />
              <SidebarIcon 
                icon={<Phone size={20} />} 
                label="Recenti" 
                active={activeNav === 'Recenti'} 
                onClick={() => setActiveNav('Recenti')} 
              />
              <SidebarIcon 
                icon={<Video size={20} />} 
                label="Meeting" 
                active={activeNav === 'Meeting'} 
                onClick={() => setActiveNav('Meeting')} 
              />
              <SidebarIcon 
                icon={<Users size={20} />} 
                label="Code" 
                active={activeNav === 'Code'} 
                onClick={() => setActiveNav('Code')} 
                badge={
                  <div className="w-6 h-6 bg-[#D0E4FF] rounded-full border-2 border-white flex items-center justify-center text-[#007BFF]">
                    <Headset size={14} strokeWidth={2.5} />
                  </div>
                }
              />
            </nav>

            <div className="mt-auto">
              <SidebarIcon 
                icon={<Settings size={20} />} 
                label="Impostazioni" 
                active={activeNav === 'Impostazioni'} 
                onClick={() => setActiveNav('Impostazioni')} 
              />
            </div>
          </aside>

          {activeNav === 'Contatti' ? (
            <>
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

              {/* Main Content Area - Contacts */}
              <main className="flex-1 flex flex-col min-w-0 bg-white">
                <header className="h-16 border-b border-[#E9ECEF] shrink-0">
                  <div className="max-w-[1024px] mx-auto h-full flex items-center justify-between px-4">
                    <h1 className="text-[22px] font-medium text-[#1A1A1A]">{activeCategory}</h1>
                    
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
                  </div>
                </header>

                <div className="flex-1 overflow-y-auto">
                  <div className="max-w-[1024px] mx-auto py-6 px-4">
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
                </div>
              </main>
            </>
          ) : activeNav === 'Recenti' ? (
            <main className="flex-1 flex flex-col min-w-0 bg-white">
              <header className="h-16 border-b border-[#E9ECEF] shrink-0">
                <div className="max-w-[1024px] mx-auto h-full flex items-center justify-between px-4">
                  <h1 className="text-[22px] font-medium text-[#1A1A1A]">Chiamate recenti</h1>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex bg-[#F1F3F5] p-1 rounded-lg">
                      {(['Tutte', 'In uscita', 'In entrata', 'Perse'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveCallFilter(filter)}
                          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                            activeCallFilter === filter 
                              ? 'bg-[#007BFF] text-white shadow-sm' 
                              : 'text-[#495057] hover:bg-[#E9ECEF]'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <button className="p-2 text-[#6C757D] hover:text-[#1A1A1A] transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto">
                <div className="max-w-[1024px] mx-auto py-6 px-4 flex flex-col gap-2">
                  {filteredCalls.map(call => (
                    <CallRow key={call.id} call={call} />
                  ))}
                </div>
              </div>
            </main>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#6C757D]">
              Sezione {activeNav} in fase di sviluppo
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const CallRow: React.FC<{ call: Call }> = ({ call }) => {
  const isMissed = call.type === 'missed';
  
  return (
    <div className="flex items-center gap-4 p-3 bg-[#F1F3F5] rounded-xl hover:bg-[#E9ECEF] transition-colors group">
      <div className="relative shrink-0">
        <img 
          src={call.contact.avatar} 
          alt={call.contact.name} 
          className="w-12 h-12 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border border-[#F1F3F5] group-hover:border-[#E9ECEF] ${call.contact.status === 'online' ? 'bg-[#28A745]' : 'bg-[#ADB5BD]'}`} />
      </div>
      
      <div className="flex items-center justify-center w-8 h-8">
        {call.type === 'incoming' && <PhoneIncoming size={18} className="text-[#007BFF]" />}
        {call.type === 'outgoing' && <PhoneOutgoing size={18} className="text-[#6C757D]" />}
        {call.type === 'missed' && <PhoneMissed size={18} className="text-[#DC3545]" />}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isMissed ? 'text-[#DC3545]' : 'text-[#1A1A1A]'}`}>
          {call.contact.name}
        </h3>
        <p className="text-xs text-[#6C757D]">{call.internalInfo}</p>
      </div>

      <div className="text-right shrink-0 mr-4">
        <p className="text-[11px] text-[#6C757D] leading-tight">
          {call.timestamp.split(' ').slice(0, 2).join(' ')}
        </p>
        <p className="text-[11px] text-[#6C757D] leading-tight">
          {call.timestamp.split(' ').slice(2).join(' ')}
        </p>
      </div>

      <button className="p-2 text-[#007BFF] hover:bg-[#D0E4FF] rounded-full transition-colors">
        <Info size={20} />
      </button>
    </div>
  );
};

function SidebarIcon({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 group transition-colors ${active ? 'text-[#007BFF]' : 'text-[#343A40] hover:text-[#1A1A1A]'}`}
    >
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors relative ${active ? 'bg-[#007BFF] text-white' : 'bg-[#F1F3F5] text-[#343A40] group-hover:bg-[#E9ECEF]'}`}>
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1">
            {badge}
          </div>
        )}
      </div>
      <span className={`text-[11px] font-medium ${active ? 'text-[#007BFF]' : 'text-[#343A40]'}`}>{label}</span>
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
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${isHovered ? 'bg-[#E7F1FF]' : 'bg-[#F1F3F5] hover:bg-[#E9ECEF]'}`}
    >
      <div className="relative shrink-0">
        <img 
          src={contact.avatar} 
          alt={contact.name} 
          className="w-12 h-12 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border ${isHovered ? 'border-[#E7F1FF]' : 'border-[#F1F3F5] group-hover:border-[#E9ECEF]'} ${contact.status === 'online' ? 'bg-[#28A745]' : 'bg-[#ADB5BD]'}`} />
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
