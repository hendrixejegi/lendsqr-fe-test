import './scss/App.scss';

import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
