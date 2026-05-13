import Image from "next/image";

interface Props {
  portrait: string;
  name: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Dialog({ portrait, name, children, onClick }: Props) {
  return (
    <div className="dialog" onClick={onClick} style={{ cursor: onClick ? "pointer" : undefined }}>
      <img className="dialog-portrait" src={portrait} alt={name} />
      <div className="dialog-name">{name}</div>
      <div className="dialog-body">
        {children} <span className="dialog-arrow">▼</span>
      </div>
    </div>
  );
}
