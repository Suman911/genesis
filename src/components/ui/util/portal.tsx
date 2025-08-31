import { createPortal } from "react-dom";

type PortalProps = {
    open: boolean;
    children: React.ReactNode;
};

const Portal = ({ open, children }: PortalProps) => {
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            {children}
        </div>, document.body
    )
}

export default Portal;
