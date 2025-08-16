import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5" />
          <h3 className="font-semibold">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar gatitos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={breedFilter} onValueChange={onBreedChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las razas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las razas</SelectItem>
              <SelectItem value="Persa">Persa</SelectItem>
              <SelectItem value="Maine Coon">Maine Coon</SelectItem>
              <SelectItem value="Siamés">Siamés</SelectItem>
              <SelectItem value="Británico de Pelo Corto">Británico de Pelo Corto</SelectItem>
              <SelectItem value="Bengalí">Bengalí</SelectItem>
              <SelectItem value="Ragdoll">Ragdoll</SelectItem>
              <SelectItem value="Abisinio">Abisinio</SelectItem>
              <SelectItem value="Angora Turco">Angora Turco</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={genderFilter} onValueChange={onGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos los géneros" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los géneros</SelectItem>
              <SelectItem value="male">Macho</SelectItem>
              <SelectItem value="female">Hembra</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priceRange} onValueChange={onPriceRangeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Rango de precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los precios</SelectItem>
              <SelectItem value="0-500">$0 - $500</SelectItem>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
              <SelectItem value="1500+">$1,500+</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={onClearFilters} className="w-full">
            Limpiar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KittenFilters;