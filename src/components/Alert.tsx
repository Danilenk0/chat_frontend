import "../assets/styles/Alert.scss";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UseMessageStore from "../store/MessageStore";


interface AlertProps {
  message: string | null;
  type: "success" | "warning" | "error";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const [isShowAlert, setIsShowAlert] = useState(false);

  const { clearMessage } = UseMessageStore();

  useEffect(() => {
    if (message) {
      setIsShowAlert(true);
      const timer = setTimeout(() => {
        setIsShowAlert(false);
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const variants = {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 },
  };

  return (
    <AnimatePresence>
      {isShowAlert && (
        <motion.div
          className={`alert alert-${type}`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
          key={message}
        >
          {type === "success" ? (
            <i className="bx bx-check-circle"></i>
          ) : (
            <i className="bx bx-alert-circle"></i>
          )}
          <div>
            <h6>{type.toUpperCase()}</h6>
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
