import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="page-container">
      <ModeToggle />
      <Card>
        <CardHeader>
          <h2>My card</h2>
        </CardHeader>
        <CardContent>
          <p>Some content of my card</p>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
