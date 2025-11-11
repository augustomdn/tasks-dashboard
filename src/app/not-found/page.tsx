import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-linear-to-b from-green-300 to-white md:bg-linear-to-r">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! A página que você está procurando não existe.
      </p>
      <Link
        href="/"
        className="text-blue-600 hover:underline font-medium"
      >
        Voltar para a página inicial</Link>
    </div>
  );
}
