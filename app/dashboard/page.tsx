import SessionContextWrapper from "@/context/session-context-wrapper";
import FarmsSessionWrapper from "@/components/farms-session-wrapper";

export default function Farm() {
  return (
    <SessionContextWrapper>
      <FarmsSessionWrapper />
    </SessionContextWrapper>
  );
}
