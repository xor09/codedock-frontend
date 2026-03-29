import { api } from "../lib/api";

export async function loginApi(email: string, password: string) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
}

export async function signupApi(form: any) {
    const res = await api.post("/users/create", {
        name: form.name,
        email: form.email,
        password: form.password
    })
    return res
}

export async function forgotPasswordApi(email : string){
  const res = await api.post("/auth/forgot-password",{
     email
  })
  return res
}

export async function resetpasswordApi(form : any){
  const res = await api.post("auth/reset-password",{
       token : form.token,
       newPassword : form.newPassword
  })
  return res
}