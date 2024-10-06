import SessionContextWrapper from "@/context/session-context-wrapper";
import FarmSessionWrapper from "@/components/farm-session-wrapper";

export default function Farm() {
  return (
    <SessionContextWrapper>
      <FarmSessionWrapper />
    </SessionContextWrapper>
  );
}
