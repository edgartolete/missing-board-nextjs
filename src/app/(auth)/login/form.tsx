"use client"

import { useAuthContext } from "@/feat/auth/context"
import { useLogin } from "@/feat/auth/hooks"
import { LoginReq } from "@/feat/auth/types"
import { Alert, Button, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

export default function LoginForm() {
  const router = useRouter()

  const { trigger: login, data } = useLogin()

  const { isLogin } = useAuthContext()

  const { handleSubmit, register } = useForm<LoginReq>()

  const submit: SubmitHandler<LoginReq> = data => {
    login(data)
  }

  const onError: SubmitErrorHandler<Error> = error => {
    console.error("error", error)
  }

  useEffect(() => {
    if (isLogin) {
      router.push("/home")
    }
  }, [isLogin, router])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit, onError)}>
      <TextField
        {...register("username")}
        type="text"
        required
        label="Username"
        variant="standard"
        className="w-full"
      />
      <TextField
        {...register("password")}
        type="password"
        required
        label="Password"
        variant="standard"
        className="w-full"
      />
      <Button variant="contained" className="w-full" type="submit" sx={{ marginTop: 2 }}>
        Submit
      </Button>
      {data?.error && (
          <Alert severity="error" className="w-full">
            {data.message}
          </Alert>
      )}
    </form>
  )
}
