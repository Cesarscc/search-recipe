"use client";
import { useEffect } from "react";

const ModalUnSaved = ({ closeModalAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(closeModalAlert, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [closeModalAlert]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-orange-100 w-[75%] lg:w-1/2 mx-5 h-[55%] lg:h-[35%] p-4 rounded-[75px]">
        <div className="flex flex-col justify-center items-center mt-40 lg:mt-20">
          <p className="text-3xl font-semibold font-poppins text-center">
            !Receta Quitada con Éxito¡ 😌📄📂
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalUnSaved;
