import { useState, useEffect } from "react";

function Debts() {
  const [debts, setDebts] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  // load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("debts"));
    if (saved) setDebts(saved);
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);

  // add debt
  const addDebt = () => {
    if (!name || !amount) return;

    const newDebt = {
      name,
      amount: Number(amount),
      status: "not paid",
      date: new Date().toLocaleDateString(),
    };

    setDebts([...debts, newDebt]);

    setName("");
    setAmount("");
  };

  // paid marked
  const markPaid = (index) => {
    const updated = [...debts];
    updated[index].status = "paid";
    setDebts(updated);
  };

  // delete
  const deleteDebt = (index) => {
    const updated = debts.filter((_, i) => i !== index);
    setDebts(updated);
  };

  // totals
  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);

  const unpaidDebt = debts
    .filter((d) => d.status === "not paid")
    .reduce((sum, d) => sum + d.amount, 0);

  const paidDebt = debts
    .filter((d) => d.status === "paid")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <h1>💳 Debts</h1>

      {/* form */}
      <div className="form">
        <input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addDebt}>Add Debt</button>
      </div>

      {/* SUMMARY */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Debt</h3>
          <p>{totalDebt} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>Unpaid</h3>
          <p>{unpaidDebt} UGX</p>
        </div>

        <div className="dashboard-card">
          <h3>Paid</h3>
          <p>{paidDebt} UGX</p>
        </div>
      </div>

        {/* list*/}
      <div style={{ marginTop: "20px" }}>
        {debts.map((debt, index) => (
          <div key={index} className="card">
            <div>
              <strong>{debt.name}</strong> - {debt.amount} UGX
              <br />
              <small>{debt.date}</small>
            </div>

            <div>
              <span
                className={debt.status === "paid" ? "green" : "red"}
                style={{ marginRight: "10px" }}
              >
                {debt.status}
              </span>

              {debt.status === "not paid" && (
                <button onClick={() => markPaid(index)}>✅</button>
              )}

              <button onClick={() => deleteDebt(index)}>❎</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Debts;