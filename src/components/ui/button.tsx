type MyProps = {
    onCLick?: () => void;
    children?: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    "aria-busy"?: boolean;
}

export default function Button(props: MyProps){
    return (
        <button
            className={`${props.className}`}
            type={props.type}
            onClick={props.onCLick}
            disabled={props.disabled}
            aria-busy={props["aria-busy"]}
        >
            {props.children}
        </button>
    );
}