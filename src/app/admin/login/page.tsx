import type { Metadata } from "next";
import Image from "next/image";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Admin | Lux Calyra",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center bg-lux-deep px-6">
      <div className="w-full max-w-sm rounded-block bg-lux-white p-8">
        <div className="flex justify-center">
          <Image
            src="/brand/logo-full-color-brown-text.png"
            alt="Lux Calyra"
            width={180}
            height={60}
            className="h-9 w-auto"
          />
        </div>
        <h1 className="mt-6 text-center font-serif text-2xl text-lux-deep">Painel Admin</h1>

        <form action={login} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-xs tracking-widest text-lux-brown uppercase">E-mail</label>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2.5 text-sm text-lux-deep focus:border-lux-deep focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest text-lux-brown uppercase">Senha</label>
            <input
              type="password"
              name="password"
              required
              className="mt-2 w-full rounded-lg border border-lux-champagne/60 bg-transparent px-3 py-2.5 text-sm text-lux-deep focus:border-lux-deep focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
              {error === "Invalid login credentials" ? "E-mail ou senha incorretos." : error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-full bg-lux-deep px-6 py-3 text-sm tracking-wide text-lux-white transition-colors hover:bg-lux-brown"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
