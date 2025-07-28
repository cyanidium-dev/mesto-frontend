import BackButton from "@/components/shared/buttons/BackButton";
import ForwardButton from "@/components/shared/buttons/ForwardButton";
import MainButton from "@/components/shared/buttons/MainButton";

export default function Home() {
  return (
    <>
      <MainButton variant="red" className="h-12">
        Подтвердить
      </MainButton>
      <ForwardButton />
      <BackButton />
    </>
  );
}
