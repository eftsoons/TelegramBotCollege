import icons from "../icon";

export type Icon = keyof typeof icons;

export default (iconname: Icon, size?: string) => {
  return (
    <span className="icon" style={size ? { fontSize: `${size}rem` } : {}}>
      {String.fromCharCode(parseInt(icons[iconname], 16))}
    </span>
  );
};
