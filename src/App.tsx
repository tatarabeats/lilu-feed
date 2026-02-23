import { useState } from 'react'
import { FeedProvider, useFeedContext } from './store/feedContext'
import { AppShell } from './components/layout/AppShell'
import { ArticlePage } from './components/article/ArticlePage'
import { NotesPage } from './components/notes/NotesPage'
import { WordPopup } from './components/common/WordPopup'
import { useWordTranslation } from './hooks/useWordTranslation'

function AppContent() {
  const { translation } = useWordTranslation()
  const { selectedArticle } = useFeedContext()
  const [showNotes, setShowNotes] = useState(false)

  let page
  if (selectedArticle) {
    page = <ArticlePage />
  } else if (showNotes) {
    page = <NotesPage onBack={() => setShowNotes(false)} />
  } else {
    page = <AppShell onOpenNotes={() => setShowNotes(true)} />
  }

  return (
    <>
      {page}
      {translation && (
        <WordPopup
          word={translation.word}
          meaning={translation.meaning}
          x={translation.x}
          y={translation.y}
        />
      )}
    </>
  )
}

export default function App() {
  return (
    <FeedProvider>
      <AppContent />
    </FeedProvider>
  )
}
