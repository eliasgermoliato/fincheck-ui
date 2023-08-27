import { useAuth } from "../../../app/hooks/useAuth";
import { Button } from "../../components/Button";

export function Home() {
  const { signout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={signout}>Sair</Button>
    </div>
  );
}
