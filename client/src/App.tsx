import { Toaster } from 'react-hot-toast';
import { AppRouter } from '@/routes/AppRouter';

export const App = () => (
  <>
    <AppRouter />
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 3000,
          style: {
            background: '#16A34A',
            color: '#FFFFFF'
          }
        },
        error: {
          duration: 4000,
          style: {
            background: '#DC2626',
            color: '#FFFFFF'
          }
        },
        loading: {
          style: {
            background: '#475569',
            color: '#FFFFFF'
          }
        }
      }}
    />
  </>
);

