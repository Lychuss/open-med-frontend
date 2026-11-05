import { betterAuth } from "@/lib/better-auth";
import { SignUpInterface } from "@/interface/auth/signup";

export default async function SignUpEmailApi(accountData: SignUpInterface){
    const dataAccount = accountData;

    const { data, error } = await betterAuth.signUp.email({
        name: dataAccount.name,
        email: dataAccount.email,
        age: dataAccount.age,
        city: dataAccount.city,
        sex: dataAccount.sex,
        password: dataAccount.password,
        callbackURL: `${process.env.NEXT_PUBLIC_CALLBACK_URL}`
    })

    if(error){
        return error.message;
    } else {
        console.log("Sign up successfully: \nData: ", data.user);
        return null;
    }
}