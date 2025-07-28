import BackButton from "@/components/shared/buttons/BackButton";
import MainButton from "@/components/shared/buttons/MainButton";

export default function Home() {
  return (
    <>
      <MainButton variant="red" className="h-12">
        Подтвердить
      </MainButton>
      <BackButton />
    </>
  );
}
