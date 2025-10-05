import React from "react";

interface Props {
    name: string;
    isOpen: boolean;
    toggle: () => void;
    background: string;
    primary: string;
}

const MassageOptionCard: React.FC<Props> = ({ name, isOpen, toggle, background, primary }) => {
    return (
        <div
            className="w-full border border-[#404942] rounded-xl min-h-[160px] p-6 text-center cursor-pointer"
            style={{ backgroundColor: background }}
            onClick={toggle}
        >
            <h3 className="text-[24px] sm:text-[28px] font-bold mb-10">{name}</h3>

            <div
                className={`arrow-down flex items-center justify-center w-10 h-10 rounded-full mx-auto transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                }`}
                style={{ backgroundColor: primary }}
            >
                <span className="text-white">&#9660;</span>
            </div>
        </div>
    );
};

export default MassageOptionCard;
