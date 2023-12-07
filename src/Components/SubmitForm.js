export default function SubmitForm() {
    return (
        <div className = "submit-form">
            <form>
                <label className="form-header">Placing an order</label>
                <input type="text" placeholder="Name Surname"/>
                <input type="number" placeholder="+994 70 726 00 43"/>
                <input type="text" placeholder="Adress"/>
                <label className="total">Total : <span>128 000 AZN.</span></label>
                <button>Place an order</button>
            </form>
        </div>
    )
}