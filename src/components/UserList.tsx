import { Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { user_t } from "../types";
import { UserCard } from "./UserCard";

export function UserList({ users }: { users: user_t[] }) {
  return users.length ? (
    <UnorderedList
      styleType={"none"}
      stylePosition={"inside"}
      m={0}
      spacing={2}
      overflowY={"auto"}
      flex="1 1 auto"
    >
      {users.map((user) => (
        <ListItem
          display={"flex"}
          justifyContent={"center"}
          key={user.id}
          minH={0}
        >
          <Box flex={1} as={Link} to={`/users/${user.id}`} maxW={"md"}>
            <UserCard user={user} />
          </Box>
        </ListItem>
      ))}
    </UnorderedList>
  ) : (
    <Box>No users found</Box>
  );
}
