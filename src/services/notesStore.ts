export interface LearningNote {
  id: string;
  articleId: string;
  articleTitle: string;
  articleCategory: string;
  note: string;
  createdAt: string;
}

export interface LearnedItem {
  id: string;
  title: string;
  category: string;
  sourceUrl: string | null;
  learnedAt: string;
}

const NOTES_KEY = "lilu_feed_notes";
const LEARNED_KEY = "lilu_feed_learned_v1";

export function loadNotes(): LearningNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) return JSON.parse(raw) as LearningNote[];
  } catch {}
  return [];
}

export function saveNote(
  articleId: string,
  articleTitle: string,
  articleCategory: string,
  note: string,
): LearningNote {
  const notes = loadNotes();
  const newNote: LearningNote = {
    id: `note-${Date.now()}`,
    articleId,
    articleTitle,
    articleCategory,
    note,
    createdAt: new Date().toISOString(),
  };
  notes.unshift(newNote);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  return newNote;
}

export function deleteNote(noteId: string): void {
  const notes = loadNotes().filter((n) => n.id !== noteId);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function getNotesForArticle(articleId: string): LearningNote[] {
  return loadNotes().filter((n) => n.articleId === articleId);
}

export function loadLearnedItems(): LearnedItem[] {
  try {
    const raw = localStorage.getItem(LEARNED_KEY);
    if (raw) return JSON.parse(raw) as LearnedItem[];
  } catch {}
  return [];
}

export function saveLearnedItem(item: LearnedItem): void {
  const items = loadLearnedItems().filter((i) => i.id !== item.id); // dedupe
  items.unshift(item);
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify(items.slice(0, 200)));
  } catch {}
}
