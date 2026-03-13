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
  { id: '1', name: 'Aaron Copland', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=aaron', phone: '340 1234567', type: 'interno', isFavorite: true },
  { id: '2', name: 'Alban Berg', department: 'Sales', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alban', phone: '341 2345678', type: 'interno' },
  { id: '3', name: 'Amy Beach', department: 'HR', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=amy', phone: '342 3456789', type: 'interno' },
  { id: '4', name: 'Barbara Strozzi', department: 'IT', status: 'busy', avatar: 'https://i.pravatar.cc/150?u=barbara', phone: '343 4567890', type: 'interno' },
  { id: '5', name: 'Benjamin Britten', department: 'Legal', status: 'online', avatar: 'https://i.pravatar.cc/150?u=benjamin', phone: '344 5678901', type: 'interno' },
  { id: '6', name: 'Bedřich Smetana', department: 'Finance', status: 'online', avatar: 'https://i.pravatar.cc/150?u=bedrich', phone: '345 6789012', type: 'interno' },
  { id: '7', name: 'Béla Bartók', department: 'Marketing', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=bela', phone: '346 7890123', type: 'interno' },
  { id: '8', name: 'Rosa Bartolini', department: 'Sales', status: 'online', avatar: 'https://i.pravatar.cc/150?u=rosa', phone: '347 8901234', type: 'interno', isFavorite: true },
  { id: '9', name: 'Claudio Monteverdi', status: 'online', avatar: 'https://i.pravatar.cc/150?u=claudio', phone: '02 123456', type: 'condiviso' },
  { id: '10', name: 'Domenico Scarlatti', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=domenico', phone: '06 654321', type: 'condiviso' },
  { id: '11', name: 'Ennio Morricone', status: 'online', avatar: 'https://i.pravatar.cc/150?u=ennio', phone: '333 112233', type: 'personale' },
  { id: '12', name: 'Giacomo Puccini', status: 'busy', avatar: 'https://i.pravatar.cc/150?u=giacomo', phone: '335 445566', type: 'personale' },
  { id: '13', name: 'Igor Stravinsky', department: 'R&D', status: 'online', avatar: 'https://i.pravatar.cc/150?u=igor', phone: '348 998877', type: 'interno' },
  { id: '14', name: 'Johannes Brahms', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=johannes', phone: '349 776655', type: 'interno' },
  { id: '15', name: 'Kaija Saariaho', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=kaija', phone: '051 123456', type: 'condiviso' },
];

const MOCK_CALLS: Call[] = [
  { id: '1', contact: MOCK_CONTACTS[0], type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 340' },
  { id: '2', contact: MOCK_CONTACTS[1], type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 341 al tuo interno' },
  { id: '3', contact: MOCK_CONTACTS[2], type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 342' },
  { id: '4', contact: MOCK_CONTACTS[3], type: 'outgoing', timestamp: 'ven 23-05 23:34', internalInfo: 'da 343 al tuo interno' },
  { id: '5', contact: MOCK_CONTACTS[1], type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 341 al tuo interno' },
  { id: '6', contact: MOCK_CONTACTS[4], type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 344' },
  { id: '7', contact: MOCK_CONTACTS[8], type: 'outgoing', timestamp: 'ven 23-05 23:34', internalInfo: 'da 02 al tuo interno' },
  { id: '8', contact: MOCK_CONTACTS[10], type: 'incoming', timestamp: 'ven 23-05 23:34', internalInfo: 'dal tuo interno a 333' },
  { id: '9', contact: MOCK_CONTACTS[7], type: 'missed', timestamp: 'ven 23-05 23:34', internalInfo: 'da 347 al tuo interno' },
];

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Contatti');
  const [activeCategory, setActiveCategory] = useState<Category>('Tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
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
    return MOCK_CONTACTS.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.phone.includes(searchQuery);
      
      let matchesCategory = true;
      if (activeCategory === 'Interni') matchesCategory = c.type === 'interno';
      else if (activeCategory === 'Condivisi') matchesCategory = c.type === 'condiviso';
      else if (activeCategory === 'Personali') matchesCategory = c.type === 'personale';
      else if (activeCategory === 'Preferiti') matchesCategory = !!c.isFavorite;
      
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, activeCategory]);

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
          className="w-20 h-20 bg-[#FF5722] rounded-[5px] flex items-center justify-center text-white mb-8 shadow-xl"
        >
          <Phone size={40} />
        </motion.div>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Versione per Mobile</h2>
        <p className="text-[#6C757D] text-lg max-w-[260px] leading-relaxed">
          Per usarla sul telefono scarica l'app dallo store
        </p>
        <div className="mt-10 flex gap-4">
          <div className="w-32 h-10 bg-black rounded-[5px] flex items-center justify-center text-white text-xs font-medium">App Store</div>
          <div className="w-32 h-10 bg-black rounded-[5px] flex items-center justify-center text-white text-xs font-medium">Google Play</div>
        </div>
      </div>

      {/* Main Desktop App */}
      <div className="hidden lg:flex h-screen w-full flex-col overflow-hidden bg-white">
        {/* Top Header Bar */}
        <header className="h-[50px] flex items-center justify-between border-b border-[#E9ECEF] bg-white shrink-0 pr-4">
          <div className="flex items-center flex-1">
            {/* Logo Area aligned with Sidebar */}
            <div className="w-[64px] flex items-center justify-center shrink-0 h-full">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 30.7432C15.8582 30.7432 15.7163 30.7084 15.5876 30.6389L3.45478 24.0794C3.17458 23.928 3 23.6351 3 23.3166V8.6832C3 8.37771 3.16073 8.09476 3.42316 7.93833C3.68551 7.78192 4.01083 7.77505 4.27961 7.92036L12.7504 12.5C13.1717 12.7277 13.3286 13.2539 13.1009 13.6752C12.8731 14.0966 12.3469 14.2534 11.9256 14.0257L4.73439 10.1378V22.7996L16 28.8902L27.2656 22.7996V9.20017L16 3.10959L8.55788 7.13306C8.13666 7.36084 7.61042 7.20395 7.38261 6.78264C7.15485 6.36134 7.31174 5.83515 7.73304 5.60738L15.5876 1.36094C15.845 1.2218 16.1551 1.22181 16.4124 1.36094L28.5452 7.92036C28.8254 8.07183 29 8.3647 29 8.6832V23.3166C29 23.6351 28.8254 23.928 28.5452 24.0794L16.4124 30.6389C16.2838 30.7084 16.1419 30.7432 16 30.7432Z" fill="#FF4600"/>
                <path d="M22.1353 11.9254C21.8617 11.4188 22.0501 10.7857 22.557 10.512C23.064 10.2379 23.6967 10.4267 23.9704 10.9333C24.2445 11.4403 24.0557 12.073 23.5492 12.3471C23.3915 12.4324 23.2217 12.4728 23.0539 12.4728C22.6832 12.4728 22.3241 12.2747 22.1353 11.9254Z" fill="#FF4600"/>
                <path d="M18.61 13.8316C18.3363 13.3251 18.5247 12.692 19.0316 12.4183C19.5382 12.1442 20.1709 12.333 20.445 12.8395C20.7191 13.3465 20.5303 13.9792 20.0234 14.2533C19.8657 14.3386 19.6959 14.379 19.5285 14.379C19.1578 14.379 18.7988 14.1809 18.61 13.8316Z" fill="#FF4600"/>
                <path d="M15.0828 15.7381C14.8087 15.2316 14.9975 14.5989 15.5041 14.3248C16.011 14.0506 16.6438 14.2394 16.9179 14.7464C17.1916 15.253 17.0031 15.8857 16.4962 16.1598C16.3385 16.2451 16.1687 16.2855 16.0009 16.2855C15.6302 16.2855 15.2712 16.0874 15.0828 15.7381Z" fill="#FF4600"/>
              </svg>
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
                    value={globalSearchQuery}
                    onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    className={`w-full h-8 pl-10 pr-10 bg-[#F1F3F5] border-none rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-[#007BFF] transition-all ${isSearchExpanded ? 'bg-white shadow-md' : ''}`}
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
                      className="absolute top-11 left-0 w-[500px] bg-white rounded-[5px] shadow-2xl border border-[#E9ECEF] z-50 overflow-hidden flex"
                    >
                      {/* Search Results / Recent Searches */}
                      <div className="w-[320px] border-r border-[#E9ECEF] p-4">
                        <h4 className="text-[11px] font-semibold text-[#6C757D] uppercase tracking-wider mb-4">
                          {globalSearchQuery ? 'Risultati della ricerca' : 'Ricerche recenti'}
                        </h4>
                        <div className="flex flex-col gap-1 overflow-y-auto max-h-[400px]">
                          {(globalSearchQuery 
                            ? MOCK_CONTACTS.filter(c => 
                                c.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                                c.phone.includes(globalSearchQuery)
                              )
                            : MOCK_CONTACTS.slice(0, 6)
                          ).map((item, i) => (
                            <div 
                              key={i} 
                              onMouseEnter={() => setHoveredRecent(i)}
                              onMouseLeave={() => setHoveredRecent(null)}
                              className={`flex items-center gap-3 p-2 rounded-[5px] cursor-pointer transition-colors ${hoveredRecent === i ? 'bg-[#E7F1FF]' : 'hover:bg-[#F8F9FA]'}`}
                            >
                              <div className="relative shrink-0">
                                <img src={'avatar' in item ? item.avatar : ''} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#28A745] rounded-full border-2 border-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.name}</p>
                                <p className="text-[11px] text-[#6C757D] truncate">
                                  {item.phone}
                                  {item.department ? ` • ${item.department}` : ''}
                                </p>
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
                          {globalSearchQuery && MOCK_CONTACTS.filter(c => 
                            c.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                            c.phone.includes(globalSearchQuery)
                          ).length === 0 && (
                            <p className="text-sm text-[#6C757D] text-center py-4">Nessun risultato trovato</p>
                          )}
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
                              onClick={() => setGlobalSearchQuery(prev => prev + btn.n)}
                              className="w-[35px] h-[35px] bg-[#F1F3F5] rounded-[5px] flex flex-col items-center justify-center hover:bg-[#E9ECEF] transition-colors"
                            >
                              <span className="text-sm font-bold text-[#1A1A1A] leading-none">{btn.n}</span>
                              {btn.l && <span className="text-[7px] text-[#6C757D] font-bold mt-0.5">{btn.l}</span>}
                            </button>
                          ))}
                        </div>
                        <button className="w-[35px] h-[35px] bg-[#28A745] text-white rounded-[5px] flex items-center justify-center shadow-md hover:bg-[#218838] transition-colors">
                          <Phone size={16} fill="currentColor" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 h-8 bg-[#F1F3F5] rounded-[5px] text-[13px] text-[#495057] cursor-pointer">
              <span>390</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Sidebar (Icons) */}
          <aside className="w-[64px] flex flex-col items-center py-4 border-r border-[#E9ECEF] bg-white shrink-0">
            <nav className="flex flex-col gap-8 items-center flex-1">
              <SidebarIcon 
                icon={<ContactIcon size={18} />} 
                label="Contatti" 
                active={activeNav === 'Contatti'} 
                onClick={() => setActiveNav('Contatti')} 
              />
              <SidebarIcon 
                icon={<Phone size={18} />} 
                label="Recenti" 
                active={activeNav === 'Recenti'} 
                onClick={() => setActiveNav('Recenti')} 
              />
              <SidebarIcon 
                icon={<Video size={18} />} 
                label="Meeting" 
                active={activeNav === 'Meeting'} 
                onClick={() => setActiveNav('Meeting')} 
              />
              <SidebarIcon 
                icon={<Users size={18} />} 
                label="Code" 
                active={activeNav === 'Code'} 
                onClick={() => setActiveNav('Code')} 
                badge={
                  <div className="w-5 h-5 bg-[#D0E4FF] rounded-full border border-white flex items-center justify-center text-[#007BFF]">
                    <Headset size={12} strokeWidth={2.5} />
                  </div>
                }
              />
            </nav>

            <div className="mt-auto">
              <SidebarIcon 
                icon={<Settings size={18} />} 
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
                      icon={<Users size={18} />} 
                      label="Tutti" 
                      active={activeCategory === 'Tutti'} 
                      onClick={() => setActiveCategory('Tutti')} 
                    />
                    <CategoryItem 
                      icon={<ListOrdered size={18} />} 
                      label="Interni" 
                      active={activeCategory === 'Interni'} 
                      onClick={() => setActiveCategory('Interni')} 
                      showInfo
                    />
                    <CategoryItem 
                      icon={<Users size={18} />} 
                      label="Condivisi" 
                      active={activeCategory === 'Condivisi'} 
                      onClick={() => setActiveCategory('Condivisi')} 
                      showInfo
                    />
                    <CategoryItem 
                      icon={<Users size={18} />} 
                      label="Personali" 
                      active={activeCategory === 'Personali'} 
                      onClick={() => setActiveCategory('Personali')} 
                      showInfo
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#E9ECEF]">
                    <CategoryItem 
                      icon={<Star size={18} />} 
                      label="Preferiti" 
                      active={activeCategory === 'Preferiti'} 
                      onClick={() => setActiveCategory('Preferiti')} 
                    />
                  </div>
                </div>

                <button className="absolute bottom-6 right-6 w-9 h-9 bg-[#007BFF] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0056b3] transition-colors">
                  <Plus size={20} />
                </button>
              </aside>

              {/* Main Content Area - Contacts */}
              <main className="flex-1 flex flex-col min-w-0 bg-white">
                <header className="h-[50px] border-b border-[#E9ECEF] shrink-0">
                  <div className="max-w-[1024px] mx-auto h-full flex items-center justify-between px-4">
                    <h1 className="text-[15px] font-normal text-[#1A1A1A]">{activeCategory}</h1>
                    
                    <div className="flex items-center gap-4">
                      <div className="relative w-[256px]">
                        <input 
                          type="text" 
                          placeholder="Cerca..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-[30px] pl-4 pr-10 bg-white border border-[#CED4DA] rounded-full text-sm focus:outline-none focus:border-[#007BFF]"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center text-[#6C757D]">
                          <Search size={16} />
                        </div>
                      </div>
                      <button className="w-[30px] h-[30px] px-[5px] py-0 flex items-center justify-center text-[#6C757D] hover:text-[#1A1A1A] transition-colors">
                        <RefreshCw size={18} />
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
              <header className="h-[50px] border-b border-[#E9ECEF] shrink-0">
                <div className="max-w-[1024px] mx-auto h-full flex items-center justify-between px-4">
                  <h1 className="text-[15px] font-normal text-[#1A1A1A]">Chiamate recenti</h1>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex bg-[#F1F3F5] p-0.5 rounded-[5px]">
                      {(['Tutte', 'In uscita', 'In entrata', 'Perse'] as const).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setActiveCallFilter(filter)}
                          className={`px-3 h-[26px] flex items-center justify-center text-[11px] font-medium rounded-[5px] transition-all ${
                            activeCallFilter === filter 
                              ? 'bg-[#007BFF] text-white shadow-sm' 
                              : 'text-[#495057] hover:bg-[#E9ECEF]'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <button className="w-[30px] h-[30px] px-[5px] py-0 flex items-center justify-center text-[#6C757D] hover:text-[#1A1A1A] transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto">
                <div className="max-w-[1024px] mx-auto py-6 px-4 flex flex-col gap-[5px]">
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
    <div className="flex items-center gap-4 h-[52px] px-4 bg-[#f1f3f5] rounded-[5px] hover:bg-[#E9ECEF] transition-colors group">
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative w-[34px] h-[34px]">
          <img 
            src={call.contact.avatar} 
            alt={call.contact.name} 
            className="w-full h-full rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border border-[#F8F9FA] group-hover:border-[#F1F3F5] ${call.contact.status === 'online' ? 'bg-[#28A745]' : 'bg-[#ADB5BD]'}`} />
        </div>
        <div className="flex items-center justify-center w-[18px] h-[18px]">
          {call.type === 'incoming' && <PhoneIncoming size={16} className="text-[#007BFF]" />}
          {call.type === 'outgoing' && <PhoneOutgoing size={16} className="text-[#6C757D]" />}
          {call.type === 'missed' && <PhoneMissed size={16} className="text-[#DC3545]" />}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`text-[13px] font-medium truncate ${isMissed ? 'text-[#DC3545]' : 'text-[#1A1A1A]'}`}>
          {call.contact.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-[#6C757D]">
          <span>{call.contact.phone}</span>
          <span className="opacity-50">•</span>
          <span>{call.internalInfo}</span>
        </div>
      </div>

      <div className="text-right shrink-0 mr-4">
        <p className="text-[11px] text-[#6C757D] leading-tight">
          {call.timestamp.split(' ').slice(0, 2).join(' ')}
        </p>
        <p className="text-[11px] text-[#6C757D] leading-tight">
          {call.timestamp.split(' ').slice(2).join(' ')}
        </p>
      </div>

      <button className="text-[#007BFF] hover:text-[#0056b3] transition-colors">
        <Info size={18} />
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
      <div className={`w-7 h-7 flex items-center justify-center rounded-[5px] transition-colors relative ${active ? 'bg-[#007BFF] text-white' : 'bg-[#F1F3F5] text-[#343A40] group-hover:bg-[#E9ECEF]'}`}>
        {icon}
        {badge && (
          <div className="absolute -top-[7px] -right-[7px]">
            {badge}
          </div>
        )}
      </div>
      <span className={`text-[10px] font-normal ${active ? 'text-[#007BFF]' : 'text-[#343A40]'}`}>{label}</span>
    </button>
  );
}

function CategoryItem({ icon, label, active, onClick, showInfo }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, showInfo?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full h-9 px-3 rounded-[5px] transition-colors ${active ? 'bg-[#D0E4FF] text-[#007BFF]' : 'text-[#495057] hover:bg-[#E9ECEF]'}`}
    >
      <span className={active ? 'text-[#007BFF]' : 'text-[#6C757D]'}>{icon}</span>
      <span className="text-[13px] font-normal leading-[18px] flex-1 text-left">{label}</span>
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
      className={`flex items-center gap-4 p-3 rounded-[5px] cursor-pointer transition-all duration-200 group ${isHovered ? 'bg-[#E7F1FF]' : 'bg-[#F1F3F5] hover:bg-[#E9ECEF]'}`}
    >
      <div className="relative shrink-0 w-[34px] h-[34px]">
        <img 
          src={contact.avatar} 
          alt={contact.name} 
          className="w-[34px] h-[34px] rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border ${isHovered ? 'border-[#E7F1FF]' : 'border-[#F1F3F5] group-hover:border-[#E9ECEF]'} ${contact.status === 'online' ? 'bg-[#28A745]' : 'bg-[#ADB5BD]'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-[13px] font-medium text-[#1A1A1A] truncate">{contact.name}</h3>
        <div className="flex items-center gap-2 text-[#6C757D]">
          {contact.type === 'interno' && contact.department && (
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-[5px] bg-[#DEE2E6] flex items-center justify-center">
                <div className="w-[6px] h-[6px] border border-[#6C757D] rounded-[2px]" />
              </div>
              <span className="text-[11px]">{contact.department}</span>
              <span className="text-[11px] opacity-50">•</span>
            </div>
          )}
          <span className="text-[11px]">{contact.phone}</span>
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
