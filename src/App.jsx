import { Routes, Route } from 'react-router-dom';
import { ScrollLockProvider } from './context/ScrollLockContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import RoguesGallery from './pages/RoguesGallery.jsx';
import Arsenal from './pages/Arsenal.jsx';
import Nexus from './pages/Nexus.jsx';
import Archives from './pages/Archives.jsx';
import ArchivesCharacter from './pages/ArchivesCharacter.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <ScrollLockProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rogues-gallery" element={<RoguesGallery />} />
          <Route path="arsenal" element={<Arsenal />} />
          <Route path="nexus" element={<Nexus />} />
          <Route path="archives" element={<Archives />} />
          <Route path="archives/:character" element={<ArchivesCharacter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ScrollLockProvider>
  );
}
