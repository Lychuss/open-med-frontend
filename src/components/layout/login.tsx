import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";

type MyProps = {
    className?: string
}

export default function Login(props: MyProps){

    const handleSubmit = async () => {
        
    }

    return (
        <div className={`${props.className} w-[120px] h-auto flex items-center justify-center`}>
            <form onSubmit={handleSubmit}>

                <Label children="Email" />
                <Input id="email" placeholder="Type your email example@gmail.com" name="email" type="email"/>
                
                <Label children="Password" />
                <Input id="password" placeholder="Type your email password" name="password" type="password"/>

                <Button />  
            </form>
        </div>
    );
}