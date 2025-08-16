import React from 'react';
import { Heart, ShoppingCart, Star, Calendar, Stethoscope, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';

interface KittenDetailsModalProps {
  kitten: Kitten | null;
  isOpen: boolean;
  onClose: () => void;
}

const KittenDetailsModal = ({ kitten, isOpen, onClose }: KittenDetailsModalProps) => {
  const { addToCart } = useCart();

  if (!kitten) return null;

  const handleAddToCart = () => {
    addToCart(kitten);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{kitten.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img
              src={kitten.image}
              alt={kitten.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge variant={kitten.available ? "default" : "secondary"} className="text-sm">
                {kitten.available ? "Disponible" : "No disponible"}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Raza:</span>
                <span className="text-sm">{kitten.breed}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Edad:</span>
                <span className="text-sm">{kitten.age} {kitten.age === 1 ? 'año' : 'años'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Género:</span>
                <span className="text-sm">{kitten.gender === 'male' ? 'Macho' : 'Hembra'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Vacunado:</span>
                <Badge variant={kitten.vaccinated ? "default" : "secondary"} className="text-xs">
                  {kitten.vaccinated ? "Sí" : "No"}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">Calificación:</span>
                <span className="text-sm">4.8/5</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">{kitten.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Características especiales</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Cariñoso</Badge>
              <Badge variant="outline">Juguetón</Badge>
              <Badge variant="outline">Sociable</Badge>
              <Badge variant="outline">Inteligente</Badge>
              {kitten.vaccinated && <Badge variant="outline">Vacunado</Badge>}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-primary">
              ${kitten.price.toLocaleString()}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleAddToCart}
                disabled={!kitten.available}
                className="flex items-center gap-2"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4" />
                {kitten.available ? 'Adoptar Ahora' : 'No Disponible'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KittenDetailsModal;