const ModalAlert = ({ closeModalAlert }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-orange-200 w-[90%] sm:w-[75%] xl:w-1/2 mx-5 h-[80%] sm:h-[70%] md:h-[60%] lg:h-[40%] p-4 rounded-[75px]">
        <div className="flex flex-col justify-center items-center gap-5 mt-32 lg:mt-10">
          <p className="text-3xl font-semibold font-poppins text-center">
            !No tienes ninguna receta guardada¡
          </p>
          <p className="text-2xl lg:text-xl font-medium font-poppins text-center">
            Por favor guarda una receta 😊📄📂
          </p>
        </div>
        <div className="flex items-center justify-center mt-5">
          <button
            className="bg-orange-400 text-white font-poppins text-xl w-24 h-10 rounded-md font-semibold"
            onClick={closeModalAlert}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
