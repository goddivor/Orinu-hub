export interface Orinu {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  views: number;
  likes: number;
  chapters: number;
  rating: number;
  description: string;
  publishDay?: string; // Pour les Orinu hebdo
}

export const mockOrinus: Orinu[] = [
  {
    id: "1",
    title: "Les Guerriers de la Nuit",
    author: "Kofi Mensah",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    category: "action",
    views: 15420,
    likes: 2340,
    chapters: 24,
    rating: 4.8,
    description: "Une épopée mystique sur les gardiens ancestraux de l'Afrique",
    publishDay: "monday"
  },
  {
    id: "2",
    title: "L'Âme du Baobab",
    author: "Aminata Diallo",
    coverImage: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    category: "mystical",
    views: 12890,
    likes: 1890,
    chapters: 18,
    rating: 4.6,
    description: "Un voyage spirituel à travers les mystères de la savane",
    publishDay: "wednesday"
  },
  {
    id: "3",
    title: "Chroniques d'Abidjan",
    author: "Jean-Pierre Kouassi",
    coverImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=600&fit=crop",
    category: "drama",
    views: 9560,
    likes: 1450,
    chapters: 32,
    rating: 4.5,
    description: "La vie quotidienne dans la capitale ivoirienne",
    publishDay: "friday"
  },
  {
    id: "4",
    title: "Le Royaume Oublié",
    author: "Zara Ndiaye",
    coverImage: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=400&h=600&fit=crop",
    category: "fantasy",
    views: 18900,
    likes: 3200,
    chapters: 15,
    rating: 4.9,
    description: "À la recherche d'un empire perdu dans les sables du temps",
    publishDay: "sunday"
  },
  {
    id: "5",
    title: "Rythmes Urbains",
    author: "Malik Touré",
    coverImage: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&h=600&fit=crop",
    category: "comedy",
    views: 7800,
    likes: 1120,
    chapters: 28,
    rating: 4.3,
    description: "Comédie musicale dans les rues de Dakar",
    publishDay: "tuesday"
  },
  {
    id: "6",
    title: "Les Étoiles de Tombouctou",
    author: "Fatoumata Sanogo",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    category: "adventure",
    views: 14320,
    likes: 2100,
    chapters: 21,
    rating: 4.7,
    description: "Une quête aventureuse à travers le désert malien",
    publishDay: "thursday"
  },
  {
    id: "7",
    title: "Amour au Clair de Lune",
    author: "Yves Koffi",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    category: "romance",
    views: 11200,
    likes: 1890,
    chapters: 16,
    rating: 4.4,
    description: "Une histoire d'amour sous les tropiques",
    publishDay: "saturday"
  },
  {
    id: "8",
    title: "Cyber Lagos 2099",
    author: "Nneka Okonkwo",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
    category: "scifi",
    views: 16780,
    likes: 2890,
    chapters: 12,
    rating: 4.8,
    description: "Un futur dystopique dans la mégalopole nigériane",
    publishDay: "monday"
  },
  {
    id: "9",
    title: "Les Masques Sacrés",
    author: "Kwame Asante",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop",
    category: "mystical",
    views: 13450,
    likes: 2010,
    chapters: 19,
    rating: 4.6,
    description: "Les secrets des masques ancestraux révélés",
    publishDay: "wednesday"
  },
  {
    id: "10",
    title: "Chasseurs de Trésors",
    author: "Aïcha Traoré",
    coverImage: "https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=400&h=600&fit=crop",
    category: "adventure",
    views: 10890,
    likes: 1670,
    chapters: 25,
    rating: 4.5,
    description: "À la recherche de reliques perdues en Afrique de l'Ouest",
    publishDay: "friday"
  },
  {
    id: "11",
    title: "Le Chant des Ancêtres",
    author: "Seydou Camara",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "mystical",
    views: 15670,
    likes: 2450,
    chapters: 20,
    rating: 4.7,
    description: "Communication avec les esprits ancestraux",
    publishDay: "sunday"
  },
  {
    id: "12",
    title: "Danse avec les Lions",
    author: "Nabila Hassan",
    coverImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
    category: "action",
    views: 17890,
    likes: 3100,
    chapters: 22,
    rating: 4.9,
    description: "Guerrière masaï face aux défis de son clan",
    publishDay: "thursday"
  }
];

export const categories = [
  { id: "action", name: "Action", color: "#FF6B35" },
  { id: "adventure", name: "Aventure", color: "#F7931E" },
  { id: "mystical", name: "Mystique", color: "#8A5CD8" },
  { id: "romance", name: "Romance", color: "#FF69B4" },
  { id: "comedy", name: "Comédie", color: "#FFD700" },
  { id: "drama", name: "Drame", color: "#4A90E2" },
  { id: "fantasy", name: "Fantastique", color: "#9B59B6" },
  { id: "scifi", name: "Science-Fiction", color: "#3498DB" }
];

export const weekDays = [
  { id: "monday", label: "Lundi" },
  { id: "tuesday", label: "Mardi" },
  { id: "wednesday", label: "Mercredi" },
  { id: "thursday", label: "Jeudi" },
  { id: "friday", label: "Vendredi" },
  { id: "saturday", label: "Samedi" },
  { id: "sunday", label: "Dimanche" }
];
