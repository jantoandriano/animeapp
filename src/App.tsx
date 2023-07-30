import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AnimeList } from './pages/anime-list'
import { AnimeDetail } from './pages/anime-detail'
import { WelcomePage } from './pages/welcome-page'
import { CollectionList } from './pages/collection-list'
import { CollectionDetail } from './pages/collection-detail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />,
    },
    {
        path: '/animes',
        element: <AnimeList />,
    },
    {
        path: '/animes/:id',
        element: <AnimeDetail />,
    },
    {
        path: '/collections',
        element: <CollectionList />,
    },
    {
        path: '/collections/:type',
        element: <CollectionDetail />,
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
