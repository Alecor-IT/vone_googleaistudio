import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Users, 
  History, 
  Settings, 
  Search, 
  Grid3X3, 
  Info, 
  Plus, 
  RefreshCw,
  ChevronDown,
  MoreVertical,
  X,
  Headset,
  MicOff,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  PanelRightClose,
  PanelRightOpen,
  Volume2,
  LifeBuoy,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Contact, Category, NavItem, Call, CallType } from './types';

const ChatIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M4.40283 17.3181L3.54925 20.5L7.57222 19.3742C8.97908 19.9552 10.4828 20.2526 12.0005 20.25C17.5228 20.25 22 16.4999 22 11.8726C22 7.24519 17.5228 3.50269 12.0005 3.50269C10.4841 3.46847 8.97776 3.76118 7.5798 4.36169C6.18185 4.96219 4.92375 5.85699 3.88771 6.98761C3.22697 7.72847 2.71864 8.59716 2.39283 9.5422C2.09122 10.4115 1.96113 11.3331 2.01004 12.2539C2.05896 13.1747 2.28592 14.0766 2.67785 14.9075C3.1109 15.8074 3.69467 16.6232 4.40283 17.3181Z" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MeetingIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16.6587 9.85794V6.56351C16.6589 6.35814 16.6185 6.15474 16.54 5.96497C16.4615 5.7752 16.3464 5.60277 16.2012 5.45755C16.0559 5.31233 15.8835 5.19717 15.6937 5.11866C15.5039 5.04015 15.3006 4.99982 15.0952 5H2.60742C2.19276 5 1.79505 5.16473 1.50184 5.45794C1.20862 5.75116 1.04398 6.14884 1.04398 6.56351V17.4365C1.04398 17.8511 1.20862 18.2488 1.50184 18.542C1.79505 18.8353 2.19276 19 2.60742 19H15.0952C15.5099 19 15.9076 18.8353 16.2008 18.542C16.494 18.2488 16.6587 17.8511 16.6587 17.4365V14.138L22.956 18.1993V5.80066L16.6587 9.85794Z" 
        stroke="currentColor" 
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PhoneIcon = ({ size = 24, className = "", fill = "none" }: { size?: number, className?: string, fill?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {fill === "none" ? (
        <path 
          d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.17997C2.095 3.90344 2.12787 3.62474 2.21649 3.3616C2.30512 3.09846 2.44756 2.85666 2.63476 2.6516C2.82196 2.44653 3.0498 2.28268 3.30379 2.1705C3.55777 2.05831 3.83233 2.00024 4.10999 1.99997H7.10999C7.5953 1.9952 8.06579 2.16705 8.43376 2.48351C8.80173 2.79996 9.04207 3.23942 9.10999 3.71997C9.23662 4.68004 9.47144 5.6227 9.80999 6.52997C9.94454 6.8879 9.97366 7.27689 9.8939 7.65086C9.81415 8.02482 9.62886 8.36809 9.35999 8.63998L8.08999 9.90997C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      ) : (
        <path 
          d="M21 16.5C19.75 16.5 18.55 16.3 17.43 15.93C17.08 15.82 16.69 15.9 16.41 16.17L14.21 18.37C11.38 16.93 9.06 14.62 7.62 11.79L9.82 9.58C10.1 9.31 10.18 8.92 10.07 8.57C9.7 7.45 9.5 6.25 9.5 5C9.5 4.45 9.05 4 8.5 4H5C4.45 4 4 4.45 4 5C4 14.39 11.61 22 21 22C21.55 22 22 21.55 22 21V17.5C22 16.95 21.55 16.5 21 16.5Z" 
          fill={fill}
        />
      )}
    </svg>
  );
};

const Toggle = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#007BFF]' : 'bg-[#CED4DA]'}`}
  >
    <span
      className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
    />
  </button>
);

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('Chiamate');
  const [internoEnabled, setInternoEnabled] = useState(true);
  const [cellulareEnabled, setCellulareEnabled] = useState(true);

  const menuItems = [
    { id: 'Chiamate', icon: <PhoneIcon size={18} />, label: 'Chiamate' },
    { id: 'Audio', icon: <Volume2 size={18} />, label: 'Audio' },
    { id: 'Preferenze', icon: <Settings size={18} />, label: 'Preferenze' },
    { id: 'Supporto', icon: <LifeBuoy size={18} />, label: 'Supporto' },
    { id: 'Info', icon: <Info size={18} />, label: 'Info' },
  ];

  return (
    <div className="flex flex-1 overflow-hidden bg-white">
      {/* Settings Sidebar */}
      <aside className="w-[300px] border-r border-[#E9ECEF] flex flex-col shrink-0 bg-white relative">
        <div className="p-4 flex items-center gap-4 border-b border-[#E9ECEF] mb-2">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150" 
            alt="Alessandro Rossi" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="text-[14px] font-semibold text-[#1A1A1A] truncate">Alessandro Rossi</h3>
            <p className="text-[12px] text-[#6C757D] truncate">alessandro.rossi@vianova.it</p>
          </div>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full h-9 px-3 rounded-[5px] transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-[#D0E4FF] text-[#007BFF]' 
                  : 'text-[#495057] hover:bg-[#F8F9FA]'
              }`}
            >
              <span className={activeTab === item.id ? 'text-[#007BFF]' : 'text-[#6C757D]'}>
                {item.icon}
              </span>
              <span className="text-[13px] font-normal leading-[18px]">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Settings Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="h-[50px] border-b border-[#E9ECEF] shrink-0">
          <div className="max-w-[1024px] mx-auto h-full flex items-center px-4">
            <h1 className="text-[15px] font-normal text-[#1A1A1A]">{activeTab}</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1024px] mx-auto py-6 px-4">
            {activeTab === 'Chiamate' && (
              <div className="flex flex-col gap-4">
                {/* Interno 390 */}
                <div className="bg-[#F1F3F5] rounded-[5px] px-[10px] py-[15px] flex flex-col gap-2">
                  <h2 className="text-[14px] font-semibold text-[#1A1A1A] px-2 mb-1">Interno 390</h2>
                  <div className="bg-white rounded-[5px] px-4 h-9 flex items-center justify-between shadow-sm">
                    <span className="text-[14px] text-[#495057]">Ricevi le chiamate sul tuo computer</span>
                    <Toggle enabled={internoEnabled} onChange={() => setInternoEnabled(!internoEnabled)} />
                  </div>
                  <button className="bg-white rounded-[5px] px-4 h-9 flex items-center justify-between shadow-sm hover:bg-[#F8F9FA] transition-colors group">
                    <span className="text-[14px] text-[#007BFF]">Deviate e opzioni avanzate</span>
                    <ChevronRight size={18} className="text-[#007BFF] transition-colors" />
                  </button>
                </div>

                {/* Cellulare */}
                <div className="bg-[#F1F3F5] rounded-[5px] px-[10px] py-[15px] flex flex-col gap-2">
                  <h2 className="text-[14px] font-semibold text-[#1A1A1A] px-2 mb-1">Cellulare 378 3145145</h2>
                  <div className="bg-white rounded-[5px] px-4 h-9 flex items-center justify-between shadow-sm">
                    <span className="text-[14px] text-[#495057]">Ricevi le chiamate sul tuo computer</span>
                    <Toggle enabled={cellulareEnabled} onChange={() => setCellulareEnabled(!cellulareEnabled)} />
                  </div>
                  <button className="bg-white rounded-[5px] px-4 h-9 flex items-center justify-between shadow-sm hover:bg-[#F8F9FA] transition-colors group">
                    <span className="text-[14px] text-[#007BFF]">Deviate e opzioni avanzate</span>
                    <ChevronRight size={18} className="text-[#007BFF] transition-colors" />
                  </button>
                </div>

                {/* Other Options */}
                <div className="flex flex-col gap-2">
                  <button className="bg-[#F1F3F5] rounded-[5px] py-[10px] px-4 flex items-center justify-between hover:bg-[#E9ECEF] transition-colors group">
                    <div className="flex flex-col items-start">
                      <span className="text-[14px] font-medium text-[#1A1A1A]">Modalità telefonica</span>
                      <span className="text-[12px] text-[#6C757D]">Softphone</span>
                    </div>
                    <ChevronRight size={18} className="text-[#007BFF] transition-colors" />
                  </button>

                  <button className="bg-[#F1F3F5] rounded-[5px] h-[42px] py-[10px] px-4 flex items-center justify-between hover:bg-[#E9ECEF] transition-colors group">
                    <span className="text-[14px] font-medium text-[#1A1A1A]">Azioni automatiche</span>
                    <ChevronRight size={18} className="text-[#007BFF] transition-colors" />
                  </button>

                  <button className="bg-[#F1F3F5] rounded-[5px] h-[42px] py-[10px] px-4 flex items-center justify-between hover:bg-[#E9ECEF] transition-colors group">
                    <span className="text-[14px] font-medium text-[#1A1A1A]">Registrazioni chiamate</span>
                    <ChevronRight size={18} className="text-[#007BFF] transition-colors" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
const DialPadIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M4.83372 6.56373C5.78935 6.56373 6.56404 5.78904 6.56404 4.83341C6.56404 3.87778 5.78935 3.10309 4.83372 3.10309C3.87809 3.10309 3.10339 3.87778 3.10339 4.83341C3.10339 5.78904 3.87809 6.56373 4.83372 6.56373Z" fill="currentColor"/>
      <path d="M4.83372 13.7299C5.78935 13.7299 6.56404 12.9552 6.56404 11.9996C6.56404 11.0439 5.78935 10.2693 4.83372 10.2693C3.87809 10.2693 3.10339 11.0439 3.10339 11.9996C3.10339 12.9552 3.87809 13.7299 4.83372 13.7299Z" fill="currentColor"/>
      <path d="M12.0002 6.56373C12.9558 6.56373 13.7305 5.78904 13.7305 4.83341C13.7305 3.87778 12.9558 3.10309 12.0002 3.10309C11.0445 3.10309 10.2698 3.87778 10.2698 4.83341C10.2698 5.78904 11.0445 6.56373 12.0002 6.56373Z" fill="currentColor"/>
      <path d="M12.0002 13.7299C12.9558 13.7299 13.7305 12.9552 13.7305 11.9996C13.7305 11.0439 12.9558 10.2693 12.0002 10.2693C11.0445 10.2693 10.2698 11.0439 10.2698 11.9996C10.2698 12.9552 11.0445 13.7299 12.0002 13.7299Z" fill="currentColor"/>
      <path d="M12.0002 20.8969C12.9558 20.8969 13.7305 20.1222 13.7305 19.1666C13.7305 18.211 12.9558 17.4363 12.0002 17.4363C11.0445 17.4363 10.2698 18.211 10.2698 19.1666C10.2698 20.1222 11.0445 20.8969 12.0002 20.8969Z" fill="currentColor"/>
      <path d="M19.1663 6.56373C20.122 6.56373 20.8967 5.78904 20.8967 4.83341C20.8967 3.87778 20.122 3.10309 19.1663 3.10309C18.2107 3.10309 17.436 3.87778 17.436 4.83341C17.436 5.78904 18.2107 6.56373 19.1663 6.56373Z" fill="currentColor"/>
      <path d="M19.1663 13.7299C20.122 13.7299 20.8967 12.9552 20.8967 11.9996C20.8967 11.0439 20.122 10.2693 19.1663 10.2693C18.2107 10.2693 17.436 11.0439 17.436 11.9996C17.436 12.9552 18.2107 13.7299 19.1663 13.7299Z" fill="currentColor"/>
    </svg>
  );
};

const AllContactsIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1.0293 5.85938H3.00077" stroke="currentColor" strokeLinecap="round"/>
    <path d="M1.0293 12.1406H3.00077" stroke="currentColor" strokeLinecap="round"/>
    <path d="M1.0293 9.00049H3.00077" stroke="currentColor" strokeLinecap="round"/>
    <path d="M12.0001 12.375V11.625C12.0001 11.2272 11.842 10.8457 11.5607 10.5644C11.2794 10.2831 10.8978 10.125 10.5 10.125H7.50002C7.10219 10.125 6.72065 10.2831 6.43935 10.5644C6.15804 10.8457 6 11.2272 6 11.625V12.375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.00004 8.62502C9.82844 8.62502 10.5 7.95345 10.5 7.12502C10.5 6.29658 9.82844 5.625 9.00004 5.625C8.17158 5.625 7.5 6.29658 7.5 7.12502C7.5 7.95345 8.17158 8.62502 9.00004 8.62502Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.9648 2.40234H4.03399C2.9182 2.40234 2.01367 3.30687 2.01367 4.42266V13.5777C2.01367 14.6935 2.9182 15.598 4.03399 15.598H13.9648C15.0807 15.598 15.9852 14.6935 15.9852 13.5777V4.42266C15.9852 3.30687 15.0807 2.40234 13.9648 2.40234Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InternalContactsIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M9.40235 10.4331C9.67635 10.4331 9.89844 10.211 9.89844 9.93701C9.89844 9.66301 9.67635 9.44092 9.40235 9.44092C9.12834 9.44092 8.90625 9.66301 8.90625 9.93701C8.90625 10.211 9.12834 10.4331 9.40235 10.4331Z" stroke="currentColor"/>
    <path d="M9.39988 13.5146C9.67468 13.5146 9.89741 13.2919 9.89741 13.0171C9.89741 12.7423 9.67468 12.5195 9.39988 12.5195C9.12508 12.5195 8.90234 12.7423 8.90234 13.0171C8.90234 13.2919 9.12508 13.5146 9.39988 13.5146Z" stroke="currentColor"/>
    <path d="M12.5405 10.436C12.8153 10.436 13.038 10.2133 13.038 9.93845C13.038 9.66365 12.8153 9.44092 12.5405 9.44092C12.2657 9.44092 12.043 9.66365 12.043 9.93845C12.043 10.2133 12.2657 10.436 12.5405 10.436Z" stroke="currentColor"/>
    <path d="M12.5405 13.5146C12.8153 13.5146 13.038 13.2919 13.038 13.0171C13.038 12.7423 12.8153 12.5195 12.5405 12.5195C12.2657 12.5195 12.043 12.7423 12.043 13.0171C12.043 13.2919 12.2657 13.5146 12.5405 13.5146Z" stroke="currentColor"/>
    <path d="M14.3447 1.6499H3.65627C2.74369 1.6499 2.00391 2.38969 2.00391 3.30226V14.8971C2.00391 15.8097 2.74369 16.5495 3.65627 16.5495H14.3447C15.2573 16.5495 15.9971 15.8097 15.9971 14.8971V3.30226C15.9971 2.38969 15.2573 1.6499 14.3447 1.6499Z" stroke="currentColor" strokeLinejoin="round"/>
    <path d="M5.94531 1.6499V16.5495" stroke="currentColor"/>
    <path d="M5.94531 6.63525L15.9975 6.63526" stroke="currentColor"/>
  </svg>
);

const SharedContactsIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10.8494 8.03174H10.1973V9.26117H10.8494V8.03174Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.79863 8.03174H7.14648V9.26117H7.79863V8.03174Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.8494 4.58936H10.1973V5.8188H10.8494V4.58936Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.79863 4.58936H7.14648V5.8188H7.79863V4.58936Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.4661 16.3893V12.4241H7.53363V16.3861H3.96289V1.61035H14.0379V16.3861H10.4661V16.3893Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PersonalContactsIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FavoriteContactsIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16.4609 6.51867L11.1586 6.3188L9.54732 1.50723C9.50605 1.39511 9.43137 1.29835 9.33335 1.23C9.2354 1.16166 9.11882 1.125 8.99934 1.125C8.87985 1.125 8.76328 1.16166 8.66525 1.23C8.56731 1.29835 8.49263 1.39511 8.45136 1.50723L6.84002 6.3188H1.50294C1.34996 6.31909 1.20333 6.38 1.09516 6.48817C0.986982 6.59635 0.926078 6.74298 0.925782 6.89596C0.925717 6.92885 0.929485 6.96164 0.93701 6.99366C0.944584 7.07523 0.970167 7.1541 1.01192 7.22458C1.05367 7.29507 1.11054 7.35542 1.17843 7.40126L5.53522 10.4735L3.86325 15.3356C3.82374 15.4509 3.82169 15.5758 3.85739 15.6923C3.89307 15.8089 3.96469 15.9112 4.062 15.9846C4.15223 16.0651 4.26605 16.1143 4.38651 16.125C4.51637 16.1156 4.64111 16.0705 4.74696 15.9947L9.00044 12.9629L13.2539 15.9947C13.359 16.0721 13.4842 16.1174 13.6143 16.125C13.7345 16.1169 13.8481 16.0673 13.9355 15.9846C14.0336 15.9119 14.1059 15.8096 14.1417 15.6928C14.1774 15.576 14.1748 15.4508 14.1343 15.3356L12.4601 10.4735L16.7809 7.3687L16.8853 7.27886C16.9928 7.1777 17.0595 7.04069 17.0729 6.89371C17.0729 6.57482 16.7775 6.51867 16.4609 6.51867Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Aaron Copland', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=aaron', phone: '340 1234567', type: 'interno', isFavorite: true },
  { id: '2', name: 'Alban Berg', department: 'Sales', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alban', phone: '341 2345678', type: 'interno' },
  { id: '3', name: 'Amy Beach', department: 'HR', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=amy', phone: '342 3456789', type: 'interno' },
  { id: '4', name: 'Barbara Strozzi', department: 'IT', status: 'busy', avatar: 'https://i.pravatar.cc/150?u=barbara', phone: '343 4567890', type: 'interno' },
  { id: '5', name: 'Benjamin Britten', department: 'Legal', status: 'online', avatar: 'https://i.pravatar.cc/150?u=benjamin', phone: '344 5678901', type: 'interno' },
  { id: '6', name: 'Bedřich Smetana', department: 'Finance', status: 'online', avatar: 'https://i.pravatar.cc/150?u=bedrich', phone: '345 6789012', type: 'interno' },
  { id: '7', name: 'Mario Rossi', department: 'Marketing', status: 'online', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=150&h=150', phone: '340 1234567', type: 'interno', isFavorite: true },
  { id: '8', name: 'Jane Smith', department: 'Sales', status: 'online', avatar: 'https://i.pravatar.cc/150?u=jane', phone: '347 8901234', type: 'interno', isFavorite: true },
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
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isCallSidebarExpanded, setIsCallSidebarExpanded] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchExpanded(false);
        setIsAddMenuOpen(false);
      }
    };

    if (isSearchExpanded || isAddMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchExpanded, isAddMenuOpen]);

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
          <PhoneIcon size={40} />
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
      <div className="hidden lg:flex h-screen w-full flex-row overflow-hidden bg-white">
        <div className="flex flex-col flex-1 overflow-hidden">
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
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#007BFF]">
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
                      {!isSearchExpanded && <DialPadIcon size={18} />}
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
                                    <MeetingIcon size={14} />
                                    <ChatIcon size={14} />
                                    <PhoneIcon size={14} />
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
                            <PhoneIcon size={16} />
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

          <div className="flex flex-1 overflow-hidden relative">
            {/* Main Sidebar (Icons) */}
            <aside className="w-[64px] flex flex-col items-center py-4 border-r border-[#E9ECEF] bg-white shrink-0">
              <nav className="flex flex-col gap-8 items-center flex-1">
              <SidebarIcon 
                icon={<AllContactsIcon size={18} />} 
                label="Contatti" 
                active={activeNav === 'Contatti'} 
                onClick={() => setActiveNav('Contatti')} 
              />
              <SidebarIcon 
                icon={<PhoneIcon size={18} />} 
                label="Recenti" 
                active={activeNav === 'Recenti'} 
                onClick={() => setActiveNav('Recenti')} 
              />
              <SidebarIcon 
                icon={<MeetingIcon size={18} />} 
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
                      icon={<AllContactsIcon />} 
                      label="Tutti" 
                      active={activeCategory === 'Tutti'} 
                      onClick={() => setActiveCategory('Tutti')} 
                    />
                    <CategoryItem 
                      icon={<InternalContactsIcon />} 
                      label="Interni" 
                      active={activeCategory === 'Interni'} 
                      onClick={() => setActiveCategory('Interni')} 
                      showInfo
                    />
                    <CategoryItem 
                      icon={<SharedContactsIcon />} 
                      label="Condivisi" 
                      active={activeCategory === 'Condivisi'} 
                      onClick={() => setActiveCategory('Condivisi')} 
                      showInfo
                    />
                    <CategoryItem 
                      icon={<PersonalContactsIcon />} 
                      label="Personali" 
                      active={activeCategory === 'Personali'} 
                      onClick={() => setActiveCategory('Personali')} 
                      showInfo
                    />
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#E9ECEF]">
                    <CategoryItem 
                      icon={<FavoriteContactsIcon />} 
                      label="Preferiti" 
                      active={activeCategory === 'Preferiti'} 
                      onClick={() => setActiveCategory('Preferiti')} 
                    />
                  </div>
                </div>

                <div ref={addMenuRef}>
                  <AnimatePresence>
                    {isAddMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-[70px] left-4 right-4 bg-white rounded-[5px] shadow-2xl border border-[#E9ECEF] overflow-hidden z-50"
                      >
                        <button 
                          onClick={() => setIsAddMenuOpen(false)}
                          className="w-full px-4 py-3 text-[13px] text-[#007BFF] font-medium hover:bg-[#F8F9FA] transition-colors text-center border-b border-[#E9ECEF]"
                        >
                          Crea nuovo contatto personale
                        </button>
                        <button 
                          onClick={() => setIsAddMenuOpen(false)}
                          className="w-full px-4 py-3 text-[13px] text-[#007BFF] font-medium hover:bg-[#F8F9FA] transition-colors text-center"
                        >
                          Aggiungi preferiti
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
                    className={`absolute bottom-6 right-6 w-9 h-9 bg-[#007BFF] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#0056b3] transition-all duration-200 z-50`}
                  >
                    {isAddMenuOpen ? <X size={20} /> : <Plus size={20} />}
                  </button>
                </div>
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
          ) : activeNav === 'Impostazioni' ? (
            <SettingsView />
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#6C757D]">
              Sezione {activeNav} in fase di sviluppo
            </div>
          )}
        </div>
      </div>

      {/* Call in Progress Sidebar */}
        <aside 
          className={`transition-all duration-300 ease-in-out border-l border-[#E9ECEF] bg-black flex flex-col shrink-0 overflow-hidden relative ${
            isCallSidebarExpanded ? 'w-[320px]' : 'w-[66px]'
          }`}
        >
            <div className="flex-1 flex flex-col p-0 overflow-y-auto">
              {isCallSidebarExpanded ? (
                <>
                  {/* Active Call */}
                  <div className="bg-[#222426] rounded-none p-4 mb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <img 
                            src={MOCK_CONTACTS[6].avatar} 
                            alt={MOCK_CONTACTS[6].name} 
                            className="w-full h-full rounded-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-[15px]">{MOCK_CONTACTS[6].name}</h3>
                          <p className="text-[#ADB5BD] text-[13px]">{MOCK_CONTACTS[6].phone}</p>
                        </div>
                      </div>
                      <span className="text-white text-[13px] font-sans">3:40</span>
                    </div>

                    {/* Call Controls Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <CallControlButton icon={<MicOff size={18} />} label="Muto" />
                      <CallControlButton icon={<DialPadIcon size={18} />} label="Tastierino" />
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 3L6 15" stroke="white" stroke-linecap="round"/>
                            <path d="M12 3L12 15" stroke="white" stroke-linecap="round"/>
                          </svg>
                        } 
                        label="Attesa" 
                      />
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.25 3.75L4.5 6.75H1.5V11.25H4.5L8.25 14.25V3.75Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.3038 3.69751C15.7098 5.10397 16.4996 7.01128 16.4996 9.00001C16.4996 10.9887 15.7098 12.8961 14.3038 14.3025M11.6562 6.34501C12.3593 7.04824 12.7542 8.00189 12.7542 8.99626C12.7542 9.99063 12.3593 10.9443 11.6562 11.6475" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        } 
                        label="Impostazioni" 
                      />
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="white"/>
                            <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" fill="white"/>
                          </svg>
                        } 
                        label="Registra" 
                      />
                      <CallControlButton icon={<PhoneIcon size={18} className="rotate-[135deg]" fill="white" />} label="Chiudi" variant="danger" />
                    </div>
                  </div>

                  {/* On Hold Call */}
                  <div className="bg-black border-t border-[#222426] rounded-none p-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                          <img 
                            src={MOCK_CONTACTS[7].avatar} 
                            alt={MOCK_CONTACTS[7].name} 
                            className="w-full h-full rounded-full object-cover opacity-60" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium text-[15px]">{MOCK_CONTACTS[7].name}</h3>
                          <p className="text-[#ADB5BD] text-[13px]">Chiamata in attesa...</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 3L6 15" stroke="white" stroke-linecap="round"/>
                          <path d="M12 3L12 15" stroke="white" stroke-linecap="round"/>
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_10761_48790)">
                              <path d="M17.1357 12.6978L14.1772 15.6562L11.2188 12.6978" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9.73828 2.34375H11.2182C12.0028 2.34375 12.7553 2.65545 13.3102 3.21027C13.865 3.76509 14.1767 4.51759 14.1767 5.30223V15.6562" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M0.863281 5.30223L3.82176 2.34375L6.78025 5.30223" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8.26263 15.6562H6.7827C5.99806 15.6562 5.24556 15.3445 4.69074 14.7897C4.13592 14.2349 3.82422 13.4824 3.82422 12.6978V2.34375" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_10761_48790">
                                <rect width="18" height="18" fill="white"/>
                              </clipPath>
                            </defs>
                          </svg>
                        } 
                        label="Scambia" 
                      />
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.99219 16.5C5.49235 15.7822 6.75885 14.6547 7.64539 13.2477C8.53192 11.8407 9.00232 10.2115 9.00223 8.54852V1.5" stroke="white" strokeMiterlimit="10" strokeLinecap="round"/>
                            <path d="M14.01 16.5C12.5101 15.7823 11.2437 14.655 10.3572 13.2483C9.47071 11.8416 9.00019 10.2127 9 8.54995V1.5" stroke="white" strokeMiterlimit="10" strokeLinecap="round"/>
                            <path d="M5.55469 4.9453L8.99999 1.5L12.4453 4.9453" stroke="white" strokeMiterlimit="10" strokeLinecap="round"/>
                          </svg>
                        } 
                        label="Unisci" 
                      />
                      <CallControlButton 
                        icon={
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.96054 5.53882L15.75 5.53882" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.6425 2.25L15.8398 5.44737L12.6425 8.64473" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.0395 12.4612L2.25 12.4612" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.35752 15.75L2.16016 12.5526L5.35752 9.35527" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        } 
                        label="Trasferisci" 
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-6 pt-4">
                  <div className="relative w-10 h-10">
                    <img 
                      src={MOCK_CONTACTS[6].avatar} 
                      alt={MOCK_CONTACTS[6].name} 
                      className="w-full h-full rounded-full object-cover border-[1.5px] border-[#28A745]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img 
                      src={MOCK_CONTACTS[7].avatar} 
                      alt={MOCK_CONTACTS[7].name} 
                      className="w-full h-full rounded-full object-cover opacity-60" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3L6 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 3L12 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Button */}
            <button 
              onClick={() => setIsCallSidebarExpanded(!isCallSidebarExpanded)}
              className="absolute bottom-6 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-50 border border-white/20"
            >
              {isCallSidebarExpanded ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
            </button>
          </aside>
      </div>
    </>
  );
}

function CallControlButton({ icon, label, variant = 'default' }: { icon: React.ReactNode, label: string, variant?: 'default' | 'danger' }) {
  return (
    <button className="flex flex-col items-center gap-1 group w-full">
      <div className={`w-full h-[52px] flex flex-col items-center justify-center rounded-[8px] transition-colors ${
        variant === 'danger' 
          ? 'bg-[#E03131] text-white hover:bg-[#C92A2A]' 
          : 'bg-[#383A3C] text-white hover:bg-[#4A4C4E]'
      }`}>
        {icon}
        <span className="text-[10px] mt-0.5 opacity-80">{label}</span>
      </div>
    </button>
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
          {call.type === 'incoming' && <PhoneIcon size={16} className="text-[#007BFF]" />}
          {call.type === 'outgoing' && <PhoneIcon size={16} className="text-[#6C757D]" />}
          {call.type === 'missed' && <PhoneIcon size={16} className="text-[#DC3545]" />}
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
            <ActionButton icon={<MeetingIcon size={18} />} color="#007BFF" />
            <ActionButton icon={<ChatIcon size={18} />} color="#007BFF" />
            <ActionButton icon={<PhoneIcon size={18} />} color="#007BFF" />
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
