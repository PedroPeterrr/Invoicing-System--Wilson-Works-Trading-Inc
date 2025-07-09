import ReusableButton from './ReusableButton'

export default function EmptyState({
  Icon,
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center text-gray-500 ${className}`}>
      {Icon && <Icon className="w-16 h-16 mb-4 color-var(--color-primary)" />}
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {description && <p className="mb-6">{description}</p>}
      {buttonText && (
        <ReusableButton
          to={buttonLink}
          onClick={!buttonLink ? onButtonClick : undefined}
          className="btn-primary"
        >
          {buttonText}
        </ReusableButton>
      )}
    </div>
  )
}