// MUI
import { Dialog, type DialogProps } from "@mui/material";

// Services
import { devLog } from "../../services/devlog";

type AppDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

export function AppDialog({
    isOpen,
    onClose,
    children,
}: AppDialogProps) {

    // Prevent closing on backdrop click
    const handleModalClose: DialogProps["onClose"] = (event, reason) => {
        if (reason && reason == "backdropClick") {
            devLog("Backdrop click ignored");
            return;
        }
        devLog("Closing form");
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleModalClose} fullWidth maxWidth="sm">
            {children}
            {/* Children should be siblings with DialogContent, DialogTitle, DialogActions */}
        </Dialog>
    )
}