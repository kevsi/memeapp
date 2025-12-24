import { Camera, Search as SearchIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';

const SUGGESTED = [
  { id: '1', title: 'Emoji drôle', image: 'https://picsum.photos/600/400?random=21' },
  { id: '2', title: 'Animation 3d', image: 'https://picsum.photos/600/400?random=22' },
  { id: '3', title: 'Images drôles', image: 'https://picsum.photos/600/400?random=23' },
  { id: '4', title: 'Formation photoshop', image: 'https://picsum.photos/600/400?random=24' },
  { id: '5', title: 'Naruto', image: 'https://picsum.photos/600/400?random=25' },
  { id: '6', title: 'Otaku', image: 'https://picsum.photos/600/400?random=26' },
];

const POPULAR = [
  { id: '1', title: 'Wallpaper pc', image: 'https://picsum.photos/800/600?random=31' },
  { id: '2', title: 'Dessins significatifs', image: 'https://picsum.photos/800/600?random=32' },
  { id: '3', title: 'Idées logo', image: 'https://picsum.photos/800/600?random=33' },
  { id: '5', title: 'Gojo satoru', image: 'https://picsum.photos/800/600?random=34' },
];

export const screenOptions = {
  headerShown: false,
};

export default function SearchScreenWeb() {
  const [query, setQuery] = useState('');

  const handleCameraClick = () => {
    alert('Image picker - feature available on mobile');
  };

  const renderTile = (item: { id: string; title: string; image: string }) => (
    <a
      key={item.id}
      href={`/meme/${item.id}`}
      className="rounded-2xl overflow-hidden relative block h-32 group hover:opacity-80 transition-opacity"
    >
      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors flex items-center justify-center p-2">
        <p className="text-white text-center font-black text-sm leading-tight whitespace-pre-line">
          {item.title}
        </p>
      </div>
    </a>
  );

  return (
    <div className="flex-1 min-h-screen bg-black">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-black border-b border-gray-800 px-5 py-4">
        <div className="flex items-center gap-2 bg-gray-900 rounded-2xl px-4 py-3">
          <SearchIcon size={18} color="#999" strokeWidth={2} />
          <input
            type="text"
            placeholder="Rechercher"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1">
              <X size={16} color="#999" />
            </button>
          )}
          <button onClick={handleCameraClick} className="p-2 hover:bg-gray-800 rounded-full transition">
            <Camera size={18} color="#999" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto pb-20 px-5 py-6">
        {/* Suggested Section */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-black text-center mb-4">Des idées pour vous</h2>
          <div className="grid grid-cols-2 gap-4">
            {SUGGESTED.map((item) => renderTile(item))}
          </div>
        </div>

        {/* Popular Section */}
        <div>
          <h2 className="text-white text-2xl font-black text-center mb-4">Populaire sur Pinterest</h2>
          <div className="grid grid-cols-2 gap-4">
            {POPULAR.map((item) => renderTile(item))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
