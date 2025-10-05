
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Logo from './Header/Logo';

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <footer className="py-8 px-[4%] lg:px-[8%]">
      <div className="flex justify-between items-center mb-4">
        <Logo isDarkMode={isDarkMode} />
        <div className="flex space-x-4">
          <a href="#" className="text-mint-2 hover:text-sea-green"><FaGithub size={24} /></a>
          <a href="#" className="text-mint-2 hover:text-sea-green"><FaLinkedin size={24} /></a>
        </div>
      </div>
      <hr className="border-mint-2 mb-4" />
      <div className="text-center text-dark-green dark:text-light-green">
        <p>contact@virosms.com</p>
      </div>
    </footer>
  )
}

export default Footer
