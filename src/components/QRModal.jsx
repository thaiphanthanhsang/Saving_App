function QRModal({ amount, onDone, onClose }) {
  const bank = "vietcombank";

  const accountNumber = "1054957071";

  const accountName = "THAI PHAN THANH SANG";

  const content = "SAVE" + amount;

  const qrLink = `https://img.vietqr.io/image/${bank}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    content
  )}&accountName=${encodeURIComponent(accountName)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background */}

      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}

      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-6 space-y-6">
        {/* Amount */}

        <div className="text-center">
          <p className="text-gray-500 text-sm">Số tiền thanh toán</p>

          <h1 className="text-3xl font-bold">{amount.toLocaleString()} VND</h1>
        </div>

        {/* QR */}

        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-2xl border">
            <img src={qrLink} className="w-48 h-48" />

            <p className="text-center text-gray-500 text-xs mt-2">
              Quét mã để thanh toán
            </p>
          </div>
        </div>

        {/* Open Bank */}

        <button
          onClick={() => {
            const accountNumber = "1054957071";

            const content = "SAVE" + amount;

            const deeplink = `vcbdigibank://transfer?account=${accountNumber}&amount=${amount}&message=${content}`;

            window.location.href = deeplink;
          }}
          className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
        >
          Mở ngân hàng
        </button>

        {/* Info */}

        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Ngân hàng</span>

            <span className="font-bold">{bank}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Số tài khoản</span>

            <span className="font-bold">{accountNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Chủ tài khoản</span>

            <span className="font-bold">{accountName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Nội dung</span>

            <span className="text-green-600 font-bold">{content}</span>
          </div>
        </div>

        {/* Buttons */}

        <div className="space-y-3">
          <button
            onClick={() => onDone(amount)}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-bold"
          >
            Đã chuyển xong
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-200 py-3 rounded-xl"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRModal;
