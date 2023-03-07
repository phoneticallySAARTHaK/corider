import { Box, ChakraProvider, Progress } from "@chakra-ui/react";
import {
  Outlet,
  RouteObject,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { user_api_t, user_t } from "./types";
import { UserRoute } from "./pages/User";
import ErrorPage from "./pages/Error";
import { apiFetch } from "./utils";
import "./App.css";
import { createContext } from "react";
import Index from "./pages/Index";
import Header from "./components/Header";

export type GlobalData_t = {
  users: user_t[];
};

export const GlobalData = createContext<GlobalData_t>({ users: [] });

function App() {
  const { users } = useLoaderData() as { users: user_t[] };
  const navigation = useNavigation();

  return (
    <GlobalData.Provider value={{ users: users }}>
      <Box position={"relative"} as="main" h="100vh">
        {navigation.state === "loading" ? (
          <Progress isIndeterminate isAnimated position={"absolute"} top={0} />
        ) : null}
        <Header />
        <Outlet />
      </Box>
    </GlobalData.Provider>
  );
}

async function loader() {
  const users = await apiFetch<user_api_t[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log(users);

  return { users };
}

export const RootRoute: RouteObject = {
  path: "/",
  element: (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  ),
  errorElement: <ErrorPage />,
  children: [
    {
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        UserRoute,
      ],
    },
  ],

  loader: loader,
};
