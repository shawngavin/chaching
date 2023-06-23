import { Billers, Bills, Home, Paychecks, Employers } from '../components'
import errorImage from '../assets/error-hamster.jpg'
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
      path: '/employers',
      element: <Employers />,
      errorElement: (
        <div>
          <img src={errorImage} alt="errorImage" style={{ width: '50%' }} />
          <h1>Oh NOES!!!! You've angered the evil Hamster</h1>
        </div>
      ),
    },
    {
      path: '/ass',
      element: <h1>Your an ass!</h1>,
    },
  ]
}
