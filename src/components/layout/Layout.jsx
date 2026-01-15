import { useState } from 'react';
import { Navbar } from '../common/Navbar';
import { Sidebar } from '../common/Sidebar';

export const Layout = ({ children, showSidebar = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA' }}>
      <Navbar />
      
      <div style={{ display: 'flex', position: 'relative' }}>
        {/* Mobile Menu Button */}
        {showSidebar && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#0070BA',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 12px rgba(0, 112, 186, 0.4)',
              cursor: 'pointer',
              display: window.innerWidth < 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              fontSize: '24px'
            }}
          >
            ☰
          </button>
        )}

        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 90,
                  display: window.innerWidth < 768 ? 'block' : 'none'
                }}
              />
            )}

            <div
              style={{
                position: window.innerWidth < 768 ? 'fixed' : 'relative',
                left: window.innerWidth < 768 ? (sidebarOpen ? 0 : '-250px') : 0,
                top: window.innerWidth < 768 ? 0 : 'auto',
                height: window.innerWidth < 768 ? '100vh' : 'auto',
                zIndex: 100,
                transition: 'left 0.3s ease',
                width: '250px'
              }}
            >
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </>
        )}
        
        <main
          style={{
            flex: 1,
            padding: window.innerWidth < 640 ? '16px' : '24px',
            width: '100%',
            maxWidth: showSidebar && window.innerWidth >= 768 ? 'calc(100% - 250px)' : '100%'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};