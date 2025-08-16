import React, { useState, useMemo } from 'react';
import { kittens } from '@/data/kittens';
import { Kitten } from '@/types/kitten';
import Header from '@/components/Header';
import KittenCard from '@/components/KittenCard';
import KittenFilters from '@/components/KittenFilters';
import KittenDetailsModal from '@/components/KittenDetailsModal';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedKitten, setSelectedKitten] = useState<Kitten | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Current filters:', { searchTerm, breedFilter, genderFilter, priceRange });

  const filteredKittens = useMemo(() => {
    return kittens.filter(kitten => {
      // Search filter
      const matchesSearch = kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           kitten.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Breed filter
      const matchesBreed = breedFilter === 'all' || kitten.breed === breedFilter;

      // Gender filter
      const matchesGender = genderFilter === 'all' || kitten.gender === genderFilter;

      // Price range filter
      let matchesPrice = true;
      if (priceRange !== 'all') {
        const price = kitten.price;
        switch (priceRange) {
          case '0-500':
            matchesPrice = price <= 500;
            break;
          case '500-1000':
            matchesPrice = price > 500 && price <= 1000;
            break;
          case '1000-1500':
            matchesPrice = price > 1000 && price <= 1500;
            break;
          case '1500+':
            matchesPrice = price > 1500;
            break;
        }
      }

      return matchesSearch && matchesBreed && matchesGender && matchesPrice;
    });
  }, [searchTerm, breedFilter, genderFilter, priceRange]);

  const handleViewDetails = (kitten: Kitten) => {
    console.log('Viewing details for kitten:', kitten.name);
    setSelectedKitten(kitten);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedKitten(null);
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
    setSearchTerm('');
    setBreedFilter('all');
    setGenderFilter('all');
    setPriceRange('all');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Encuentra tu Compañero Perfecto
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre gatitos adorables esperando un hogar lleno de amor. 
              Cada uno de nuestros felinos está vacunado y listo para ser parte de tu familia.
            </p>
          </div>

          {/* Filters */}
          <KittenFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            breedFilter={breedFilter}
            onBreedChange={setBreedFilter}
            genderFilter={genderFilter}
            onGenderChange={setGenderFilter}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
          />

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Mostrando {filteredKittens.length} de {kittens.length} gatitos
            </p>
          </div>

          {/* Kittens Grid */}
          {filteredKittens.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐱</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron gatitos</h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus filtros para ver más opciones
              </p>
              <button 
                onClick={handleClearFilters}
                className="text-primary hover:underline"
              >
                Limpiar todos los filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredKittens.map((kitten) => (
                <KittenCard
                  key={kitten.id}
                  kitten={kitten}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </main>

        {/* Kitten Details Modal */}
        <KittenDetailsModal
          kitten={selectedKitten}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </CartProvider>
  );
};

export default Index;