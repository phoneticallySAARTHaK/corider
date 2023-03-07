import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalData } from "../App";
import { UserList } from "../components/UserList";

export default function Index() {
  const { users } = useContext(GlobalData);

  return <UserList users={users} />;
}
