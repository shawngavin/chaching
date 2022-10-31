import { Billers, Bills, Home, Paychecks } from '../components'
export const getRoutes = () => {
  return [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/billers',
      element: <Billers />,
    },
    {
      path: '/bills',
      element: <Bills />,
    },
    {
      path: '/pay',
      element: <Paychecks />,
    },
    {
      path: '/ass',
      element: <h1>Your an ass!</h1>,
    },
  ]
}
