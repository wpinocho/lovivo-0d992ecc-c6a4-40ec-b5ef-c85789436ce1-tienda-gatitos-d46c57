import React from 'react';
import { Heart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from './Cart';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Gatitos Adorables</h1>
              <p className="text-xs text-muted-foreground">Tu tienda de adopción favorita</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Inicio</Button>
          <Button variant="ghost">Catálogo</Button>
          <Button variant="ghost">Sobre Nosotros</Button>
          <Button variant="ghost">Contacto</Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;