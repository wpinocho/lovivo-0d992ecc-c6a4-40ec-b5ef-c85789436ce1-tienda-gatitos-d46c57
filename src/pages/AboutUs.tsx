import React from 'react';
import { Heart, Shield, Award, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  console.log('AboutUs page loaded');

  const values = [
    {
      icon: Heart,
      title: "Amor y Cuidado",
      description: "Cada gatito recibe amor incondicional y cuidados especializados desde el primer día."
    },
    {
      icon: Shield,
      title: "Salud Garantizada",
      description: "Todos nuestros gatitos están vacunados, desparasitados y con certificado veterinario."
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Trabajamos solo con criadores certificados que mantienen los más altos estándares."
    },
    {
      icon: Users,
      title: "Familias Felices",
      description: "Más de 1,000 familias han encontrado su compañero perfecto con nosotros."
    }
  ];

  const team = [
    {
      name: "María González",
      role: "Fundadora y Veterinaria",
      description: "Con más de 15 años de experiencia en cuidado felino, María fundó Gatitos Adorables con la misión de conectar familias con sus compañeros perfectos.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Carlos Rodríguez",
      role: "Especialista en Comportamiento",
      description: "Experto en comportamiento felino, Carlos se asegura de que cada gatito esté socializado y listo para su nuevo hogar.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Ana Martínez",
      role: "Coordinadora de Adopciones",
      description: "Ana se encarga de hacer el match perfecto entre las familias y los gatitos, asegurando adopciones exitosas.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            Conectando corazones felinos con familias amorosas desde 2015
          </p>
        </div>
      </div>

      {/* Nuestra Historia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Gatitos Adorables nació en 2015 del amor profundo por los felinos y el deseo de crear 
                  conexiones especiales entre gatitos y familias. Lo que comenzó como un pequeño refugio 
                  en el garaje de María González, se ha convertido en la tienda de gatitos más confiable 
                  de la región.
                </p>
                <p>
                  Durante estos años, hemos ayudado a más de 1,000 gatitos a encontrar su hogar perfecto, 
                  siempre priorizando su bienestar y salud. Cada adopción es una historia de amor que nos 
                  motiva a seguir adelante.
                </p>
                <p>
                  Trabajamos de la mano con veterinarios especializados, criadores éticos y organizaciones 
                  de rescate para asegurar que cada gatito reciba el mejor cuidado posible antes de llegar 
                  a su nueva familia.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop" 
                alt="Gatitos jugando"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">1000+</div>
                  <div className="text-sm text-muted-foreground">Adopciones Exitosas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estos principios guían cada decisión que tomamos y cada gatito que cuidamos
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Conoce Nuestro Equipo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profesionales apasionados dedicados al bienestar de los gatitos y la satisfacción de las familias
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Nuestro Compromiso</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Gatitos vacunados y con certificado de salud</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">30 días</div>
                <p className="text-sm text-muted-foreground">Garantía de salud y soporte post-adopción</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Asesoría veterinaria disponible</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-8">
              Nos comprometemos a brindar transparencia total en nuestros procesos, cuidado excepcional 
              para cada gatito, y apoyo continuo a las familias adoptivas. Tu nueva mascota no es solo 
              una venta para nosotros, es el comienzo de una relación de por vida.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                Conoce Nuestros Gatitos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;