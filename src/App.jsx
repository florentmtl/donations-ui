import { DonationsList } from './components/DonationsList.jsx';
import { AddDonation } from './components/AddDonation.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <DonationsList />
      </div>
    ),
  },
  {
    path: '/add-donation',
    element: (
      <div>
        <AddDonation />
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
