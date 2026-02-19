import { useState, useEffect, useCallback, useRef } from 'react';

interface Translation {
  word: string;
  meaning: string;
  x: number;
  y: number;
}

// Common finance/investment terms dictionary
const DICT: Record<string, string> = {
  // General
  'portfolio': 'ポートフォリオ（資産配分）',
  'investment': '投資',
  'investor': '投資家',
  'investing': '投資すること',
  'holdings': '保有銘柄',
  'holding': '保有',
  'capital': '資本',
  'management': '経営・運用',
  'fund': 'ファンド（基金）',
  'margin': '余裕・利ざや',
  'safety': '安全性',
  'value': '価値',
  'growth': '成長',
  'market': '市場',
  'stock': '株式',
  'shares': '株式・持ち分',
  'filing': '届出・申告',
  'filings': '届出書類',
  'quarterly': '四半期の',
  'annual': '年次の',
  'revenue': '収益',
  'earnings': '利益・収益',
  'profit': '利益',
  'loss': '損失',
  'asset': '資産',
  'assets': '資産',
  'debt': '負債',
  'equity': '株式・純資産',
  'dividend': '配当',
  'yield': '利回り',
  'compound': '複利',
  'compounding': '複利効果',
  'intrinsic': '本質的な',
  'valuation': '企業価値評価',
  'undervalued': '割安な',
  'overvalued': '割高な',
  'moat': '堀（競争優位性）',
  'competitive': '競争力のある',
  'advantage': '優位性',
  'disruption': '破壊的変革',
  'innovation': '革新',
  // Li Lu specific
  'civilization': '文明',
  'modernization': '近代化',
  'competence': '能力',
  'mentality': '心構え・精神',
  'concentrated': '集中した',
  'conviction': '確信',
  'philosophy': '哲学',
  'principles': '原則',
  'framework': '枠組み',
  'extraordinary': '非凡な',
  'remarkable': '注目に値する',
  'exceptional': '卓越した',
  'significant': '重要な・顕著な',
  'substantial': '実質的な・大幅な',
  'fundamental': '根本的な',
  'strategic': '戦略的な',
  'acquisition': '買収',
  'allocation': '配分',
  'diversification': '分散投資',
  'thesis': '投資テーシス（仮説）',
  'geopolitical': '地政学的な',
  'trajectory': '軌道・推移',
  'sustainable': '持続可能な',
  'resilient': '回復力のある',
  'volatile': '不安定な',
  'sentiment': '市場心理',
  'downstream': '下流の',
  'upstream': '上流の',
  'leverage': 'レバレッジ（てこ）',
  'stakeholder': '利害関係者',
  'stewardship': '受託責任',
  // Companies
  'alphabet': 'アルファベット（Googleの親会社）',
  'berkshire': 'バークシャー・ハサウェイ',
  'occidental': 'オキシデンタル石油',
  'petroleum': '石油',
  'bancorp': '銀行持株会社',
  // Action words
  'dumped': '大量売却した',
  'bought': '購入した',
  'sold': '売却した',
  'increased': '増加させた',
  'decreased': '減少させた',
  'trimmed': '削減した',
  'added': '追加した',
  'exited': '全て売却した',
  'initiated': '新規に取得した',
  'maintained': '維持した',
  // General English
  'tribute': '追悼・賛辞',
  'memoir': '回顧録',
  'survivor': '生存者',
  'refugee': '難民',
  'simultaneously': '同時に',
  'entrusted': '委ねた',
  'boundaries': '境界',
  'pursuit': '追求',
  'courage': '勇気',
  'profound': '深い・重大な',
  'influence': '影響',
  'decade': '10年間',
  'decades': '数十年間',
  'approach': 'アプローチ・手法',
  'bridge': '橋渡し',
  'replicate': '再現する',
  'prominent': '著名な',
  'recommendation': '推薦',
  'essential': '不可欠な',
  'wisdom': '知恵',
  'recognition': '認識',
  'compounded': '複利で増加した',
};

export function useWordTranslation() {
  const [translation, setTranslation] = useState<Translation | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const lookupWord = useCallback((word: string, x: number, y: number) => {
    const clean = word.toLowerCase().replace(/[^a-z'-]/g, '');
    if (clean.length < 2) return;

    // Check dictionary
    const meaning = DICT[clean];
    if (meaning) {
      setTranslation({ word: clean, meaning, x, y });
      return;
    }

    // Try without 's' suffix (simple plurals)
    if (clean.endsWith('s') && DICT[clean.slice(0, -1)]) {
      setTranslation({ word: clean, meaning: DICT[clean.slice(0, -1)], x, y });
      return;
    }

    // Try without 'ing' suffix
    if (clean.endsWith('ing') && DICT[clean.slice(0, -3)]) {
      setTranslation({ word: clean, meaning: DICT[clean.slice(0, -3)], x, y });
      return;
    }
  }, []);

  const dismiss = useCallback(() => {
    setTranslation(null);
  }, []);

  useEffect(() => {
    // Double-click handler (desktop)
    const handleDblClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.feed-card') && !target.closest('.card-title')) return;

      const selection = window.getSelection();
      const word = selection?.toString().trim();
      if (word && word.length > 1) {
        lookupWord(word, e.clientX, e.clientY - 50);
      }
    };

    // Long press handlers (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.feed-card') && !target.closest('.card-title')) return;

      const touch = e.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };

      longPressTimer.current = window.setTimeout(() => {
        const selection = window.getSelection();
        const word = selection?.toString().trim();
        if (word && word.length > 1) {
          lookupWord(word, touch.clientX, touch.clientY - 60);
        }
      }, 500);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!longPressTimer.current || !touchStartPos.current) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchStartPos.current.x);
      const dy = Math.abs(touch.clientY - touchStartPos.current.y);
      if (dx > 10 || dy > 10) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    // Dismiss on scroll or click elsewhere
    const handleScroll = () => dismiss();
    const handleClick = () => {
      // Small delay to not conflict with dblclick
      setTimeout(dismiss, 100);
    };

    document.addEventListener('dblclick', handleDblClick);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('scroll', handleScroll, true);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('dblclick', handleDblClick);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('click', handleClick);
    };
  }, [lookupWord, dismiss]);

  return { translation, dismiss };
}
