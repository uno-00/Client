export function EditorialLabel({ children, variant = 'default', className = '', as: Tag = 'span' }) {
  const styles = {
    default: 'label-editorial',
    light: 'label-editorial-light',
    muted: 'text-[11px] font-medium tracking-[0.18em] text-sage-muted uppercase',
  }

  return <Tag className={`${styles[variant]} ${className}`}>{children}</Tag>
}
