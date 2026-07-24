import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
} from "react-icons/fa";

const Alert = ({ type = "success", message }) => {
    if (!message) return null;

    const styles = {
        success: {
            icon: <FaCheckCircle className="text-green-600" />,
            container: "border-green-200 bg-green-50 text-green-800",
        },
        error: {
            icon: <FaExclamationCircle className="text-red-600" />,
            container: "border-red-200 bg-red-50 text-red-800",
        },
        warning: {
            icon: <FaExclamationTriangle className="text-yellow-600" />,
            container: "border-yellow-200 bg-yellow-50 text-yellow-800",
        },
    };

    const currentStyle = styles[type] || styles.success;

    return (
        <div
            className={`mb-5 flex items-center gap-3 rounded-lg border px-4 py-3 ${currentStyle.container}`}
        >
            <div className="text-xl">{currentStyle.icon}</div>

            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default Alert;