import { Image, ImageProps } from "@chakra-ui/react";
import { user_t } from "../types";
import { getAvatarLink } from "../utils";
import loading from "./placeholder-icon.jpg";

export default function Avatar({
  user,
  ...rest
}: ImageProps & { user: user_t }) {
  return (
    <Image {...rest} src={getAvatarLink(user.username)} fallbackSrc={loading} />
  );
}
