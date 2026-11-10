export default function Link({ href, children, onClick, ...rest }: any) {
  return <a href={"#" + href} {...rest} onClick={(e) => { onClick?.(e); }}>{children}</a>;
}
