import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import ErrorBoundary from '../components/ErrorBoundary';
import { PrivateRoute } from '../components/PrivateRoute';

// 懒加载组件
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const RealTimeMonitoring = lazy(() => import('../pages/RealTimeMonitoring'));
const HistoricalData = lazy(() => import('../pages/HistoricalData'));
const AlertManagement = lazy(() => import('../pages/AlertManagement'));
const DeviceManagement = lazy(() => import('../pages/DeviceManagement'));
const SystemSettings = lazy(() => import('../pages/SystemSettings'));
const UserManagement = lazy(() => import('../pages/UserManagement'));
const TerminalHistory = lazy(() => import('../pages/TerminalHistory'));
const SystemOverview = lazy(() => import('../pages/SystemOverview'));
const VisualizationMonitoring = lazy(() => import('../pages/VisualizationMonitoring'));
const DataAnalysis = lazy(() => import('../pages/DataAnalysis'));
const HelpCenter = lazy(() => import('../pages/HelpCenter'));
const NotificationManagement = lazy(() => import('../pages/NotificationManagement'));
const DeviceMaintenance = lazy(() => import('../pages/DeviceMaintenance'));
const LogManagement = lazy(() => import('../pages/LogManagement'));
const ReportManagement = lazy(() => import('../pages/ReportManagement'));
const TerminalDetail = lazy(() => import('../pages/TerminalDetail'));
const SmartTraffic = lazy(() => import('../pages/SmartTraffic'));
const SmartWeather = lazy(() => import('../pages/SmartWeather'));
const SmartIOT = lazy(() => import('../pages/SmartIOT'));
const NotFound = lazy(() => import('../pages/NotFound'));

// 加载中组件
const Loading = () => <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

const router = createBrowserRouter([
  // 公开路由
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<Loading />}>
        <RegisterPage />
      </Suspense>
    ),
  },

  
  // 需要登录的路由
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <PrivateRoute>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </PrivateRoute>
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { 
        path: '/', 
        element: (
          <Suspense fallback={<Loading />}>
            <SystemOverview />
          </Suspense>
        ) 
      },
      { 
        path: '/realtime', 
        element: (
          <Suspense fallback={<Loading />}>
            <RealTimeMonitoring />
          </Suspense>
        ) 
      },
      { 
        path: '/historical', 
        element: (
          <Suspense fallback={<Loading />}>
            <HistoricalData />
          </Suspense>
        ) 
      },
      { 
        path: '/terminal', 
        element: (
          <Suspense fallback={<Loading />}>
            <TerminalHistory />
          </Suspense>
        ) 
      },
      { 
        path: '/alarm', 
        element: (
          <Suspense fallback={<Loading />}>
            <AlertManagement />
          </Suspense>
        ) 
      },
      { 
        path: '/device', 
        element: (
          <Suspense fallback={<Loading />}>
            <DeviceManagement />
          </Suspense>
        ) 
      },
      { 
        path: '/users', 
        element: (
          <Suspense fallback={<Loading />}>
            <UserManagement />
          </Suspense>
        ) 
      },
      { 
        path: '/settings', 
        element: (
          <Suspense fallback={<Loading />}>
            <SystemSettings />
          </Suspense>
        ) 
      },
      { 
        path: '/overview', 
        element: (
          <Suspense fallback={<Loading />}>
            <SystemOverview />
          </Suspense>
        ) 
      },
      { 
        path: '/visualization', 
        element: (
          <Suspense fallback={<Loading />}>
            <VisualizationMonitoring />
          </Suspense>
        ) 
      },
      { 
        path: '/analysis', 
        element: (
          <Suspense fallback={<Loading />}>
            <DataAnalysis />
          </Suspense>
        ) 
      },
      { 
        path: '/help', 
        element: (
          <Suspense fallback={<Loading />}>
            <HelpCenter />
          </Suspense>
        ) 
      },
      { 
        path: '/notification', 
        element: (
          <Suspense fallback={<Loading />}>
            <NotificationManagement />
          </Suspense>
        ) 
      },
      { 
        path: '/maintenance', 
        element: (
          <Suspense fallback={<Loading />}>
            <DeviceMaintenance />
          </Suspense>
        ) 
      },
      { 
        path: '/log', 
        element: (
          <Suspense fallback={<Loading />}>
            <LogManagement />
          </Suspense>
        ) 
      },
      {
        path: '/report', 
        element: (
          <Suspense fallback={<Loading />}>
            <ReportManagement />
          </Suspense>
        ) 
      },
      {
        path: '/terminal/:id', 
        element: (
          <Suspense fallback={<Loading />}>
            <TerminalDetail />
          </Suspense>
        ) 
      },
      {
        path: '/smart-traffic', 
        element: (
          <Suspense fallback={<Loading />}>
            <SmartTraffic />
          </Suspense>
        ) 
      },
      {
        path: '/smart-weather', 
        element: (
          <Suspense fallback={<Loading />}>
            <SmartWeather />
          </Suspense>
        ) 
      },
      {
        path: '/smart-iot', 
        element: (
          <Suspense fallback={<Loading />}>
            <SmartIOT />
          </Suspense>
        ) 
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;