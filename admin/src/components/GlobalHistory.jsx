// https://stackoverflow.com/a/70002872/11885780
import { useNavigate } from "react-router";

export default function GlobalHistory() {
  History.navigate = useNavigate();

  return null;
}
