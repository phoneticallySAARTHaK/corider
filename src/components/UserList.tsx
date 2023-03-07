import { Box } from "@chakra-ui/react";
import { user_t } from "../types";
import { UserCard } from "./UserCard";

export function UserList({ users }: { users: user_t[] }) {
  return users.length ? (
    <Box
      m={0}
      overflowY={"auto"}
      flex="1 1 auto"
      display={"grid"}
      minH={"0px"}
      gridTemplateColumns={"repeat(auto-fit, minmax(20rem, 1fr))"}
      gap={6}
      p={4}
      placeContent="center"
      placeItems={"center"}
    >
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </Box>
  ) : (
    <Box>No users found</Box>
  );
}
