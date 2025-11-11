"use client"

import { useState } from "react";
import LoginFormComponent from "../components/login/login-form-component";
import LoadingSpinnerPageComponent from "../components/loading/loading";

export default function MainPageComponent() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

  }


  return (
    <>
      { isLoading ? <LoadingSpinnerPageComponent /> :<main className="flex h-screen bg-linear-to-b from-green-300 to-white md:bg-linear-to-r">
        <div className="hidden md:w-3/5 md:flex flex-col justify-center items-center ">
          <h2 className="font-bold text-5xl text-center">
            Dashboard de Tarefas
          </h2>
          <p className="text-center">Criado por Augusto Nascimento</p>
        </div>
        <div className="w-full md:w-2/5 flex flex-col gap-4 justify-center items-center">
          <div className="md:hidden">
            <h2 className="font-bold text-2xl text-center">
              Dashboard de Tarefas
            </h2>
            <p className="text-center">Criado por Augusto Nascimento</p>
          </div>
          <div className="lg:w-3/4">
            <LoginFormComponent />
          </div>
        </div>
      </main>}
    </>
  )
}
