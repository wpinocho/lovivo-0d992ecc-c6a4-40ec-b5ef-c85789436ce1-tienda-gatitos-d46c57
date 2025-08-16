import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';

interface KittenCardProps {
  kitten: Kitten;
  onViewDetails: (kitten: Kitten) => void;
}

const KittenCard = ({ kitten, onViewDetails }: KittenCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(kitten);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
      <div className="relative" onClick={() => onViewDetails(kitten)}>
        <img
          src={kitten.image}
          alt={kitten.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={kitten.available ? "default" : "secondary"}>
            {kitten.available ? "Disponible" : "No disponible"}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{kitten.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">4.8</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{kitten.breed}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {kitten.description}
        </p>
        <div className="flex gap-2 mb-2">
          <Badge variant="outline">{kitten.age} {kitten.age === 1 ? 'año' : 'años'}</Badge>
          <Badge variant="outline">{kitten.gender === 'male' ? 'Macho' : 'Hembra'}</Badge>
          {kitten.vaccinated && <Badge variant="outline">Vacunado</Badge>}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="text-2xl font-bold text-primary">
          ${kitten.price.toLocaleString()}
        </div>
        <Button 
          onClick={handleAddToCart}
          disabled={!kitten.available}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Adoptar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KittenCard;