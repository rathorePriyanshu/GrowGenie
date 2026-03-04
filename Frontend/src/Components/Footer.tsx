const Footer = () => {
  return (
    <div className="container mx-auto flex flex-col justify-between items-center gap-4 px-4 md:flex-row">
      <p className="text-sm text-gray-400">
        © 2024 Career Compass. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a className="text-sm text-gray-400 hover:text-white" href="#">
          Privacy Policy
        </a>
        <a className="text-sm text-gray-400 hover:text-white" href="#">
          Terms of Service
        </a>
      </div>
    </div>
  );
};

export default Footer;
