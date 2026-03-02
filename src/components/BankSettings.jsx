import { useState, useEffect } from "react";

function BankSettings() {
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bankInfo"));

    if (saved) {
      setBank(saved.bank);
      setAccount(saved.account);
      setName(saved.name);
    }
  }, []);

  const saveInfo = () => {
    const data = {
      bank,
      account,
      name,
    };

    localStorage.setItem("bankInfo", JSON.stringify(data));

    alert("Đã lưu thông tin ngân hàng");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Thông tin ngân hàng</h2>

      <div>
        <p>Ngân hàng</p>

        <select
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          className="border p-2 w-full rounded-lg"
        >
          <option value="">Chọn ngân hàng</option>

          <option value="vietcombank">Vietcombank</option>

          <option value="mbbank">MB Bank</option>

          <option value="techcombank">Techcombank</option>

          <option value="bidv">BIDV</option>

          <option value="acb">ACB</option>
        </select>
      </div>

      <div>
        <p>Số tài khoản</p>

        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>

      <div>
        <p>Tên chủ tài khoản</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>

      <button
        onClick={saveInfo}
        className="bg-green-500 text-white px-5 py-3 rounded-xl w-full font-bold"
      >
        Lưu thông tin
      </button>
    </div>
  );
}

export default BankSettings;
