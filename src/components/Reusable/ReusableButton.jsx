import { useNavigate } from 'react-router-dom';

export default function ReusableButton({ 
  type = "button",
  className = "",
  disabled = false,
  onClick,
  children,
  to
}){
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};