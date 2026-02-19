import { FeedProvider, useFeedContext } from './store/feedContext'
import { AppShell } from './components/layout/AppShell'
import { ArticlePage } from './components/article/ArticlePage'
import { WordPopup } from './components/common/WordPopup'
import { useWordTranslation } from './hooks/useWordTranslation'

function AppContent() {
  const { translation } = useWordTranslation()
  const { selectedArticle } = useFeedContext()

  return (
    <>
      {selectedArticle ? <ArticlePage /> : <AppShell />}
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
