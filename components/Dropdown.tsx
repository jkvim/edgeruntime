import { useRef, useState } from "react";
import { useClickAway } from "ahooks";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  label: string;
}

export default function Dropdown({children, label}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  useClickAway(() => {
    setIsOpen(false)
  }, dropdownRef)


  return (
    <div
      ref={dropdownRef}
      className="dropdown z-10 flex flex-col"
      onClick={handleClick}
    >
      <div tabIndex={0} role="button" className="flex items-center">
        {label}
        <div className={'dropdown-arrow pl-2 flex items-center justify-center'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={classNames('transition duration-300 ease-in-out',{'rotate-180': isOpen })}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="w-[150px] absolute right-0 before:hidden ml-0 mt-4 p-0 top-full bg-base-100 rounded-btn overflow-hidden backdrop-blur-md bg-opacity-70">
          {children}
        </ul>
      )}
    </div>
  ); 
}