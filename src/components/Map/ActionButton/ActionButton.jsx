function ActionButton({
  onClick, disabled, className, children,
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default ActionButton;
