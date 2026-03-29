import { cn, Modal } from '@heroui/react';

interface CustomModalProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  className?: string;
  title?: React.ReactNode | string;
  body: React.ReactNode | string;
  buttons?: React.ReactNode;
}

export const CustomModal = ({
  isOpen,
  onOpenChange,
  className,
  title,
  body,
  buttons,
}: CustomModalProps) => {
  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container
        className={cn('text-content bg-gradient-alt border border-border rounded-4xl', className)}
      >
        <Modal.Dialog>
          <Modal.Header
            className="flex flex-col gap-1 border-b border-border/40"
            data-tauri-drag-region
          >
            {title}
          </Modal.Header>
          <Modal.Body className="my-0 p-6 text-sm max-h-80 overflow-auto">{body}</Modal.Body>
          <Modal.Footer className="border-t border-border/40 px-4 py-3">{buttons}</Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
