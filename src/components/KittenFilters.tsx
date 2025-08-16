import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface KittenFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  breedFilter: string;
  onBreedChange: (value: string) => void;
  genderFilter: string;
  onGenderChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  onClearFilters: () => void;
}

const KittenFilters = ({
  searchTerm,
  onSearchChange,
  breedFilter,
  onBreedChange,
  genderFilter,
  onGenderChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters
}: KittenFiltersProps) => {
  console.log('KittenFilters rendered with filters:', { searchTerm, breedFilter, genderFilter, priceRange });

  const breeds = [
    'Persa',
    'Maine Coon',
    'Siamés',
    'Británico de Pelo Corto',
    'Bengalí',
    'Ragdoll'
  ];

  const hasActiveFilters = searchTerm || breedFilter !== 'all' || genderFilter !== 'all' || priceRange !== 'all';

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Filtrar Gatitos</h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Limpiar filtros
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por nombre o raza..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Breed Filter */}
          <Select value={breedFilter} onValueChange={onBreedChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las razas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las razas</SelectItem>
              {breeds.map((breed) => (
                <SelectItem key={breed} value={breed}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Gender Filter */}
          <Select value={genderFilter} onValueChange={onGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los géneros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              <SelectItem value="Macho">Macho</SelectItem>
              <SelectItem value="Hembra">Hembra</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los precios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
              <SelectItem value="1500+">$1,500+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default KittenFilters;