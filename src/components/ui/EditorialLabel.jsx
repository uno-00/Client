export function EditorialLabel({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'label-editorial',
    light: 'label-editorial-light',
  }

  return <span className={`${styles[variant]} ${className}`}>{children}</span>
}
