type MyProps = {
    onCLick?: () => void;
}

export default function Button(props: MyProps){
    return (
        <button className="border w-[100px] h-auto" onClick={props.onCLick}>Click Me</button>
    );
}