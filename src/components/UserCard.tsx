import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { user_t } from "../types";
import Avatar from "./Avatar";

export type UserCardProps = { user: user_t };

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Box as={Link} to={`/users/${user.id}`} className="card-wrapper">
      <p>{user.username}</p>
      <Box className="card">
        <Box className="img-border" />
        <Box className="img-wrapper">
          <Avatar user={user} />
        </Box>
      </Box>
    </Box>
  );
};

<svg viewBox="0 0 500 500"></svg>;
