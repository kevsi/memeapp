import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { ArrowLeft, Download, Heart, MessageCircle, MoreVertical, Share as ShareIcon } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';

interface MemeTemplate { id: string; image: string; title?: string; categories: string[] }

const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', image: 'https://picsum.photos/400/300?random=1', title: 'NO STRESS\nJUST VIBING', categories: ['ALL'] },
  { id: '2', image: 'https://picsum.photos/300/300?random=11', categories: ['ALL'] },
  { id: '3', image: 'https://picsum.photos/300/300?random=12', title: 'WHEN YOU REALIZE\nTOMORROW IS MONDAY', categories: ['SPORT'] },
];

export default function MemeDetailScreen({ memeId }: { memeId?: string }) {
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];
  const [isLiked, setIsLiked] = useState(false);

  const meme = useMemo(() => MEME_TEMPLATES.find((m) => m.id === memeId || m.id === '1'), [memeId]);

  if (!meme) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <p style={{ color: colors.foreground }}>Meme introuvable</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="px-4 pt-4 pb-3 border-b" style={{ borderColor: `${colors.foreground}1A` }}>
        <div className="flex flex-row items-center justify-between mb-3">
          <button onClick={() => window.history.back()} className="p-2 rounded-full w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity" style={{ backgroundColor: colors.card }}>
            <ArrowLeft color={colors.foreground} size={18} />
          </button>
          <button className="p-2 rounded-full w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity" style={{ backgroundColor: colors.card }}>
            <MoreVertical color={colors.foreground} size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto pb-24 px-4 pt-3">
        <button className="rounded-2xl overflow-hidden w-full hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.card }}>
          <img src={meme.image} alt={meme.title} className="w-full object-cover" style={{ height: '300px' }} />
          {meme.title && (
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="text-3xl font-black text-center px-4 leading-tight whitespace-pre-line" style={{ color: colors.cardForeground }}>
                {meme.title}
              </p>
            </div>
          )}
        </button>

        <div className="flex flex-row items-center justify-between mt-5 px-1">
          <div className="flex-1 flex flex-row justify-center">
            <button onClick={() => setIsLiked(!isLiked)} className="px-3 py-2 rounded-full flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity">
              <Heart size={16} color={isLiked ? '#FF3B30' : colors.foreground} fill={isLiked ? '#FF3B30' : 'none'} />
              <span className="font-bold text-sm" style={{ color: colors.foreground }}>1.4K</span>
            </button>
          </div>
          <button className="flex-1 flex flex-row justify-center items-center gap-1.5 hover:opacity-70 transition-opacity">
            <MessageCircle size={16} color={colors.foreground} />
            <span className="font-bold text-sm" style={{ color: colors.foreground }}>1.5K</span>
          </button>
          <div className="flex-1 flex flex-row justify-center">
            <button className="px-3 py-2 rounded-full flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ backgroundColor: colors.card }}>
              <ShareIcon size={16} color={colors.foreground} />
              <span className="font-bold text-sm" style={{ color: colors.foreground }}>Share</span>
            </button>
          </div>
          <div className="flex-1 flex flex-row justify-center">
            <button className="px-3 py-2 rounded-full flex flex-row items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ backgroundColor: colors.card }}>
              <Download size={16} color={colors.foreground} />
              <span className="font-bold text-sm" style={{ color: colors.foreground }}>DL</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


