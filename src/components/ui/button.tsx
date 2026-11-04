type MyProps = {
    onCLick?: () => void;
    children?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button(props: MyProps){
    return (
        <button className={`${props.className}`} type={props.type} onClick={props.onCLick}>{props.children}</button>
    );
}