
const Contact = () => {
  return (
    <section id="contact" className="py-20 px-[4%] lg:px-[8%]">
      <h2 className="text-4xl font-bold text-center mb-12 text-dark-green dark:text-light-green">HABLA <span className="text-mint-2">COMINGO.</span></h2>
      <form className="max-w-xl mx-auto">
        <input 
          type="text" 
          placeholder="Nombre completo:" 
          className="bg-mint-1 dark:bg-dark-green placeholder-dark-green dark:placeholder-light-green p-4 rounded-lg w-full mb-4"
        />
        <input 
          type="email" 
          placeholder="Email:" 
          className="bg-mint-1 dark:bg-dark-green placeholder-dark-green dark:placeholder-light-green p-4 rounded-lg w-full mb-4"
        />
        <input 
          type="tel" 
          placeholder="Telefono:" 
          className="bg-mint-1 dark:bg-dark-green placeholder-dark-green dark:placeholder-light-green p-4 rounded-lg w-full mb-4"
        />
        <textarea 
          placeholder="Escribe tu mensaje:" 
          className="bg-mint-1 dark:bg-dark-green placeholder-dark-green dark:placeholder-light-green p-4 rounded-lg w-full h-40 mb-4"
        ></textarea>
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="py-3 px-8 rounded-lg bg-mint-2 hover:bg-sea-green transition-all duration-300 text-white font-bold"
          >
            ENVIAR
          </button>
        </div>
      </form>
    </section>
  )
}

export default Contact
