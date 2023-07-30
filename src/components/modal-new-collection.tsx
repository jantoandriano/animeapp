interface Props {
    show: boolean;
    value: any;
    onChange: (event: any) => any;
    onAddNewCollection: (id: any) => void;
}

export const ModalNewCollection: React.FC<Props> = ({ show, value, onChange, onAddNewCollection }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {show ? <form action="submit">
                <input type="text" value={value} onChange={onChange} />
                <div onClick={onAddNewCollection}>Add</div>
            </form> : null}
        </div>
    )
}