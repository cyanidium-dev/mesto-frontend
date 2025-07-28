import MainButton from "@/components/shared/buttons/MainButton";
import Container from "@/components/shared/container/Container";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import LogoIcon from "@/components/shared/icons/LogoIcon";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="flex-1 flex flex-col justify-between">
      <div className="mt-6 ">
        <LogoIcon className="text-primary mb-4 mx-auto" />
        <p className="text-[16px] font-normal leading-[100%] text-center">
          Описание апки
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Link href="/auth/sign-in">
          <MainButton variant="secondary" className="h-12">
            Войти в аккаунт
          </MainButton>
        </Link>
        <Link href="/auth/sign-up">
          <MainButton variant="primary" className="h-12">
            Создать аккаунт
          </MainButton>
        </Link>
        <Link href="/main">
          <MainButton variant="text" className="h-12">
            Продолжить без регистрации &nbsp;{" "}
            <ArrowIcon className="rotate-180 size-4" />
          </MainButton>
        </Link>
      </div>
    </Container>
  );
}
