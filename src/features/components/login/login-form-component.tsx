"use client"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"
import z from "zod"


export default function LoginFormComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const loginSchema = z.object({
    username: z.string().min(5, "Username é obrigatório!"),
    password: z.string().min(8, "Senha é obrigatória!")
  });


  type loginData = z.infer<typeof loginSchema>;


  const { register, handleSubmit, formState: { errors } } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      router.push("/tasks");
    }
  }, [router]);

  function onSubmit(data: loginData) {
    setIsLoading(true);


    setTimeout(() => {
      if (data.username === "admin" && data.password === "password") {
        localStorage.setItem("isLogged", "true");

        alert(`Login realizado com sucesso! Bem vindo`)
        router.push("/tasks")

      } else {
        alert("Login inválido! Tente novamente.")
      }

      setIsLoading(false)
    }, 500)
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Acesse sua conta</CardTitle>
        <CardAction>
          <Button variant="link" className="cursor-pointer">Cadastre-se</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Username</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="password">Senha</Label>
              <a href="" className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer">
                Esqueceu a Senha?
              </a>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer mt-4" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Carregando...</span>
              </>
            ) : (
              <>
                <LogIn />
                <span>Entrar</span>
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
