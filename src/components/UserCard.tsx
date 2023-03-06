import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { user_t } from "../types";
import { getAvatarLink } from "../utils";

export type UserCardProps = { user: user_t };

export const UserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <Card size={"sm"} gap={4}>
      <CardHeader py={0}>
        <Flex gap="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src={getAvatarLink(user.username)} />

            <Box mt={1}>
              <Heading size="sm">{user.name}</Heading>
              <Text>{user.company.name}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody py={0}>
        <Text>{user.phone}</Text>
        <Text>{user.email}</Text>
      </CardBody>
    </Card>
  );
};
