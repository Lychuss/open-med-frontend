type MyProps = {
    onCLick?: () => void;
    children?: string;
    className?: string;
}

export default function Button(props: MyProps){
    return (
        <button className={`${props.className}`} onClick={props.onCLick}>{props.children}</button>
    );
}