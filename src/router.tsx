import { createBrowserRouter } from 'react-router-dom';
import CollectionPage from './pages/collection_page';
import SubjectPage from './pages/subject_page';
import OverviewPage from './pages/overview_page';
import { DefaultLayout } from './pages/layout';
import LoginPage from './pages/login_page';
import EpisodePage from './pages/ep_page';
import CharacterPage from './pages/character_page';
import BlogPage from './pages/blog_page';
import DetailPage from './pages/detail_page';
import TopicPage from './pages/topic_page';
import PersonPage from './pages/person_page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { index: true, element: <CollectionPage /> }, // '/user/:id'
      {
        path: 'subject/:id',
        element: <SubjectPage />,
        children: [
          { index: true, element: <OverviewPage /> },
          {
            path: '',
            element: <DetailPage />,
            children: [
              { path: 'ep', element: <EpisodePage /> },
              { path: 'persons', element: <PersonPage />},
              { path: 'characters', element: <CharacterPage /> },
              { path: 'reviews', element: <BlogPage /> },
              { path: 'board', element: <TopicPage /> },
            ],
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
