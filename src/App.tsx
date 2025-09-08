import { lazy, Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonContent, IonSpinner } from '@ionic/react';
import {
   IonReactRouter,
  //  IonReactHashRouter 
  } from '@ionic/react-router';

// import Home from './pages/Home';
// import Md from './pages/Md';
// import Customer from './pages/Customer';
// import Demo from './pages/Demo';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// only for development
// if (process.env.NODE_ENV === 'development') {
//   import('./mock_server/server');
// }

const Home = lazy(() => import('./pages/Home')); // 访问 / 时才加载 Home Chunk
const Md = lazy(() => import('./pages/Md')); // 访问 /md/:type 时才加载
const Customer = lazy(() => import('./pages/Customer')); // 访问 /customer 时加载
const Demo = lazy(() => import('./pages/Demo')); // 访问 /demo 时加载

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Suspense
        fallback={
          <IonContent className="ion-padding">
            <IonSpinner name="crescent" color="primary" />
            {/* Ionic 官方加载动画，支持多种样式和颜色 */}
          </IonContent>
        }
      >
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/md/:type">
          <Md />
        </Route>
        <Route exact path="/customer">
          <Customer />
        </Route>
        <Route exact path="/demo">
          <Demo />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  </IonApp>
);

export default App;
