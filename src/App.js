import './App.css';

//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components
import { Sidebar, Navbar } from './layout';
import { Home, AllNotes, TagNotes, ErrorPage, SignIn, LogIn } from './pages';
import { TagsModal, CreateNoteModal } from './components';

//router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import AdminPanel from './pages/AdminPanel/AdminPanel';

const App = () => {
  const { viewEditTagsModal, viewCreateNoteModal } = useSelector((state) => state.modal);

  return (
    <div className="app">
      {/* modals */}
      {viewCreateNoteModal && <CreateNoteModal />}
      {viewEditTagsModal && <TagsModal type="edit" />}

      <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} />
      <Router>
        <Sidebar />
        <div className="app__container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authoriztion" element={<SignIn />} />
            <Route path="/registration" element={<LogIn />} />
            <Route path="/notes" element={<AllNotes />} />
            <Route path="/users" element={<AdminPanel />} />
            <Route path="/tag/:name" element={<TagNotes />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="/*" element={<Navigate to={'/404'} replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
