import {
  Box,
  ChakraProvider,
  Heading,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import {
  Link,
  Outlet,
  RouteObject,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { user_api_t, user_t } from "./types";
import { UserRoute } from "./pages/User";
import { UserCard } from "./components/UserCard";
import ErrorPage from "./pages/Error";
import { apiFetch } from "./utils";
import "./App.css";
import { createContext, useContext } from "react";

export type GlobalData_t = {
  users: user_t[];
};

export const GlobalData = createContext<GlobalData_t>({ users: [] });

function App() {
  const { users } = useLoaderData() as { users: user_t[] };
  const navigation = useNavigation();

  return (
    <GlobalData.Provider value={{ users: users }}>
      <Box
        as="main"
        display={"flex"}
        alignItems="stretch"
        maxH={"100vh"}
        className={navigation.state}
      >
        <Box
          bg="gainsboro"
          p={2}
          flex={"1 1 auto"}
          display="flex"
          flexDirection={"column"}
          maxW={"md"}
        >
          <Heading textAlign={"center"}>Users</Heading>

          {users.length ? (
            <UnorderedList
              styleType={"none"}
              stylePosition={"inside"}
              m={0}
              spacing={2}
              overflowY={"auto"}
              flex={"1 1 0"}
            >
              {users.map((user) => (
                <ListItem
                  display={"flex"}
                  justifyContent={"center"}
                  key={user.id}
                >
                  <Box flex={1} as={Link} to={`/users/${user.id}`} maxW={"md"}>
                    <UserCard user={user} />
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Box>No users found</Box>
          )}
        </Box>
        <Box
          as="article"
          flex="1 1 auto"
          display={{ base: "none", md: "flex" }}
          overflow={"auto"}
        >
          <Outlet />
        </Box>
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
  children: [UserRoute],
  loader: loader,
};
