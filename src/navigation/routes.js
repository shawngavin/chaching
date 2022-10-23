import { Billers, Bills } from "../components";
export const getRoutes = () => {
  return [
    {
      path: "/",
      element: (
        <>
          <h2>Welcome to Cha-Ching</h2>
          <h4>Your Total Money Management Solution</h4>
        </>
      ),
    },
    {
      path: "/billers",
      element: <Billers />,
    },
    {
      path: "/bills",
      element: <Bills />,
    },
    {
      path: "/ass",
      element: <h1>Your an ass!</h1>,
    },
  ];
};
