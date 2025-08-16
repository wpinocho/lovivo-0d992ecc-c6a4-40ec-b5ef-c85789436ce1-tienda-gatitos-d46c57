import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, ShoppingCart, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Kitten } from '@/types/kitten';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface KittenDetailsModalProps {
  kitten: Kitten | null;
  isOpen: boolean;
  onClose: () => void;
}

const KittenDetailsModal = ({ kitten, isOpen, onClose }: KittenDetailsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  console.log('KittenDetailsModal rendered, kitten:', kitten?.name);

  if (!kitten) return null;

  const handleAddToCart = () => {
    console.log('Adding kitten to cart from modal:', kitten.name);
    addItem(kitten);
    toast({
      title: "¡Agregado al carrito!",
      description: `${kitten.name} ha sido agregado a tu carrito.`,
    });
    onClose();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === kitten.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? kitten.images.length - 1 : prev - 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{kitten.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={kitten.images[currentImageIndex]} 
                alt={`${kitten.name} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-80 object-cover rounded-lg"
              />
              {kitten.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {kitten.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {kitten.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index ? 'border-pink-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${kitten.name} - Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{kitten.breed}</h3>
                  <p className="text-muted-foreground">{kitten.age} {kitten.age === 1 ? 'año' : 'años'}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-pink-600">${kitten.price}</div>
                  <Badge variant={kitten.gender === 'Macho' ? 'default' : 'secondary'}>
                    {kitten.gender}
                  </Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground">{kitten.description}</p>
            </div>

            <Separator />

            {/* Health Status */}
            <div>
              <h4 className="font-semibold mb-3">Estado de Salud</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {kitten.vaccinated ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm">Vacunado</span>
                </div>
                <div className="flex items-center gap-2">
                  {kitten.neutered ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm">Esterilizado</span>
                </div>
                <div className="flex items-center gap-2">
                  {kitten.healthCertificate ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <X className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm">Certificado de Salud</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personality */}
            <div>
              <h4 className="font-semibold mb-3">Personalidad</h4>
              <div className="flex flex-wrap gap-2">
                {kitten.personality.map((trait, index) => (
                  <Badge key={index} variant="outline">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {kitten.specialNeeds.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3">Necesidades Especiales</h4>
                  <div className="flex flex-wrap gap-2">
                    {kitten.specialNeeds.map((need, index) => (
                      <Badge key={index} variant="secondary">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Adoptar a {kitten.name}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KittenDetailsModal;