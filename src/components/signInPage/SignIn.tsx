import Container from "../shared/container/Container";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <Container className="flex flex-col min-h-screen">
      <SignInForm />
    </Container>
  );
}
