import { Map, PlusMinus } from "../components";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Map />
        <PlusMinus />
      </motion.div>
    </AnimatePresence>
  );
};

export default App;
