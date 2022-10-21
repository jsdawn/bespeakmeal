import { useRoutes } from 'react-router-dom';
import routes from '@/router/routes';

function App() {
  const RouterElement = useRoutes(routes);

  return (
    <div id="App">
      <RouterElement />
    </div>
  );
}

export default App;
