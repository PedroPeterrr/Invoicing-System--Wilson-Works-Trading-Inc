import ReusableButton from "./ReusableButton";

export default function ConfirmModal({ 
    isOpen, 
    message, 
    onConfirm,
    onCancel 
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10000">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
                <div className="p-4">
                    <p className="text-gray-800">
                        {message}
                    </p>
                </div>
                <div className="px-4 py-2 text-right space-x-2">
                    <ReusableButton 
                        onClick={onCancel} 
                        className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                        Cancel
                    </ReusableButton>

                    <ReusableButton
                        onClick={onConfirm} 
                        className="px-3 py-1 bg-warning hover:bg-warning-dark text-white rounded cursor-pointer"
                    >
                        Delete
                    </ReusableButton>
                </div>
            </div>
        </div>
    );
}
