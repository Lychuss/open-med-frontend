type MyProps = {
    children?: string
}

export default function Label(props: MyProps){
    return (
        <label className="">{props.children}</label>
    );
}