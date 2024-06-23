import { styled } from "styled-components";
import Transparent from "./Transparent";
import { Button, Card } from "@radix-ui/themes";

export const TransparentCard = styled(Card)`
  ${Transparent}
  border-radius: 30px;

  &::after {
    border-radius: 30px;
  }
`;

export const TransparentCardFullRadius = styled(TransparentCard)`
  border-radius: max(var(--radius-2), var(--radius-full));

  &::after {
    border-radius: max(var(--radius-2), var(--radius-full));
  }
`;

export const TransparentButton = styled(Button)`
  width: 100%;
  text-wrap: nowrap;
  overflow: hidden;
  ${Transparent}
`;
