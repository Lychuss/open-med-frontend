import { betterAuth } from "@/src/lib/better-auth";
import { SignUpInterface } from "@/src/interface/auth/signup";

export default async function SignUpEmailApi(accountData: SignUpInterface){
    const dataAccount = accountData;

    const { data, error } = await betterAuth.signUp.email({
        name: dataAccount.name,
        email: dataAccount.email,
        password: dataAccount.password,
        callbackURL: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/login`
    })

    if(error){
        alert(error.message);
        return false;
    } else {
        console.log("Sign up successfully: \nData: ", data.user);
        return true;
    }
}