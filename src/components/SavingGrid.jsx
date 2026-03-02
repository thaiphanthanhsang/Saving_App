import { useState } from "react";
import QRModal from "./QRModal";
import { savingData } from "../data/savingData";
import BankSettings from "./BankSettings";

function SavingGrid() {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completedSavings");
    return saved ? JSON.parse(saved) : [];
  });

  const handleClick = (item) => {
    setSelectedAmount(item);
  };

  const markDone = (id) => {
    let newCompleted;

    if (completed.includes(id)) {
      newCompleted = completed;
    } else {
      newCompleted = [...completed, id];
    }

    setCompleted(newCompleted);

    localStorage.setItem("completedSavings", JSON.stringify(newCompleted));

    setSelectedAmount(null);
  };

  const resetSavings = () => {
    const confirmReset = window.confirm("Reset bảng tiết kiệm?");

    if (!confirmReset) return;

    localStorage.removeItem("completedSavings");

    setCompleted([]);
  };

  // Calculations

  const totalGoal = savingData.reduce((sum, item) => sum + item.amount, 0);

  const totalSaved = completed.reduce((sum, id) => {
    const item = savingData.find((x) => x.id === id);

    return sum + (item ? item.amount : 0);
  }, 0);

  const percent = Math.round((totalSaved / totalGoal) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}

        <h1 className="text-3xl font-bold">Tiết Kiệm Mỗi Ngày Nhé Bé Iu ❤️</h1>

        <BankSettings />
        {/* Reset Button */}

        <button
          onClick={resetSavings}
          className="px-5 py-2 rounded-xl border bg-white hover:bg-red-50"
        >
          Reset Challenge
        </button>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Tổng đã tiết kiệm</p>

            <p className="text-3xl font-bold">
              {totalSaved.toLocaleString()} ₫
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-gray-500">Mục tiêu</p>

            <p className="text-3xl font-bold">{totalGoal.toLocaleString()} ₫</p>
          </div>

          <div className="bg-green-100 p-6 rounded-2xl shadow">
            <p className="text-green-700">Tiến độ</p>

            <p className="text-4xl font-bold text-green-700">{percent}%</p>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="font-semibold mb-3">Tiến độ hiện tại</p>

          <div className="w-full h-4 bg-gray-200 rounded-full">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{
                width: percent + "%",
              }}
            />
          </div>
        </div>

        {/* Grid */}

        <div>
          <h2 className="text-xl font-bold mb-4">Các gói tiết kiệm</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {savingData.map((item) => {
              const done = completed.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`

                  cursor-pointer
                  rounded-2xl
                  p-6
                  text-center
                  border
                  transition
                  hover:shadow-lg

                  ${
                    done
                      ? "bg-green-100 border-green-400"
                      : "bg-white border-gray-200 hover:border-green-400"
                  }

                  `}
                >
                  <div className="text-lg font-bold">
                    {item.amount.toLocaleString()} ₫
                  </div>

                  {done && (
                    <div className="text-green-700 mt-2 text-sm">✔ Đã xong</div>
                  )}

                  {!done && (
                    <div className="text-gray-400 text-xs mt-2">
                      Tiết kiệm ngay
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedAmount && (
        <QRModal
          amount={selectedAmount.amount}
          onDone={() => markDone(selectedAmount.id)}
          onClose={() => setSelectedAmount(null)}
        />
      )}
    </div>
  );
}

export default SavingGrid;
