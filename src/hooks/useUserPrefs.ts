import { useState, useCallback } from 'react';
import type { UserPreferences } from '../types/user';
import type { FeedCategory } from '../types/feed';
import { loadPrefs, savePrefs, markLearned, markDismissed } from '../services/userPrefsStore';

export function useUserPrefs() {
  const [prefs, setPrefs] = useState<UserPreferences>(loadPrefs);

  const onLearned = useCallback((itemId: string) => {
    setPrefs((prev) => {
      const next = markLearned(prev, itemId);
      savePrefs(next);
      return next;
    });
  }, []);

  const onDismissed = useCallback((itemId: string, category: FeedCategory) => {
    setPrefs((prev) => {
      const next = markDismissed(prev, itemId, category);
      savePrefs(next);
      return next;
    });
  }, []);

  return { prefs, onLearned, onDismissed };
}
