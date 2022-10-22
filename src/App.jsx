import { BrowserRouter } from 'react-router-dom';
import Routes from '@/router/Routes';
import { Suspense } from 'react';
import { Loading } from 'react-vant';

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex flex--center p15">
            <Loading type="ball" />
          </div>
        }
      >
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
