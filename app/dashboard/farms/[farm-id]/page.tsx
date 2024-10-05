import SessionContextWrapper from "@/context/session-context-wrapper";
import Test from "./test";

export default function Farm() {
  return (
    <SessionContextWrapper>
      <Test />
    </SessionContextWrapper>
  );
}
