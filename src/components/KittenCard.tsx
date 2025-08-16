import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface KittenCardProps {
  kitten: Kitten;
  onViewDetails: (kitten: Kitten) => void;
}

const KittenCard = ({ kitten, onViewDetails }: KittenCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  console.log('KittenCard rendered for:', kitten.name);

  const handleAddToCart = () => {
    console.log('Adding kitten to cart:', kitten.name);
    addItem(kitten);
    toast({
      title: "¡Agregado al carrito!",
      description: `${kitten.name} ha sido agregado a tu carrito.`,
    });
  };

  const handleViewDetails = () => {
    console.log('Viewing details for:', kitten.name);
    onViewDetails(kitten);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={kitten.image} 
          alt={kitten.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90">
            {kitten.age} {kitten.age === 1 ? 'año' : 'años'}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant={kitten.gender === 'Macho' ? 'default' : 'secondary'}>
            {kitten.gender}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{kitten.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-pink-600">${kitten.price}</div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{kitten.breed}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {kitten.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {kitten.vaccinated && (
            <Badge variant="outline" className="text-xs">Vacunado</Badge>
          )}
          {kitten.neutered && (
            <Badge variant="outline" className="text-xs">Esterilizado</Badge>
          )}
          {kitten.healthCertificate && (
            <Badge variant="outline" className="text-xs">Certificado</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewDetails}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-1" />
          Ver Detalles
        </Button>
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          Adoptar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KittenCard;