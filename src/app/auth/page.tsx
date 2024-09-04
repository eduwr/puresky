import { AuthForm } from "@/components/ui/auth/auth-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div className="page-container">
      <Card>
        <CardHeader className="prose">
          <h2 className="text-primary">Sign In</h2>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  );
}
