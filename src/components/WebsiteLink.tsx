import { Link } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

export function WebsiteLink({ href }: { href: string }) {
  return (
    <Link
      isExternal
      href={`https://${href}`}
      display={"flex"}
      gap={1}
      alignItems="center"
      color={"linkedin.900"}
    >
      {href} <BiLinkExternal />
    </Link>
  );
}
